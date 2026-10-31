/**
 * Open every mini-game surface at one viewport and report anything that falls
 * outside the visible scene, optionally saving a screenshot per surface.
 *
 * Usage: node scripts/layout-audit.mjs [--tier=1..4] [--size=WIDTHxHEIGHT]
 *                                      [--only=engine,engine] [--shots=DIR]
 *
 * Needs a Chrome install; puppeteer-core is resolved from a sibling project so
 * the game itself keeps a dependency-free runtime.
 */

import { spawn } from 'node:child_process';
import net from 'node:net';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const puppeteer = require(path.resolve(import.meta.dirname, '../../kards/node_modules/puppeteer-core'));

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TIER_PLAYS = { 1: 0, 2: 3, 3: 7, 4: 12 };

/** One entry per mini-game surface, paired with the companion that plays it. */
const SURFACES = [
  ['drag', '', 'dog', '投喂'],
  ['play', '', 'dog', '目标追逐'],
  ['pounce', '', 'cat', '伏击时机'],
  ['flight', '', 'budgie', '低空飞行'],
  ['flight', '', 'cockatiel', '栖木穿环'],
  ['fishing', '', 'cat', '浮漂收杆'],
  ['carrot', '', 'rabbit', '节奏采收'],
  ['throw', '', 'fox', '力度回收'],
  ['burrow', '', 'hamster', '地道寻粮'],
  ['memory', '', 'cat', '影子记忆'],
  ['match3', '', 'hamster', '三消整理'],
  ['trail', '', 'dog', '路线引导'],
  ['trail', '', 'rabbit', '遮蔽路线'],
  ['timing', '', 'poodle', '信号时机'],
  ['choice', '', 'fox', '情境决策'],
  ['sort', '', 'budgie', '物资分拣'],
  ['forage', '', 'rabbit', '草叶取舍'],
  ['stash', '', 'hamster', '颊囊囤粮'],
  ['song', '', 'cockatiel', '音阶跟唱'],
  ['inspect', 'scent', 'dog', '气味追踪'],
  ['inspect', 'listening', 'cockatiel', '听声辨位'],
  ['inspect', 'watch', 'budgie', '环境观察'],
  ['inspect', 'scan', 'fox', '现场扫描'],
  ['bubbles', '', 'poodle', '环境清理'],
  ['stroke', '', 'poodle', '顺毛梳理'],
];

/**
 * The companion sprite stands at the front edge of the scene and the fishing
 * ripples wash past it, so both are framed to bleed past the viewport on
 * purpose. Everything else that leaves the frame is a layout bug.
 */
const INTENTIONAL_BLEED = ['.mini-pet', '.fishing-water'];

const flag = (name, fallback) => {
  const match = process.argv.slice(2).find((argument) => argument.startsWith(`--${name}=`));
  return match ? match.slice(name.length + 3) : fallback;
};

const tier = Number(flag('tier', '1'));
const [width, height] = flag('size', '1440x900').split('x').map(Number);
const only = flag('only', '').split(',').filter(Boolean);
const shotDir = flag('shots', '');

const freePort = () =>
  new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.unref();
    probe.on('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });

const port = await freePort();
const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], {
  cwd: path.resolve(import.meta.dirname, '..'),
  stdio: 'ignore',
});
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
});

let problems = [];
try {
  if (shotDir) await mkdir(shotDir, { recursive: true });
  for (const [engine, mode, pet, label] of SURFACES.filter((entry) => !only.length || only.includes(entry[0]))) {
    const name = `${engine}${mode ? `-${mode}` : ''}-${pet}`;
    // Opening two dozen mini-games in one page eventually kills the renderer,
    // so every surface gets a fresh page.
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    page.on('pageerror', (error) => problems.push(`${name}: [pageerror] ${error.message}`));
    await page.goto(`http://127.0.0.1:${port}/?smoke=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction('typeof window.launchMiniGame === "function"', { timeout: 20000 });
    const spills = await page.evaluate(
      (id, game, inspectMode, title, plays, allowed) => {
        window.applyReward({ coins: 6000, reputation: 600, candidate: id }, 'dog');
        window.adoptPet(id);
        window.selectPet(id);
        window.enterLocation('home');
        window.miniMasteryFor(game, inspectMode).plays = plays;
        window.launchMiniGame(game, id, title, '版面巡检', inspectMode);
        const view = document.querySelector('#locationView').getBoundingClientRect();
        return [...document.querySelectorAll('#miniCanvas *')]
          .filter((node) => node.offsetParent !== null && !allowed.some((skip) => node.closest(skip)))
          .map((node) => {
            const box = node.getBoundingClientRect();
            if (!box.width || !box.height) return null;
            const spill = Math.max(view.left - box.left, box.right - view.right, view.top - box.top, box.bottom - view.bottom);
            return spill > 2 ? `${node.className || node.id || node.tagName} spills ${Math.round(spill)}px` : null;
          })
          .filter(Boolean)
          .slice(0, 4);
      },
      pet,
      engine,
      mode,
      label,
      TIER_PLAYS[tier] ?? 0,
      INTENTIONAL_BLEED,
    );
    if (spills.length) problems.push(`${name}: ${spills.join(' | ')}`);
    if (shotDir) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      await (await page.$('#locationView')).screenshot({ path: path.join(shotDir, `${name}.png`) });
    }
    await page.close();
  }
} finally {
  await browser.close();
  server.kill('SIGTERM');
}

console.log(`Layout audit ${width}x${height} tier ${tier}: ${problems.length ? `${problems.length} issue(s)` : 'clean'}`);
if (problems.length) {
  console.log(problems.join('\n'));
  process.exitCode = 1;
}
