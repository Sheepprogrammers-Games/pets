/**
 * Screenshot the home scene for one or more pets, optionally asleep.
 *
 * Usage: node scripts/shot.mjs OUT_DIR [pet,pet,...] [--awake]
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
const ALL_PETS = ['dog', 'cat', 'rabbit', 'hamster', 'poodle', 'fox', 'budgie', 'cockatiel'];

const [outDir = 'tmp/shots', petArg = ALL_PETS.join(','), ...flags] = process.argv.slice(2);
const pets = petArg.split(',').filter(Boolean);
const asleep = !flags.includes('--awake');

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

try {
  await mkdir(outDir, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  page.on('pageerror', (error) => console.error('[error]', error.message));

  await page.goto(`http://127.0.0.1:${port}/?smoke=1`, { waitUntil: 'networkidle0' });
  await page.waitForFunction('typeof window.enterLocation === "function"', { timeout: 20000 });

  for (const pet of pets) {
    await page.evaluate(
      (id, sleeping) => {
        window.applyReward({ coins: 4000, reputation: 400, candidate: id }, 'dog');
        for (let room = 0; room < 8; room += 1) window.upgradeHome();
        window.adoptPet(id);
        window.selectPet(id);
        window.enterLocation('home');
        const stats = window.statsFor(id);
        stats.asleep = false;
        stats.energy = sleeping ? 20 : 90;
        if (sleeping) window.startSleep();
        else window.showPet(id, 'idle');
      },
      pet,
      asleep,
    );
    await new Promise((resolve) => setTimeout(resolve, 900));
    const scene = await page.$('#locationView');
    const file = path.join(outDir, `${pet}-${asleep ? 'sleep' : 'idle'}.png`);
    await scene.screenshot({ path: file });
    console.log(file);
  }
} finally {
  await browser.close();
  server.kill('SIGTERM');
}
