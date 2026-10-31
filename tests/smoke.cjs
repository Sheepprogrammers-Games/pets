const { spawn } = require("node:child_process");
const { existsSync, readFileSync } = require("node:fs");
const net = require("node:net");
const { JSDOM, VirtualConsole } = require("jsdom");

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/** A hard-coded port silently serves whatever else already holds it. */
const freePort = () => new Promise((resolve, reject) => {
  const probe = net.createServer();
  probe.unref();
  probe.on("error", reject);
  probe.listen(0, "127.0.0.1", () => {
    const { port } = probe.address();
    probe.close(() => resolve(port));
  });
});

const waitFor = async (predicate, timeout = 1800) => {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (predicate()) return true;
    await wait(12);
  }
  return false;
};
const fullMotion = process.env.FULL_MOTION === "1";

let server;

(async () => {
  const errors = [];
  try {
    const port = await freePort();
    server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
      cwd: process.cwd(),
      stdio: "ignore"
    });
    const ready = Date.now();
    while (Date.now() - ready < 6000) {
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`);
        if (response.ok) break;
      } catch {}
      await wait(80);
    }
    const virtualConsole = new VirtualConsole();
    virtualConsole.on("jsdomError", error => {
      if (!error.message.includes("Could not load link") && !error.message.includes("HTMLMediaElement")) errors.push(error.message);
    });
    const dom = await JSDOM.fromURL(`http://127.0.0.1:${port}/?smoke=1`, {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      virtualConsole,
      beforeParse(window) {
        window.__audioPlayCount = 0;
        window.__foleyStartCount = 0;
        window.matchMedia = () => ({ matches: !fullMotion, addEventListener() {}, removeEventListener() {} });
        window.scrollTo = () => {};
        window.Audio = class AudioMock { pause() {} play() { window.__audioPlayCount += 1; return Promise.resolve(); } };
        window.AudioContext = class AudioContextMock {
          constructor() { this.state = "running"; this.currentTime = 0; this.destination = {}; }
          resume() {}
          createOscillator() { return { type: "sine", frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() { return this; }, start() { window.__foleyStartCount += 1; }, stop() {} }; }
          createGain() { return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() { return this; } }; }
        };
        if (window.HTMLDialogElement) {
          window.HTMLDialogElement.prototype.showModal = function showModal() { this.open = true; };
          window.HTMLDialogElement.prototype.close = function close() { this.open = false; };
        }
      }
    });
    dom.window.addEventListener("error", event => errors.push(event.message));
    // game.js is a single large classic script; wait for it to finish executing rather than guessing a delay.
    if (!(await waitFor(() => typeof dom.window.launchMiniGame === "function", 20000))) throw new Error("game.js did not finish loading");
    await wait(200);
    const document = dom.window.document;
    /** Round counts scale with mastery, so every completion path reads the live requirement. */
    const miniRoundsNow = () => Number(document.querySelector("#miniGame")?.dataset.rounds || 3);
    const gridCells = attribute => [...document.querySelectorAll(`[data-${attribute}]`)].map(cell => ({
      cell,
      key: cell.getAttribute(`data-${attribute}`),
      col: Number(cell.getAttribute(`data-${attribute}`).split(",")[0]),
      row: Number(cell.getAttribute(`data-${attribute}`).split(",")[1])
    }));
    /** Walks a maze board to every remaining target with BFS instead of a memorized route. */
    const solveGridBoard = ({ attribute, blocked, target, done, start, control, names, passes = 8 }) => {
      const cells = gridCells(attribute);
      if (!cells.length) return;
      const cols = Math.max(...cells.map(item => item.col)) + 1;
      const rows = Math.max(...cells.map(item => item.row)) + 1;
      const walls = new Set(cells.filter(item => item.cell.classList.contains(blocked)).map(item => item.key));
      const steps = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
      let position = start;
      const pathTo = goal => {
        const queue = [[position, []]];
        const seen = new Set([`${position[0]},${position[1]}`]);
        while (queue.length) {
          const [[col, row], trail] = queue.shift();
          if (col === goal[0] && row === goal[1]) return trail;
          for (const [name, [dx, dy]] of Object.entries(steps)) {
            const next = [col + dx, row + dy];
            const key = `${next[0]},${next[1]}`;
            if (next[0] < 0 || next[0] >= cols || next[1] < 0 || next[1] >= rows || walls.has(key) || seen.has(key)) continue;
            seen.add(key);
            queue.push([next, [...trail, name]]);
          }
        }
        return null;
      };
      for (let pass = 0; pass < passes; pass += 1) {
        const remaining = cells.filter(item => item.cell.classList.contains(target) && !item.cell.classList.contains(done));
        if (!remaining.length) return;
        for (const goal of remaining) {
          const path = pathTo([goal.col, goal.row]);
          if (!path) continue;
          path.forEach(name => document.querySelector(`[data-${control}="${names[name]}"]`)?.click());
          position = [goal.col, goal.row];
        }
      }
    };
    const solveBurrow = () => solveGridBoard({ attribute: "burrow-cell", blocked: "wall", target: "seed", done: "collected", start: [0, 3], control: "burrow-dir", names: { up: "up", down: "down", left: "left", right: "right" } });
    /** 路线棋盘的起点随伙伴档案变化，所以从棋盘自己报告的位置出发。 */
    const solveTrail = () => solveGridBoard({
      attribute: "trail-cell",
      blocked: "blocked",
      target: "beacon",
      done: "passed",
      start: (document.querySelector("#trailBoard")?.dataset.trailAt || "0,2").split(",").map(Number),
      control: "trail-dir",
      names: { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" }
    });
    const completeInspection = async () => {
      const rounds = miniRoundsNow() + 2;
      const scent = document.querySelector("#scentField");
      if (scent) for (let index = 0; index < rounds; index += 1) scent.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      const listening = document.querySelector("#listeningPrompt");
      if (listening) for (let index = 0; index < rounds; index += 1) document.querySelector(`[data-listen="${document.querySelector("#listeningPrompt")?.dataset.direction}"]`)?.click();
      if (document.querySelector("#burrowBoard")) solveBurrow();
      if (document.querySelector("#trailBoard")) solveTrail();
      const scan = document.querySelector("#scanField");
      if (scan) for (let index = 0; index < rounds; index += 1) scan.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      const perch = document.querySelector("#perchWatchField");
      if (perch) for (let index = 0; index < rounds; index += 1) perch.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      document.querySelectorAll(".inspect-spot").forEach(button => button.click());
      await wait(720);
    };

    if (!document.querySelector(".world-map")?.src.includes("/world/world-map.webp")) errors.push("world map did not render");
    if (!document.querySelector('link[rel="icon"][href*="favicon.ico"]') || !document.querySelector('link[rel="apple-touch-icon"][href*="apple-touch-icon.png"]')) errors.push("site icons were not linked in the document head");
    if (!document.querySelector("#saveStatus") || !document.querySelector("#saveStatusLabel")?.textContent.includes("已保存")) errors.push("automatic save status was not visible after startup");
    if (document.querySelector("#advanceHourHand")?.style.transform !== "rotate(210deg)" || document.querySelector("#advanceMinuteHand")?.style.transform !== "rotate(0deg)" || !document.querySelector("#advanceButton")?.textContent.includes("+30 分钟")) errors.push("time advance button did not show a synchronized analog clock and clear +30 label");
    if (!JSON.parse(dom.window.localStorage.getItem("valleySanctuarySaveV1") || "{}").savedAt) errors.push("automatic save timestamp was not persisted");
    dom.window.openOnboarding();
    if (document.querySelector("#onboardingTour")?.hidden || document.querySelectorAll("#onboardingProgress i").length !== 7 || !document.querySelector("#tutorialHand")?.src.includes("petting-hand.webp")) errors.push("seven-step animated function tour did not open");
    document.querySelector("#onboardingNext")?.click();
    if (!document.querySelector("#onboardingTitle")?.textContent.includes("经营安排") || !document.querySelector("#calendarDialog")?.open || !document.querySelector("#calendarDialog")?.classList.contains("tutorial-preview")) errors.push("function tour did not open the real calendar preview");
    document.querySelector("#onboardingSkip")?.click();
    if (!dom.window.localStorage.getItem("valleySanctuaryOnboardingV2") || !document.querySelector("#onboardingTour")?.hidden) errors.push("function tour completion was not remembered");
    if (document.querySelectorAll(".map-hotspot").length !== 11) errors.push("eleven world locations did not render");
    if (dom.window.getComputedStyle(document.querySelector("#locationDetails")).display !== "none") errors.push("location scene annotations still cover the title or active pet");
    if (!readFileSync("styles.css", "utf8").includes('.location-view:not([data-location=\"home\"]) .speech-bubble { display: none; }')) errors.push("non-home speech bubble still covers the active pet");
    if (document.querySelector("#careStreak")?.parentElement?.id !== "worldView" || document.querySelector(".world-heading #careStreak")) errors.push("care streak was not separated from the map heading into its own HUD lane");
    const mapLayoutCss = readFileSync("styles.css", "utf8");
    if (document.querySelector("#worldCompanion") || mapLayoutCss.includes(".world-companion")) errors.push("world map still renders the companion status card");
    if (!mapLayoutCss.includes(".care-streak { position: absolute; z-index: 6; top: 24px; left: 50%;")) errors.push("care streak did not use its independent top HUD lane");
    if (document.querySelector("#worldView")?.dataset.mapTheme !== "spring" || !document.querySelector("#mapThemeButton")) errors.push("map theme control did not initialize");
    const scenePositions = {};
    const sceneTickerTitles = [];
    ["summer", "autumn", "winter", "night", "spring"].forEach(theme => { dom.window.cycleMapTheme(); if (document.querySelector("#worldView")?.dataset.mapTheme !== theme) errors.push(`map scene did not switch to ${theme}`); if (!document.querySelector("#worldMap")?.src.includes(`/world/world-map${theme === "spring" ? "" : `-${theme === "summer" ? "wetlands" : theme}`}.webp`)) errors.push(`map scene asset did not switch to ${theme}`); const home = document.querySelector('[data-location="home"]'); scenePositions[theme] = home?.getAttribute("style"); sceneTickerTitles.push(document.querySelector(".ticker-scene-note")?.textContent || document.querySelector(".ticker-copy b")?.textContent || ""); });
    if (new Set(Object.values(scenePositions)).size < 4) errors.push("map scene hotspot positions did not change with the scene");
    if (new Set(sceneTickerTitles).size < 4) errors.push("map scene event copy did not change with the scene");
    if (document.querySelector("#worldMap")?.style.getPropertyValue("--map-theme-filter") !== "none") errors.push("map scene still relies on a theme filter");
    if (!document.querySelector("#mapSceneTransition") || document.querySelector("#mapSceneTransitionLabel")?.textContent.trim() !== "山谷昼景") errors.push("map scene transition label did not update");
    const mapPanorama = document.querySelector("#worldPanorama");
    if (mapPanorama) {
      Object.defineProperty(mapPanorama, "scrollWidth", { configurable: true, value: 1900 });
      Object.defineProperty(mapPanorama, "clientWidth", { configurable: true, value: 500 });
      mapPanorama.scrollLeft = 700;
      mapPanorama.dispatchEvent(new dom.window.MouseEvent("pointerdown", { bubbles: true, clientX: 500 }));
      mapPanorama.dispatchEvent(new dom.window.MouseEvent("pointermove", { bubbles: true, clientX: 2000 }));
      if (mapPanorama.scrollLeft !== 0) errors.push("map drag exceeded the left boundary");
      mapPanorama.dispatchEvent(new dom.window.MouseEvent("pointermove", { bubbles: true, clientX: -2000 }));
      if (mapPanorama.scrollLeft !== 1400) errors.push("map drag exceeded the right boundary");
      mapPanorama.dispatchEvent(new dom.window.MouseEvent("pointerup", { bubbles: true }));
      if (!mapPanorama.getAttribute("aria-label")?.includes("当前位置")) errors.push("map pan position was not announced");
      const dragReleaseClick = new dom.window.MouseEvent("click", { bubbles: true, cancelable: true });
      document.querySelector(".map-hotspot:not(:disabled)")?.dispatchEvent(dragReleaseClick);
      if (!dragReleaseClick.defaultPrevented || document.querySelector("#worldView")?.hidden) errors.push("map drag release triggered a location click");
    } else errors.push("map panorama did not render");
    if (document.querySelector(".scene-hotspot, #sceneHotspots")) errors.push("location scene still exposed point markers instead of standalone task cards");
    if (document.querySelectorAll(".map-hotspot.locked").length !== 8) errors.push("initial level-gated locations are incorrect");
    if (["scent", "listening", "watch", "scan"].map(mode => dom.window.miniGameModeLabel("inspect", mode)).join(",") !== "气味追踪,听声辨位,环境观察,现场扫描") errors.push("inspection mode labels are incomplete or mismatched");
    const petModes = [
      dom.window.resolvePetMiniGame("inspect", "dog").inspectMode,
      dom.window.resolvePetMiniGame("inspect", "cat", "", "lakeside").game,
      dom.window.resolvePetMiniGame("inspect", "rabbit").game,
      dom.window.resolvePetMiniGame("inspect", "hamster").game,
      dom.window.resolvePetMiniGame("inspect", "poodle").game,
      dom.window.resolvePetMiniGame("inspect", "fox").game,
      dom.window.resolvePetMiniGame("inspect", "budgie").game,
      dom.window.resolvePetMiniGame("inspect", "cockatiel").inspectMode,
      dom.window.resolvePetMiniGame("inspect", "cat").game
    ].join(",");
    if (petModes !== "scent,fishing,carrot,burrow,stroke,throw,flight,listening,pounce") errors.push("generic inspections did not branch into pet-specific mini-games");
    const signatureTaskModes = [
      dom.window.resolveTaskMiniGame("play", "dog", "", "home").inspectMode,
      dom.window.resolveTaskMiniGame("play", "cat", "", "home").game,
      dom.window.resolveTaskMiniGame("play", "rabbit", "", "home").game,
      dom.window.resolveTaskMiniGame("play", "hamster", "", "home").game,
      dom.window.resolveTaskMiniGame("play", "poodle", "", "home").game,
      dom.window.resolveTaskMiniGame("play", "fox", "", "home").game,
      dom.window.resolveTaskMiniGame("play", "budgie", "", "home").game,
      dom.window.resolveTaskMiniGame("play", "cockatiel", "", "home").inspectMode
    ].join(",");
    if (signatureTaskModes !== "scent,pounce,carrot,burrow,stroke,throw,flight,listening") errors.push("generic tasks did not keep eight distinct companion signature mechanics");
    const contextModes = [
      dom.window.resolveTaskMiniGame("bubbles", "poodle", "", "home", false, true, "home-peekaboo").game,
      dom.window.resolveTaskMiniGame("play", "poodle", "", "home", false, true, "home-treasure").game,
      dom.window.resolveTaskMiniGame("inspect", "poodle", "listening", "home", false, true, "home-quiet-listen").inspectMode,
      dom.window.resolveTaskMiniGame("inspect", "dog", "", "clinic", false, false, "clinic-checkup").game,
      dom.window.resolveTaskMiniGame("throw", "dog", "", "highlands", false, true, "highlands-wind-read").game
    ].join(",");
    if (contextModes !== "memory,stroke,listening,match3,trail") errors.push("event-specific routes collapsed back into repeated companion interactions");
    if (dom.window.petGameLibrarySize() < 15) errors.push("pet game library did not reach the required fifteen distinct games");
    const homePetModes = ["dog", "cat", "rabbit", "hamster", "poodle", "fox", "budgie", "cockatiel"].map(petId => {
      const game = dom.window.randomPetGame(petId, "home", "identity-check");
      return `${game.engine}/${game.inspectMode || "direct"}`;
    });
    if (new Set(homePetModes).size !== 8) errors.push("pet exploration library reused the same home interaction across companion types");
    const mechanicAudit = dom.window.miniGameMechanicAudit();
    if (mechanicAudit.total !== 25 || mechanicAudit.unique !== 25 || mechanicAudit.duplicates.length) errors.push("mini-game mechanic audit found repeated gameplay signatures");
    const overlapAudit = dom.window.petGameOverlapAudit();
    if (overlapAudit.maxPetsPerMechanic > 2) errors.push(`a mini-game mechanic is shared by more than two companions: ${overlapAudit.shared.filter(entry => entry.pets.length > 2).map(entry => entry.mechanic).join(", ")}`);
    if (overlapAudit.unprofiledShared.length) errors.push(`shared mechanics without per-companion rule profiles: ${overlapAudit.unprofiledShared.join(", ")}`);
    if (overlapAudit.duplicateSets.length) errors.push("two companions expose an identical set of mini-games");
    if (overlapAudit.mechanics < 18) errors.push("companion libraries collapsed onto too few distinct mechanics");
    if (overlapAudit.coverage.some(entry => entry.locations < 11)) errors.push(`a companion library does not cover every location: ${overlapAudit.coverage.filter(entry => entry.locations < 11).map(entry => entry.petId).join(", ")}`);
    const petMechanicSpread = ["dog", "cat", "rabbit", "hamster", "poodle", "fox", "budgie", "cockatiel"].map(petId => {
      const seen = new Set();
      ["home", "meadow", "forest", "lakeside", "highlands", "market", "clinic", "training", "rescue", "saltmarsh", "greenhouse"].forEach(location => {
        const game = dom.window.randomPetGame(petId, location, "spread-check");
        seen.add(`${game.engine}/${game.inspectMode || "direct"}`);
      });
      return seen.size;
    });
    if (petMechanicSpread.some(size => size !== 3)) errors.push("a companion did not reach three distinct mechanics across the eleven locations");
    const contentAudit = dom.window.miniGameContentAudit();
    if (contentAudit.exploration.duplicates.length || contentAudit.activities.duplicates.length || contentAudit.events.duplicates.length) errors.push("same location exposes duplicate mini-game signatures");
    if (contentAudit.exploration.total !== 33 || contentAudit.activities.total !== 23) errors.push("new map exploration or activity catalog did not load");
    if (contentAudit.events.total !== 48 || contentAudit.events.unique !== 48) errors.push("event catalog still contains repeated gameplay signatures");
    if (dom.window.allEvents().filter(event => event.id.startsWith("chance-")).length < 2) errors.push("expanded random event pool did not initialize");
    const engineSurfaces = [
      ["drag", "", ".food-item"], ["play", "", ".ball"], ["pounce", "", "#pounceCommand"],
      ["flight", "", "#flightField"], ["fishing", "", "#fishCommand"], ["carrot", "", ".rhythm-controls"],
      ["throw", "", "#throwCommand"], ["burrow", "", "[data-burrow-dir]"], ["memory", "", ".memory-card"],
      ["match3", "", ".match3-tile"], ["trail", "", "[data-trail-dir]"], ["timing", "", "#timingCommand"],
      ["inspect", "scent", "#scentField"], ["inspect", "listening", "[data-listen]"],
      ["inspect", "watch", "#perchWatchField"], ["inspect", "scan", "#scanField"], ["choice", "", ".choice-option"], ["sort", "", ".sort-item.active"],
      ["bubbles", "", ".cleanup-tool"], ["stroke", "", "#strokePath"],
      ["forage", "", ".forage-leaf"], ["stash", "", ".stash-drop"], ["song", "", ".song-key"],
      ["trace", "", ".trace-print.ready"], ["perch", "", ".perch-step.ready"]
    ];
    for (const [engine, mode, control] of engineSurfaces) {
      dom.window.launchMiniGame(engine, "dog", `测试 · ${engine}`, "移动端操作测试", mode);
      if (document.querySelector("#miniGame")?.dataset.game !== engine || !document.querySelector(control)) errors.push(`mini-game surface missing: ${engine}${mode ? `/${mode}` : ""}`);
      if (engine === "match3" && (!document.querySelector(".match3-stage") || document.querySelectorAll(".match3-board .match3-tile").length !== 25 || document.querySelectorAll("[data-match-goal]").length !== 3)) errors.push("match-three game did not render a board, themed stage, and clear objectives");
      dom.window.cancelMiniGame();
    }
    const browserSetTimeout = dom.window.setTimeout;
    const cappedSetTimeout = (callback, delay, ...args) => browserSetTimeout.call(dom.window, callback, Math.min(Number(delay) || 0, 24), ...args);
    dom.window.setTimeout = cappedSetTimeout;
    const progressValue = () => Number(document.querySelector(".mini-progress")?.getAttribute("aria-valuenow") || 0);
    const verifyCompletion = async (engine, mode, perform) => {
      dom.window.launchMiniGame(engine, "dog", `完成验证 · ${engine}`, "完成路径验证", mode);
      await perform();
      await wait(45);
      if (progressValue() !== 100) errors.push(`mini-game did not reach 100 percent: ${engine}${mode ? `/${mode}` : ""} (progress ${progressValue()}, rounds ${document.querySelector("#miniGame")?.dataset.rounds})`);
      dom.window.cancelMiniGame();
    };
    await verifyCompletion("drag", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) {
        await waitFor(() => Boolean(document.querySelector(".food-item:not(:disabled)")));
        document.querySelector(".food-item:not(:disabled)")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        await waitFor(() => progressValue() >= Math.round((round + 1) / rounds * 100));
      }
    });
    await verifyCompletion("play", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) {
        document.querySelector(".ball")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        await wait(45);
      }
    });
    /**
     * 判定窗口类玩法的通用解法：指针一直在动，等到窗口后必须再复查一次才点，
     * 而且只有进度真的推进才算完成一回合，否则漏掉的那一拍会让整局卡在中途。
     */
    const solveTimingWindow = async ({ ready, inWindow, press, rounds, guard = 240 }) => {
      for (let round = 0, tries = 0; round < rounds && tries < guard; tries += 1) {
        const before = progressValue();
        if (ready && !(await waitFor(ready))) break;
        if (!(await waitFor(inWindow))) break;
        if (!inWindow()) continue;
        press();
        await wait(55);
        if (progressValue() > before) round += 1;
      }
    };
    const needleAt = selector => Number.parseFloat(document.querySelector(selector)?.style.left || "0");
    await verifyCompletion("pounce", "", async () => {
      await solveTimingWindow({
        rounds: miniRoundsNow(),
        inWindow: () => needleAt("#pounceMarker") >= 46 && needleAt("#pounceMarker") <= 59,
        press: () => document.querySelector("#pounceCommand")?.click()
      });
    });
    await verifyCompletion("flight", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector("#flightField")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    const savedRandomForGames = dom.window.Math.random;
    dom.window.Math.random = () => 0;
    // Fishing is the one mechanic built on real waiting windows, so it runs on unshortened timers.
    dom.window.setTimeout = browserSetTimeout;
    await verifyCompletion("fishing", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) {
        await waitFor(() => !document.querySelector("#fishCommand")?.disabled);
        if (!document.querySelector("#fishCommand")?.textContent.includes("收杆")) document.querySelector("#fishCommand")?.click();
        await waitFor(() => document.querySelector("#fishingFloat")?.classList.contains("biting"), 3000);
        document.querySelector("#fishCommand")?.click();
        await waitFor(() => progressValue() >= Math.round((round + 1) / rounds * 100), 3000);
      }
    });
    dom.window.setTimeout = cappedSetTimeout;
    dom.window.Math.random = savedRandomForGames;
    await verifyCompletion("carrot", "", async () => {
      const beats = miniRoundsNow();
      for (let beat = 0; beat < beats; beat += 1) document.querySelector(beat % 2 ? "#pullRight" : "#pullLeft")?.click();
    });
    await verifyCompletion("throw", "", async () => {
      await solveTimingWindow({
        rounds: miniRoundsNow(),
        ready: () => !document.querySelector("#throwCommand")?.disabled,
        inWindow: () => needleAt("#powerNeedle") >= 48 && needleAt("#powerNeedle") <= 62,
        press: () => document.querySelector("#throwCommand")?.click()
      });
    });
    await verifyCompletion("burrow", "", async () => { solveBurrow(); });
    await verifyCompletion("memory", "", async () => {
      await wait(35);
      [0, 3, 1, 4, 2, 5, 3].slice(0, miniRoundsNow()).forEach(index => document.querySelector(`[data-memory-index="${index}"]`)?.click());
    });
    await verifyCompletion("match3", "", async () => {
      const match3Move = () => {
        const tiles = [...document.querySelectorAll(".match3-tile")];
        const values = tiles.map(tile => tile.dataset.matchKind);
        const hasMatch = board => {
          const found = new Set();
          for (let row = 0; row < 5; row += 1) for (let column = 0; column < 3; column += 1) {
            const index = row * 5 + column;
            if (board[index] === board[index + 1] && board[index] === board[index + 2]) [index, index + 1, index + 2].forEach(value => found.add(value));
          }
          for (let column = 0; column < 5; column += 1) for (let row = 0; row < 3; row += 1) {
            const index = row * 5 + column;
            if (board[index] === board[index + 5] && board[index] === board[index + 10]) [index, index + 5, index + 10].forEach(value => found.add(value));
          }
          return found.size > 0;
        };
        for (let index = 0; index < values.length; index += 1) for (const next of [index + 1, index + 5]) {
          if (next >= values.length || (next === index + 1 && Math.floor(index / 5) !== Math.floor(next / 5))) continue;
          const probe = [...values];
          [probe[index], probe[next]] = [probe[next], probe[index]];
          if (hasMatch(probe)) return [index, next];
        }
        return null;
      };
      for (let attempt = 0; attempt < 60 && progressValue() < 100; attempt += 1) {
        const move = match3Move();
        if (!move) break;
        document.querySelector(`[data-match-index="${move[0]}"]`)?.click();
        document.querySelector(`[data-match-index="${move[1]}"]`)?.click();
        await wait(55);
      }
    });
    await verifyCompletion("trail", "", async () => { solveTrail(); });
    await verifyCompletion("timing", "", async () => {
      await solveTimingWindow({
        rounds: miniRoundsNow(),
        inWindow: () => needleAt("#timingNeedle") >= 42 && needleAt("#timingNeedle") <= 60,
        press: () => document.querySelector("#timingCommand")?.click()
      });
    });
    await verifyCompletion("choice", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector("[data-choice-correct=\"true\"]")?.click();
    });
    await verifyCompletion("sort", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) {
        const item = document.querySelector(".sort-item.active");
        const kind = item?.dataset.sortKind || "food";
        item?.click();
        document.querySelector(`.sort-bin[data-sort-bin="${kind}"]`)?.click();
      }
    });
    await verifyCompletion("forage", "", async () => {
      const safe = [...document.querySelectorAll(".forage-leaf[data-forage-safe=\"true\"]")];
      if (safe.length !== miniRoundsNow()) errors.push("forage patch did not plant one safe leaf per required pick");
      if (!document.querySelectorAll(".forage-leaf[data-forage-safe=\"false\"]").length) errors.push("forage patch offered no toxic leaf to avoid");
      safe.forEach(leaf => leaf.click());
    });
    await verifyCompletion("stash", "", async () => {
      // 容量只留一格余量，所以按最贴合的格子装，塞不下时把最后一颗取出来重排。
      const capacity = [...document.querySelectorAll("[data-stash-pouch]")].reduce((total, pouch) => total + Number(pouch.dataset.stashRemaining), 0);
      if (capacity > miniRoundsNow() * 3) errors.push("stash pouches offered so much room that capacity never mattered");
      for (let attempt = 0; attempt < 40 && progressValue() < 100; attempt += 1) {
        const size = Number(document.querySelector("#stashSeed")?.dataset.stashSize || 0);
        if (!size) break;
        const pouches = [...document.querySelectorAll("[data-stash-pouch]")];
        const fits = pouches
          .filter(pouch => Number(pouch.dataset.stashRemaining) >= size)
          .sort((first, second) => Number(first.dataset.stashRemaining) - Number(second.dataset.stashRemaining));
        if (fits.length) { fits[0].querySelector(".stash-drop")?.click(); continue; }
        const chips = pouches.flatMap(pouch => [...pouch.querySelectorAll("[data-stash-remove]")]);
        if (!chips.length) { errors.push("stash board dead-ended with no way to recover"); break; }
        chips.at(-1).click();
      }
    });
    await verifyCompletion("trace", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector(".trace-print.ready")?.click();
    });
    await verifyCompletion("perch", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector(".perch-step.ready")?.click();
    });
    await verifyCompletion("song", "", async () => {
      for (let index = 0; index < miniRoundsNow(); index += 1) {
        if (!(await waitFor(() => document.querySelector(".song-note.is-live"), 4000))) { errors.push("song note never entered the judging window"); break; }
        const lane = document.querySelector(".song-note")?.dataset.songLane;
        document.querySelector(`.song-key[data-song-lane="${lane}"]`)?.click();
        await waitFor(() => progressValue() >= Math.round((index + 1) / miniRoundsNow() * 100), 4000);
      }
    });
    await verifyCompletion("inspect", "scent", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector("#scentField")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    });
    await verifyCompletion("inspect", "listening", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector(`[data-listen="${document.querySelector("#listeningPrompt")?.dataset.direction}"]`)?.click();
    });
    await verifyCompletion("inspect", "watch", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector("#perchWatchField")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    });
    await verifyCompletion("inspect", "scan", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector("#scanField")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    await verifyCompletion("bubbles", "", async () => {
      for (let index = 0; index < 3; index += 1) {
        const spot = document.querySelector(`[data-cleanup-spot="${index}"]`);
        spot?.click();
        document.querySelector(`[data-cleanup-tool="${spot?.dataset.cleanupRequired}"]`)?.click();
        spot?.dataset.cleanupRoute.split(",").forEach(direction => document.querySelector(`[data-cleanup-step="${direction}"]`)?.click());
        await wait(40);
      }
    });
    await verifyCompletion("stroke", "", async () => {
      const rounds = miniRoundsNow();
      for (let round = 0; round < rounds; round += 1) document.querySelector("#strokePath")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    });
    dom.window.launchMiniGame("drag", "dog", "触屏拖放验证", "把食物拖到伙伴面前");
    const pointerFood = document.querySelector(".food-item");
    const pointerTarget = document.querySelector("#dropTarget");
    const pointerCanvas = document.querySelector("#miniCanvas");
    if (pointerFood && pointerTarget && pointerCanvas) {
      pointerCanvas.getBoundingClientRect = () => ({ left: 0, top: 0, right: 360, bottom: 640, width: 360, height: 640 });
      pointerFood.getBoundingClientRect = () => ({ left: 20, top: 300, right: 120, bottom: 400, width: 100, height: 100 });
      pointerTarget.getBoundingClientRect = () => ({ left: 130, top: 360, right: 250, bottom: 480, width: 120, height: 120 });
      const pointerDown = new dom.window.MouseEvent("pointerdown", { bubbles: true, cancelable: true, clientX: 60, clientY: 340 });
      pointerFood.dispatchEvent(pointerDown);
      pointerFood.dispatchEvent(new dom.window.MouseEvent("pointermove", { bubbles: true, clientX: 180, clientY: 410 }));
      pointerFood.dispatchEvent(new dom.window.MouseEvent("pointerup", { bubbles: true, clientX: 180, clientY: 410 }));
      await waitFor(() => progressValue() >= 33);
      if (!pointerDown.defaultPrevented || progressValue() < 33) errors.push("touch drag did not move food into the target or advance progress");
    } else errors.push("touch drag fixture did not render");
    dom.window.cancelMiniGame();
    dom.window.launchMiniGame("trail", "dog", "触屏滑动验证", "滑动规划高地路线");
    const swipeBoard = document.querySelector("#trailBoard");
    const swipe = direction => {
      const delta = { ArrowRight: [60, 0], ArrowLeft: [-60, 0], ArrowUp: [0, -60], ArrowDown: [0, 60] }[direction];
      swipeBoard?.dispatchEvent(new dom.window.MouseEvent("pointerdown", { bubbles: true, clientX: 100, clientY: 100 }));
      swipeBoard?.dispatchEvent(new dom.window.MouseEvent("pointerup", { bubbles: true, clientX: 100 + delta[0], clientY: 100 + delta[1] }));
    };
    ["ArrowRight", "ArrowUp", "ArrowUp", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowDown", "ArrowDown"].forEach(swipe);
    if (progressValue() !== 100) errors.push("touch swipe did not complete the highland route");
    dom.window.cancelMiniGame();

    // 共享机制必须换规则而不只是换名字：兔子的路线板有暴露风险格，玄凤的飞行是按高度排序的窄判定。
    dom.window.launchMiniGame("trail", "dog", "犬类路线档案", "读风向绕开落石");
    const dogTrailStart = document.querySelector("#trailBoard")?.dataset.trailAt;
    if (document.querySelectorAll(".trail-cell.risky").length) errors.push("the canine trail profile should rely on hard obstacles, not exposed ground");
    dom.window.cancelMiniGame();
    dom.window.launchMiniGame("trail", "rabbit", "兔类路线档案", "沿草丛遮蔽前进");
    if (!document.querySelectorAll(".trail-cell.risky").length) errors.push("the rabbit trail profile did not add exposed ground to weigh");
    if (document.querySelector("#trailBoard")?.dataset.trailAt === dogTrailStart) errors.push("the rabbit trail profile reused the canine starting corner and board shape");
    solveTrail();
    await wait(45);
    if (progressValue() !== 100) errors.push("the rabbit trail profile could not be completed");
    dom.window.cancelMiniGame();
    dom.window.launchMiniGame("flight", "budgie", "虎皮飞行档案", "自由低空航线");
    const budgiePad = document.querySelector("#flightField")?.dataset.flightPad;
    if (document.querySelector(".flight-course.perch-ladder")) errors.push("the budgie course should stay a free low-altitude route");
    dom.window.cancelMiniGame();
    dom.window.launchMiniGame("flight", "cockatiel", "玄凤飞行档案", "按高度升上栖木");
    const ladderTops = [...document.querySelectorAll(".flight-ring")].map(ring => Number.parseFloat(ring.style.top));
    if (!document.querySelector(".flight-course.perch-ladder")) errors.push("the cockatiel course did not switch to the perch ladder");
    if (ladderTops.some((top, index) => index && top > ladderTops[index - 1])) errors.push("the perch ladder rings were not ordered from low to high");
    if (Number(document.querySelector("#flightField")?.dataset.flightPad) >= Number(budgiePad)) errors.push("the perch ladder did not tighten its ring tolerance");
    if (ladderTops.length <= 3) errors.push("the perch ladder did not add an extra ring over the free flight course");
    dom.window.cancelMiniGame();

    const feedMastery = dom.window.miniMasteryFor("drag");
    const masteryBaseline = { ...feedMastery };
    dom.window.launchMiniGame("drag", "dog", "难度阶梯验证", "首次挑战");
    const gentleRounds = miniRoundsNow();
    if (document.querySelector("#miniGame")?.dataset.tier !== "1" || gentleRounds !== 3 || !document.querySelector("#miniDifficulty")?.textContent.includes("轻松")) errors.push("first attempt did not start on the gentle difficulty tier");
    dom.window.cancelMiniGame();
    feedMastery.plays = 12;
    feedMastery.bestCombo = 5;
    feedMastery.bestRating = "A";
    dom.window.launchMiniGame("drag", "dog", "难度阶梯验证", "已熟练");
    if (document.querySelector("#miniGame")?.dataset.tier !== "4" || miniRoundsNow() !== gentleRounds + 3 || !document.querySelector("#miniDifficulty")?.textContent.includes("大师")) errors.push("repeated completions did not raise the difficulty tier or round count");
    if (document.querySelector("#miniDifficulty")?.title !== "最佳 A · 连击 ×5") errors.push("mini-game header did not surface the recorded mastery");
    const feedOnce = async () => {
      await waitFor(() => Boolean(document.querySelector(".food-item:not(:disabled)")));
      document.querySelector(".food-item:not(:disabled)")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    };
    await feedOnce();
    if (document.querySelector("#miniCombo")?.hidden !== true) errors.push("combo chip appeared before a streak was built");
    await feedOnce();
    if (document.querySelector("#miniCombo")?.hidden !== false || document.querySelector("#miniCombo")?.textContent.trim() !== "连击 ×2") errors.push("combo counter did not track consecutive successes");
    dom.window.playFoley("miss");
    if (document.querySelector("#miniCombo")?.hidden !== true || document.querySelector("#miniRapport")?.textContent.trim() !== "耐心磨合") errors.push("a miss did not break the combo streak");
    dom.window.cancelMiniGame();
    Object.assign(feedMastery, masteryBaseline);
    dom.window.setTimeout = browserSetTimeout;
    if (dom.window.resolveTaskMiniGame("bubbles", "dog", "", "home", false, true).inspectMode !== "scent") errors.push("exploration cards did not force the active companion signature mechanic");
    if (dom.window.resolveTaskMiniGame("drag", "dog", "", "home", true).game !== "drag") errors.push("breakfast did not preserve direct feeding interaction");
    if (document.querySelector("#worldMapEffects, .stream-flow, .sea-glint")) errors.push("deprecated water motion layers are still rendered");
    if (document.querySelectorAll("#worldAmbient .wind-breath").length !== 2) errors.push("world wind motion layers are missing");
    if (document.querySelectorAll("#worldAmbient .world-cloud-band").length !== 2 || document.querySelectorAll("#worldAmbient .canopy-shadow").length !== 2) errors.push("world cloud and canopy motion layers are missing");
    if (document.querySelector("#sanctuaryLevel").textContent.trim() !== "Lv.1") errors.push("initial sanctuary level is incorrect");
    if (dom.window.allEvents().filter(event => event.id.startsWith("chance-")).length !== 2) errors.push("daily random event draw did not initialize");
    if (dom.window.allEvents().filter(event => event.id.startsWith("weather-")).length !== 1) errors.push("daily weather event did not initialize");
    const currentSave = dom.window.localStorage.getItem("valleySanctuarySaveV1");
    const legacySave = JSON.parse(currentSave || "{}");
    delete legacySave.petRoutines;
    legacySave.routine = { day: 1, breakfast: true, outing: false, bond: false, clean: false, sleep: false, bonus: false };
    const migratedSave = (() => {
      dom.window.localStorage.setItem("valleySanctuarySaveV1", JSON.stringify(legacySave));
      return dom.window.loadState();
    })();
    if (!migratedSave.petRoutines?.dog?.breakfast || Object.hasOwn(migratedSave, "routine")) errors.push("legacy shared routine did not migrate to the active pet");
    if (currentSave) dom.window.localStorage.setItem("valleySanctuarySaveV1", currentSave);
    const birdRescue = dom.window.allEvents().find(event => event.id === "rescue-cockatiel");
    if (!birdRescue || dom.window.eventRequirementsMet(birdRescue)) errors.push("bird rescue event was available without an owned bird companion");
    if (dom.window.eventPet(birdRescue) !== "dog") errors.push("unowned event animal replaced the active companion");
    document.querySelector("#helpButton").click();
    if (document.querySelectorAll("[data-claim-contract]").length !== 3) errors.push("daily contracts did not render");
    if (document.querySelectorAll("[data-claim-achievement]").length !== 8) errors.push("long-term achievements did not render");
    if (document.querySelector(".forecast-day, .weather-forecast")) errors.push("management journal revealed future weather");
    if (!document.querySelector(".mastery-empty")) errors.push("management journal did not explain the empty mastery ladder");
    document.querySelector("#helpDialog").close();
    if (document.querySelector(".queue-panel, .case-panel, .room-tabs")) errors.push("legacy clinic navigation is still present");
    if (document.querySelectorAll(".pet-chip").length !== 1) errors.push("initial owned pet roster is incorrect");
    if (document.body.classList.contains("dock-expanded") || document.querySelector("#dockToggle")?.getAttribute("aria-expanded") !== "false") errors.push("pet dock did not start collapsed");
    if (dom.window.getComputedStyle(document.querySelector("#petDock")).transform === "translateY(100%)") errors.push("persistent pet dock still uses an off-screen transform");
    if (!document.querySelector("#dockToggle")?.hidden) errors.push("pet dock showed a more button without roster overflow");
    if (!document.querySelector(".pet-chip .pet-portrait") || document.querySelector(".pet-chip .pet-name")?.textContent.trim() !== "奶糖") errors.push("persistent pet dock portrait or name is missing");

    document.querySelector("#calendarButton").click();
    if (!document.querySelector("#calendarDialog").open) errors.push("management calendar did not open");
    if (document.querySelectorAll(".calendar-page").length !== 2) errors.push("calendar book page layers are missing");
    if (document.querySelectorAll('.calendar-weekdays [role="columnheader"]').length !== 7) errors.push("calendar weekday header is incomplete");
    if (document.querySelectorAll("[data-calendar-day]").length !== 28) errors.push("calendar did not render a 28-day month");
    if (document.querySelectorAll('[data-calendar-day][role="gridcell"]').length !== 28) errors.push("calendar day grid semantics are missing");
    if (document.querySelectorAll(".calendar-day.today").length !== 1 || document.querySelector(".calendar-day.today")?.dataset.calendarDay !== "1") errors.push("current calendar day was not marked");
    if (document.querySelector(".calendar-weather, .calendar-date i") || document.querySelector('[data-calendar-day="1"]')?.getAttribute("aria-label").includes("天气")) errors.push("calendar revealed weather information");
    document.querySelector('[data-calendar-day="2"]')?.click();
    if (!document.querySelector("#calendarDetail")?.textContent.includes("溪桥补给集市")) errors.push("future market schedule did not render in date detail");
    if (!document.querySelector('[data-calendar-day="3"]')?.textContent.includes("救助")) errors.push("rescue intake day is missing from calendar");
    if (!document.querySelector('[data-calendar-day="7"]')?.classList.contains("festival")) errors.push("calendar festival day is missing");
    document.querySelector("#calendarDialog").close();
    const calendarAssetResponse = await fetch(`http://127.0.0.1:${port}/assets/ui/calendar-header.webp`);
    if (!calendarAssetResponse.ok) errors.push("calendar visual asset did not return HTTP 200");

    document.querySelector("#inventoryButton").click();
    if (document.querySelectorAll("[data-inventory-item]").length !== 8) errors.push("expanded backpack inventory did not render eight material types");
    if (document.querySelector("#backpackCapacity").textContent.trim() !== "14 / 24") errors.push("initial backpack capacity is incorrect");
    document.querySelector('[data-use-item="food"]')?.click();
    document.querySelector('[data-inventory-item="soap"]')?.click();
    document.querySelector('[data-use-item="soap"]')?.click();
    if (document.querySelector("#routineSummary").querySelectorAll(".routine-step.done").length !== 2) errors.push("using backpack care items did not advance daily routine");
    document.querySelector("#inventoryDialog").close();

    document.querySelector("#advanceButton").click();
    if (fullMotion && document.querySelector("#timeTransition")?.hidden) errors.push("clicking +30 minutes did not open the clock transition");
    await wait(fullMotion ? 1700 : 30);
    if (document.querySelector("#timeLabel")?.textContent.trim() !== "07:30" || document.querySelector("#advanceHourHand")?.style.transform !== "rotate(225deg)" || document.querySelector("#advanceMinuteHand")?.style.transform !== "rotate(180deg)") errors.push("clock hands or digital time did not advance by exactly 30 minutes");
    if (!document.querySelector('[data-location="rescue"] .event-badge')) errors.push("timed rescue event did not appear at 07:30");
    document.querySelector('[data-location="rescue"]').click();
    await wait(30);
    if (document.querySelector("#locationTitle").textContent !== "山谷救助站") errors.push("location navigation did not enter rescue station");
    if (document.querySelectorAll(".panel-explore-card").length !== 3) errors.push("mobile management panel did not render standalone exploration cards");
    document.querySelector("[data-panel-explore-game]")?.click();
    if (document.querySelector("#miniGame")?.hidden) errors.push("standalone exploration card did not open its mini-game");
    document.querySelector(".mini-close")?.click();
    document.querySelector("[data-panel-toggle]")?.click();
    if (!document.querySelector("#locationPanel").classList.contains("expanded")) errors.push("location work panel did not expand");
    document.querySelector("[data-panel-toggle]")?.click();
    document.querySelector('[data-event="rescue-rabbit"]')?.click();
    if (document.querySelector("#petSprite")?.dataset.petId !== "dog") errors.push("selecting a rescue event visually replaced the active companion with an unowned animal");
    if (!document.querySelector('[data-start-event="rescue-rabbit"]')?.textContent.includes("气味追踪")) errors.push("event start action did not preview the dog tracking mode");
    document.querySelector('[data-start-event="rescue-rabbit"]')?.click();
    if (document.querySelector("#miniGame").hidden) errors.push("rescue inspection mini-game did not open");
    if (!document.querySelector("#miniPet")?.src.includes("/actions/dog/")) errors.push("rescue mini-game replaced the active companion with an unowned animal");
    await completeInspection();
    const adoptButton = document.querySelector('[data-adopt="rabbit"]');
    if (!adoptButton) errors.push("rescued rabbit did not enter adoption list");
    else adoptButton.click();
    await wait(50);
    if (document.querySelectorAll(".pet-chip").length !== 2) errors.push("adoption did not add rabbit to owned roster");
    if (document.querySelector("#sanctuaryLevel").textContent.trim() !== "Lv.2") errors.push("rescue reputation did not unlock sanctuary level two");
    document.querySelector("#helpButton").click();
    const rescueAchievement = document.querySelector('[data-claim-achievement="first-rescue"]');
    if (!rescueAchievement || rescueAchievement.disabled) errors.push("first event achievement was not claimable");
    else rescueAchievement.click();
    if (document.querySelector('[data-claim-achievement="first-rescue"]')?.textContent.trim() !== "已完成") errors.push("achievement reward did not claim");
    if (!document.querySelectorAll(".mastery-row").length || !document.querySelector(".journal-summary")?.textContent.includes("互动评级")) errors.push("management journal did not track mini-game mastery after a completed rescue");
    document.querySelector("#helpDialog").close();

    dom.window.selectPet("dog");
    const rescueActivity = dom.window.activitiesAt("rescue").find(activity => activity.id === "rescue-sort");
    const dogGrowthBeforeTask = dom.window.statsFor("dog").growth;
    const rabbitGrowthBeforeTask = dom.window.statsFor("rabbit").growth;
    dom.window.startLocationActivity("rescue-sort");
    dom.window.selectPet("rabbit");
    dom.window.finishActiveGame();
    if (!document.querySelector("#statusFloat")?.textContent.includes("完成")) errors.push("task completion flourish did not render");
    if (!dom.window.activityDone(rescueActivity, "dog")) errors.push("task completion was not recorded for the pet that started it");
    if (dom.window.activityDone(rescueActivity, "rabbit")) errors.push("task completion leaked to the pet selected during the mini-game");
    if (dom.window.statsFor("dog").growth <= dogGrowthBeforeTask || dom.window.statsFor("rabbit").growth !== rabbitGrowthBeforeTask) errors.push("task rewards leaked across pets after switching during the mini-game");
    if (document.querySelector('[data-location-activity="rescue-sort"]')?.disabled) errors.push("another pet could not start its own copy of a completed daily activity");
    dom.window.markRoutine("breakfast", "dog");
    if (dom.window.routineDoneCount("dog") === dom.window.routineDoneCount("rabbit") || dom.window.routineFor("rabbit").breakfast) errors.push("daily routine progress leaked between pets");

    dom.window.selectPet("dog");
    dom.window.enterLocation("meadow");
    if (document.querySelector('[data-location-activity="meadow-carrot"]')) errors.push("rabbit-only carrot activity appeared for the active dog");
    dom.window.selectPet("rabbit");
    if (!document.querySelector('[data-location-activity="meadow-carrot"]')) errors.push("rabbit-only carrot activity did not appear for the active rabbit");

    document.querySelector("#backMapButton").click();
    if (document.querySelector('[data-location="lakeside"]').disabled) errors.push("lakeside did not unlock at level two");
    document.querySelector('[data-location="lakeside"]').click();
    if (!document.querySelector("#locationArt").src.includes("/assets/world/lakeside.webp")) errors.push("lakeside scene did not load");
    if (document.querySelector("#locationView").dataset.location !== "lakeside" || !document.querySelector("#locationView").style.getPropertyValue("--location-art").includes("lakeside.webp")) errors.push("location ambient layer did not bind to the active scene");
    if (document.querySelectorAll("#locationDetails .scene-prop").length !== 3 || document.querySelectorAll("#locationDetails .scene-activity").length !== 2 || !document.querySelector("#locationDetails .scene-detail-texture")) errors.push("lakeside scene detail layer did not render grounded environment cues");
    if (document.querySelector("#locationAmbient .location-water")) errors.push("deprecated location water motion layer is still rendered");
    if (!document.querySelector("#locationAmbient .location-foliage-copy")) errors.push("location foliage motion layer is missing");
    if (document.querySelector('[data-location-activity="lakeside-fishing"]')) errors.push("cat-only fishing appeared before the cat was owned");
    document.querySelector('[data-location-activity="lakeside-watch"]')?.click();
    await completeInspection();
    if (!document.querySelector('[data-location-activity="lakeside-watch"]')?.disabled) errors.push("completed location activity did not lock for the day");
    document.querySelector('[data-location-activity="lakeside-clean"]')?.click();
    if (!document.querySelector("#cleanupField") || document.querySelectorAll(".cleanup-patches img").length !== 6 || document.querySelectorAll(".cleanup-spot").length !== 3 || document.querySelectorAll(".cleanup-tool").length !== 3 || document.querySelectorAll("[data-cleanup-step]").length !== 4) errors.push("environment cleanup did not render the tool-choice and route puzzle");
    const cleanupField = document.querySelector("#cleanupField");
    const selectAttempt = new dom.window.Event("selectstart", { bubbles: true, cancelable: true });
    cleanupField?.dispatchEvent(selectAttempt);
    if (!selectAttempt.defaultPrevented) errors.push("rapid cleanup interaction still allowed native selection");
    const dragAttempt = new dom.window.Event("dragstart", { bubbles: true, cancelable: true });
    document.querySelector(".cleanup-tool")?.dispatchEvent(dragAttempt);
    if (!dragAttempt.defaultPrevented) errors.push("cleanup tool still allowed native image dragging");
    for (let index = 0; index < 3; index += 1) {
      const spot = document.querySelector(`[data-cleanup-spot="${index}"]`);
      spot?.click();
      document.querySelector(`[data-cleanup-tool="${spot?.dataset.cleanupRequired}"]`)?.click();
      spot?.dataset.cleanupRoute.split(",").forEach(direction => document.querySelector(`[data-cleanup-step="${direction}"]`)?.click());
      await wait(40);
    }
    await wait(760);
    document.querySelector("#backMapButton").click();
    document.querySelector('[data-location="market"]').click();
    const upgrade = document.querySelector("[data-upgrade-home]");
    if (!upgrade || upgrade.disabled) errors.push("home expansion was not available");
    else upgrade.click();
    if (document.querySelector('[data-location-activity="market-hamster-store"]')) errors.push("hamster-only storage activity appeared for another animal");
    document.querySelector('[data-buy-pet="hamster"]')?.click();
    await wait(40);
    if (document.querySelectorAll(".pet-chip").length !== 3) errors.push("market animal purchase did not add hamster");
    if (document.querySelector("#homeCapacity").textContent.trim() !== "3 / 3") errors.push("home capacity did not update after expansion");
    if (!document.querySelector('[data-location-activity="market-errand"]')?.textContent.includes("地道寻粮")) errors.push("location activity did not preview the hamster burrow mode");
    document.querySelector('[data-location-activity="market-errand"]')?.click();
    if (document.querySelector("#miniGame")?.dataset.game !== "burrow" || document.querySelector(".mini-mode-label")?.textContent.trim() !== "地道寻粮" || !document.querySelector("#burrowBoard") || document.querySelectorAll(".burrow-cell.seed").length !== miniRoundsNow()) errors.push("hamster market errand did not use the burrow route game");
    await completeInspection();
    const hamsterStore = document.querySelector('[data-location-activity="market-hamster-store"]');
    if (!hamsterStore || !hamsterStore.textContent.includes("地道寻粮")) errors.push("hamster-specific burrow activity did not appear with its interaction mode");
    hamsterStore?.click();
    if (document.querySelector(".mini-mode-label")?.textContent.trim() !== "地道寻粮" || !document.querySelector("#burrowBoard") || document.querySelectorAll(".burrow-cell.seed").length !== miniRoundsNow()) errors.push("hamster storage did not use the burrow route game");
    if (!document.querySelector("#miniInstruction")?.textContent.includes("地道")) errors.push("hamster burrow instructions did not describe the route interaction");
    await completeInspection();

    dom.window.launchMiniGame("flight", "budgie", "低空召回练习", "引导鸟类穿过召回环");
    if (document.querySelector(".mini-mode-label")?.textContent.trim() !== "低空飞行" || !document.querySelector("#flightField") || document.querySelectorAll(".flight-ring").length !== miniRoundsNow()) errors.push("bird activity did not use continuous ring-guided flight");
    if (document.querySelector(".ball, .play-goal")) errors.push("bird flight incorrectly reused the ground-animal fetch game");
    document.querySelector(".mini-close")?.click();

    document.querySelector("#goHomeButton").click();
    document.querySelector('[data-home-action="feed"]')?.click();
    if (!document.querySelector('.food-item img')?.src.includes('/assets/props/hamster-food.webp')) errors.push("feeding did not use the active pet food asset");
    if (!document.querySelector(".food-item")?.classList.contains("attention")) errors.push("feeding item did not receive its one-shot visibility cue");
    const firstFoodSpawn = document.querySelector(".food-item")?.dataset.spawn;
    if (!document.querySelector("#locationView").classList.contains("playing")) errors.push("mini-game did not preserve the location scene state");
    document.querySelector(".mini-close")?.click();
    if (document.querySelector("#locationView").classList.contains("playing")) errors.push("location scene did not restore after closing mini-game");
    document.querySelector('[data-home-action="feed"]')?.click();
    const secondFoodSpawn = document.querySelector(".food-item")?.dataset.spawn;
    if (!firstFoodSpawn || firstFoodSpawn === secondFoodSpawn) errors.push("feeding food did not refresh to a random safe position");
    document.querySelector(".mini-close")?.click();

    document.querySelector('[data-home-action="bath"]')?.click();
    if (document.querySelectorAll(".pet-bubble-layer .bubble").length !== 7) errors.push("bath bubbles were not attached to the pet-sized layer");
    if (!document.querySelector("#miniInstruction")?.textContent.includes("按住海绵")) errors.push("bath still instructed point-clicking instead of continuous scrubbing");
    document.querySelector(".mini-close")?.click();

    document.querySelector('[data-home-action="pet"]')?.click();
    if (!document.querySelector('.hand-tool img')?.src.includes('/assets/props/petting-hand.webp')) errors.push("petting did not use the hand asset");
    if (document.querySelector("#miniRapport")?.textContent.trim() !== "默契准备中") errors.push("mini-game did not show the initial interaction-quality state");
    const pettingTrustBefore = dom.window.statsFor("hamster").trust;
    const strokeRounds = miniRoundsNow();
    for (let stroke = 0; stroke < strokeRounds - 1; stroke += 1) document.querySelector("#strokePath")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    dom.window.finishActiveGame();
    if (dom.window.statsFor("hamster").trust < pettingTrustBefore + 5 || !document.querySelector("#statusFloat")?.textContent.includes("完成 · 默契")) errors.push("mistake-free petting did not grant the rapport bonus");
    if (!document.querySelector("#statusFloat .flourish-meta")?.textContent.includes(`连击 ×${strokeRounds - 1}`)) errors.push("completion flourish did not report the difficulty, rating and combo");
    if (dom.window.miniMasteryFor("stroke").plays < 1) errors.push("finishing a mini-game did not record mastery progress");

    document.querySelector('[data-home-action="pet"]')?.click();
    for (let stroke = 0; stroke < miniRoundsNow() - 1; stroke += 1) document.querySelector("#strokePath")?.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    dom.window.playFoley("miss");
    dom.window.playFoley("miss");
    if (document.querySelector("#miniRapport")?.textContent.trim() !== "耐心磨合") errors.push("mini-game miss did not update the interaction-quality state");
    const recoveryTrustBefore = dom.window.statsFor("hamster").trust;
    dom.window.finishActiveGame();
    if (dom.window.statsFor("hamster").trust < recoveryTrustBefore + 4 || !document.querySelector("#statusFloat")?.textContent.includes("完成 · 耐心")) errors.push("recovering from a miss did not preserve the reduced rapport bonus");

    document.querySelector('[data-home-action="play"]')?.click();
    if (document.querySelector("#miniGame")?.dataset.game !== "burrow" || !document.querySelector("#burrowBoard") || document.querySelectorAll(".burrow-cell.seed").length !== miniRoundsNow()) errors.push("hamster home play did not route to its burrow interaction");
    if (document.querySelector(".mini-progress")?.getAttribute("role") !== "progressbar") errors.push("mini-game progress semantics are missing");
    solveBurrow();
    await wait(fullMotion ? 1500 : 140);
    await wait(750);
    if (!document.querySelector("#miniGame").hidden) errors.push("home pet-specific play interaction did not complete");
    dom.window.markRoutine("breakfast", "hamster");
    dom.window.markRoutine("clean", "hamster");
    document.querySelector("[data-companion]")?.click();
    if (document.querySelector("#companionSprite").hidden) errors.push("owned animal companion interaction did not start");
    document.querySelector("[data-sleep]")?.click();
    if (document.querySelector("#sleepStatus").hidden) errors.push("pet sleep state did not start");
    if (!document.querySelector("#petSprite")?.src.includes("/sleep.webp") || document.querySelector("#sleepNest")?.hidden) errors.push("sleep did not use the dedicated lying pose and bed layer");
    if (document.querySelectorAll('#sleepNest:not([hidden]) img, .placed-furniture[data-furniture="starter-bed"] img').length !== 1) errors.push("sleep duplicated the already placed bed");
    if (document.querySelector("#locationView")?.style.getPropertyValue("--sleep-x") !== "56%" || document.querySelector("#locationView")?.style.getPropertyValue("--sleep-y") !== "78%") errors.push("sleep did not align to the saved bed position");
    document.querySelector("[data-sleep-advance]")?.click();
    document.querySelector("[data-sleep-advance]")?.click();
    if (document.querySelector("#locationPanel").querySelectorAll(".routine-step.done").length !== 5) errors.push("sleep did not complete the connected five-step daily routine");
    if (document.querySelector("#sleepDuration").textContent.trim() !== "120 分钟") errors.push("sleep duration did not accumulate with time progression");
    if (dom.window.routineDoneCount("dog") === 5 || dom.window.routineDoneCount("rabbit") === 5) errors.push("one pet completing its routine completed another pet's routine");

    dom.window.applyReward({ reputation: 135 }, "dog");
    dom.window.renderAll();
    dom.window.showWorld();
    if (document.querySelector("#sanctuaryLevel").textContent.trim() !== "Lv.7") errors.push("sanctuary level seven did not unlock from cumulative reputation");
    if (document.querySelectorAll(".map-hotspot.locked").length) errors.push("locations remained locked at maximum sanctuary level");
    if (!document.querySelector('[data-location="saltmarsh"]')?.textContent.includes("潮汐盐沼") || !document.querySelector('[data-location="greenhouse"]')?.textContent.includes("星灯温室")) errors.push("new high-level map locations did not render their names");
    if (document.querySelectorAll(".world-expansion").length !== 2 || !document.querySelector(".world-expansion-saltmarsh img") || !document.querySelector(".world-expansion-greenhouse img")) errors.push("unlocked map expansion previews did not render on the big map");
    while (dom.window.weatherBlockReason("saltmarsh")) dom.window.nextDay();
    dom.window.enterLocation("saltmarsh");
    if (!document.querySelector("#locationArt").src.includes("saltmarsh.webp") || document.querySelectorAll("#locationDetails .scene-prop").length !== 3 || !document.querySelector('[data-location-activity="saltmarsh-tide-gate"]')) errors.push("saltmarsh location did not load its scene, detail layer, and activities");
    dom.window.enterLocation("greenhouse");
    if (!document.querySelector("#locationArt").src.includes("greenhouse.webp") || !document.querySelector('[data-location-activity="greenhouse-lamp-cycle"]')) errors.push("greenhouse location did not load its scene and activities");
    dom.window.statsFor("hamster").asleep = false;
    dom.window.selectPet("hamster");
    document.querySelector('[data-location="forest"]').click();
    document.querySelector('[data-location-activity="forest-patrol"]')?.click();
    if (document.querySelector("#miniGame")?.dataset.inspectMode !== "scent" || document.querySelector(".mini-mode-label")?.textContent.trim() !== "气味追踪" || !document.querySelector("#scentField")) errors.push("forest scent patrol did not use scent tracking for the selected hamster");
    if (document.querySelector("#forageBasket, .forage-item, .food-item")) errors.push("forest scent patrol incorrectly rendered food props");
    await completeInspection();
    document.querySelector("#backMapButton").click();
    dom.window.selectPet("dog");
    document.querySelector('[data-location="highlands"]').click();
    if (!document.querySelector("#locationArt").src.includes("/assets/world/highlands.webp")) errors.push("highlands scene did not load");
    document.querySelector('[data-location-activity="highlands-markers"]')?.click();
    if (document.querySelector("#miniGame")?.dataset.game !== "trail" || document.querySelector(".mini-mode-label")?.textContent.trim() !== "高地路线" || !document.querySelector("#trailBoard")) errors.push("dog highland patrol did not use the route-planning game");
    if (document.querySelectorAll("[data-trail-dir]").length !== 4) errors.push("highland route did not expose touch direction controls");
    ["ArrowRight", "ArrowUp", "ArrowUp", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowDown", "ArrowDown"].forEach(key => document.querySelector(`[data-trail-dir="${key}"]`)?.click());
    await wait(720);
    if (!document.querySelector("#miniGame")?.hidden) errors.push("touch direction controls did not complete the highland route");
    await completeInspection();
    const firstRandomDraw = dom.window.allEvents().filter(event => event.id.startsWith("chance-")).map(event => event.id).join(",");
    dom.window.nextDay();
    if (document.querySelector("#weatherTransition").hidden || document.querySelector("#weatherTransition").dataset.weather !== "cloudy" || document.querySelectorAll(".preview-cloud").length !== 5) errors.push("cloudy next-day weather transition did not animate");
    const firstDayHistory = dom.window.calendarDayInfo(1).history;
    if (!firstDayHistory || firstDayHistory.routine !== 5 || firstDayHistory.ownedPets !== 3) errors.push("next day did not archive the previous management day");
    const savedCalendarHistory = JSON.parse(dom.window.localStorage.getItem("valleySanctuarySaveV1") || "{}").calendarHistory;
    if (!savedCalendarHistory?.["1"] || savedCalendarHistory["1"].routine !== 5) errors.push("calendar history did not persist to save data");
    if (dom.window.loadState().calendarHistory?.["1"]?.routine !== 5) errors.push("saved calendar history did not restore through state loading");
    document.querySelector("#calendarButton").click();
    if (document.querySelector(".calendar-day.today")?.dataset.calendarDay !== "2") errors.push("current-day calendar marker did not advance");
    if (!document.querySelector('[data-calendar-day="1"]')?.textContent.includes("已完成")) errors.push("past calendar day did not show completion summary");
    document.querySelector("#calendarDialog").close();
    const secondRandomDraw = dom.window.allEvents().filter(event => event.id.startsWith("chance-")).map(event => event.id).join(",");
    if (secondRandomDraw.split(",").filter(Boolean).length !== 8 || secondRandomDraw === firstRandomDraw) errors.push("next day did not refresh the random event draw");
    if (document.body.dataset.weather !== "cloudy" || !dom.window.allEvents().some(event => event.id === "weather-cloudy-clinic")) errors.push("next-day weather and weather event did not refresh together");
    if (document.querySelectorAll(".cloud-shadow").length !== 10) errors.push("cloudy weather animation did not render in both scenes");
    dom.window.nextDay();
    if (document.querySelector("#weatherTransition").dataset.weather !== "rain" || document.querySelectorAll(".preview-rain").length !== 24 || document.querySelectorAll(".preview-ripple").length !== 6) errors.push("rain next-day weather transition did not animate");
    if (document.body.dataset.weather !== "rain" || !dom.window.allEvents().some(event => event.id === "weather-rain-home")) errors.push("rain weather and event did not activate");
    if (document.querySelectorAll(".rain-drop").length !== 88 || document.querySelectorAll(".rain-ripple").length !== 28) errors.push("rain streaks and ground ripples did not render in both scenes");
    if (!dom.window.weatherBlockReason("meadow", "heavyRain") || !dom.window.weatherBlockReason("forest", "thunderstorm") || dom.window.weatherBlockReason("clinic", "thunderstorm") || dom.window.weatherBlockReason("rescue", "heavyRain") || dom.window.weatherBlockReason("market", "drizzle")) errors.push("severe-weather location safety rules are incorrect");
    dom.window.enterLocation("home");
    dom.window.statsFor("dog").asleep = true;
    dom.window.enterLocation("rescue");
    if (document.querySelector("#locationView")?.dataset.location === "rescue") errors.push("sleeping partner was allowed to leave home");
    dom.window.statsFor("dog").asleep = false;
    if (!dom.window.activityWeatherBlockedReason({ weatherSensitive: "birdFlight" }, "meadow", "wind")) errors.push("bird flight remained available in unsafe wind");
    const weatherProbe = document.createElement("div");
    weatherProbe.innerHTML = dom.window.weatherEffectMarkup("heavyRain");
    if (weatherProbe.querySelectorAll(".rain-drop").length !== 72 || weatherProbe.querySelectorAll(".rain-ripple").length !== 24) errors.push("heavy-rain particle density is incorrect");
    weatherProbe.innerHTML = dom.window.weatherEffectMarkup("thunderstorm");
    if (weatherProbe.querySelectorAll(".rain-drop").length !== 84 || weatherProbe.querySelectorAll(".lightning-flash").length !== 2) errors.push("thunderstorm rain or lightning layers are incomplete");

    dom.window.applyReward({ coins: 300, reputation: 20, candidate: "cat" }, "dog");
    dom.window.upgradeHome();
    dom.window.adoptPet("cat");
    dom.window.selectPet("cat");
    dom.window.enterLocation("lakeside");
    const fishingActivity = document.querySelector('[data-location-activity="lakeside-fishing"]');
    if (!fishingActivity) errors.push("cat fishing did not appear after adoption");
    else fishingActivity.click();
    if (!document.querySelector(".fishing-float") || !document.querySelector('.fishing-rod[src*="fishing-rod.webp"]')) errors.push("fishing game did not render rod, float and water state");
    const originalRandom = dom.window.Math.random;
    dom.window.Math.random = () => 0;
    document.querySelector("#fishCommand")?.click();
    await wait(920);
    document.querySelector("#fishCommand")?.click();
    await wait(1120);
    document.querySelector("#fishCommand")?.click();
    await wait(920);
    document.querySelector("#fishCommand")?.click();
    await wait(1200);
    dom.window.Math.random = originalRandom;
    const fishingSave = JSON.parse(dom.window.localStorage.getItem("valleySanctuarySaveV1") || "{}");
    if ((fishingSave.inventory?.fish || 0) < 2) errors.push("fishing reward did not add fish to the backpack");

    dom.window.selectPet("rabbit");
    dom.window.enterLocation("meadow");
    document.querySelector('[data-location-activity="meadow-carrot"]')?.click();
    if (!document.querySelector("#carrotCrop") || !document.querySelector(".rhythm-controls")) errors.push("rabbit carrot rhythm game did not render");
    for (let beat = 0; beat < 12; beat += 1) {
      const prompt = document.querySelector("#rhythmPrompt")?.textContent || "先按左";
      document.querySelector(prompt.includes("右") ? "#pullRight" : "#pullLeft")?.click();
    }
    await wait(950);
    const carrotSave = JSON.parse(dom.window.localStorage.getItem("valleySanctuarySaveV1") || "{}");
    if ((carrotSave.inventory?.carrot || 0) < 2) errors.push("carrot game reward did not add carrots to the backpack");

    dom.window.selectPet("dog");
    dom.window.enterLocation("training");
    document.querySelector('[data-location-activity="training-fetch"]')?.click();
    if (!document.querySelector(".power-meter") || !document.querySelector("#throwCommand")) errors.push("dog strength throw game did not render");
    await wait(80);
    await solveTimingWindow({
      rounds: 1,
      ready: () => !document.querySelector("#throwCommand")?.disabled,
      inWindow: () => needleAt("#powerNeedle") >= 48 && needleAt("#powerNeedle") <= 62,
      press: () => document.querySelector("#throwCommand")?.click()
    });
    if (!document.querySelector('.throw-prop img[src*="dog-bone.webp"]')) errors.push("dog throw game did not use its bone prop");
    document.querySelector(".mini-close")?.click();

    while (dom.window.weatherBlockReason("market")) dom.window.nextDay();
    dom.window.enterLocation("market");
    document.querySelector('[data-buy-furniture="woven-rug"]')?.click();
    dom.window.enterLocation("home");
    document.querySelector('[data-home-mode="furnish"]')?.click();
    if (document.querySelectorAll(".placed-furniture").length < 2 || !document.querySelector('[data-furniture="woven-rug"]')) errors.push("purchased furniture did not appear in home layout mode");
    const placedRug = document.querySelector('[data-furniture="woven-rug"]');
    placedRug?.dispatchEvent(new dom.window.MouseEvent("pointerdown", { bubbles: true, clientX: 100, clientY: 100 }));
    placedRug?.dispatchEvent(new dom.window.MouseEvent("pointermove", { bubbles: true, clientX: 120, clientY: 108 }));
    placedRug?.dispatchEvent(new dom.window.MouseEvent("pointerup", { bubbles: true, clientX: 120, clientY: 108 }));
    const furnitureSave = JSON.parse(dom.window.localStorage.getItem("valleySanctuarySaveV1") || "{}");
    if (!furnitureSave.furniturePlaced?.["woven-rug"] || furnitureSave.furniturePlaced["woven-rug"].x === undefined || furnitureSave.furniturePlaced["woven-rug"].layer === undefined) errors.push("furniture position did not persist after dragging");
    document.querySelector('[data-furniture="woven-rug"]')?.click();
    document.querySelector('[data-furniture-adjust="rotate-right"]')?.click();
    document.querySelector('[data-furniture-adjust="scale-up"]')?.click();
    const transformedFurniture = JSON.parse(dom.window.localStorage.getItem("valleySanctuarySaveV1") || "{}").furniturePlaced?.["woven-rug"];
    if (!transformedFurniture || transformedFurniture.rotation !== 15 || transformedFurniture.scale <= 1) errors.push("furniture rotation and scale controls did not persist");
    dom.window.statsFor("dog").hunger = 90;
    dom.window.statsFor("dog").energy = 90;
    dom.window.selectPet("dog");
    document.querySelector('[data-home-mode="life"]')?.click();
    if (!document.querySelector('[data-home-action="feed"]')?.disabled) errors.push("full pet was still allowed to start feeding");
    if (!document.querySelector("[data-sleep]")?.disabled) errors.push("high-energy pet was still allowed to sleep during daytime");
    if (dom.window.__audioPlayCount < 1 || dom.window.__foleyStartCount < 1) errors.push("audio system did not start animal audio and WebAudio foley");
    dom.window.statsFor("cat").hunger = 12;
    dom.window.renderRoster();
    if (document.querySelector(".pet-chip")?.dataset.petId !== "cat" || !document.querySelector('.pet-chip[data-pet-id="cat"] .need-mark')) errors.push("urgent pet was not promoted to the front of the persistent roster");

    for (const id of ["dog", "cat", "rabbit", "hamster", "poodle", "fox", "budgie", "cockatiel"]) {
      for (let variant = 1; variant <= 3; variant += 1) {
        if (!existsSync(`assets/audio/animals/${id}-${variant}.mp3`)) errors.push(`${id} voice variant ${variant} is missing`);
      }
      for (const action of ["idle", "eat", "affection", "play"]) {
        for (const frame of [0, 1]) {
          if (!existsSync(`assets/pets/actions/${id}/${action}-${frame}.webp`)) errors.push(`${id} ${action} frame ${frame} is missing`);
        }
      }
      if (!existsSync(`assets/pets/actions/${id}/sleep.webp`)) errors.push(`${id} sleep pose is missing`);
    }
    for (const asset of ["world-map", "world-map-mobile", "world-map-wetlands", "world-map-wetlands-mobile", "world-map-autumn", "world-map-autumn-mobile", "world-map-winter", "world-map-winter-mobile", "world-map-night", "world-map-night-mobile", "home", "rescue", "market", "forest", "lakeside", "training", "highlands", "saltmarsh", "greenhouse"]) {
      if (!existsSync(`assets/world/${asset}.webp`)) errors.push(`${asset} world asset is missing`);
    }
    if (!existsSync("assets/ui/calendar-header.webp")) errors.push("realistic calendar header asset is missing");
    for (const icon of ["favicon.ico", "favicon-32.png", "site-icon-512.png", "apple-touch-icon.png"]) {
      if (!existsSync(`assets/ui/${icon}`)) errors.push(`${icon} site icon is missing`);
    }
    for (const asset of ["pet-ball", "petting-hand", "grooming-brush", "wash-sponge", "dog-food", "cat-food", "rabbit-food", "hamster-food", "fox-food", "bird-food", "bird-toy", "fishing-rod", "fish", "carrot", "dog-bone", "training-ring", "cat-toy", "rabbit-toy", "seed-ball", "pinecone-toy", "starter-bed", "woven-rug", "cat-post", "rabbit-tunnel", "toy-basket", "magnifier", "tracking-nose", "cleanup-cloth", "rake", "landing-net", "leaf-pile", "wet-debris", "mud-splash"]) {
      if (!existsSync(`assets/props/${asset}.webp`)) errors.push(`${asset} interaction asset is missing`);
    }
    if (!dom.window.rectsOverlap({ left: 0, right: 20, top: 0, bottom: 20 }, { left: 30, right: 50, top: 0, bottom: 20 }, 12)) errors.push("expanded drag target did not register overlap");

    dom.window.close();
    if (errors.length) throw new Error(errors.join("\n"));
    console.log("World management smoke test: OK");
  } finally {
    server?.kill("SIGTERM");
  }
})().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
