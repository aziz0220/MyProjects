const ASSETS = {
  player: new URL("./snail.webp", import.meta.url).href,
  chest: new URL("./chest.webp", import.meta.url).href,
  question: new URL("./Question.webp", import.meta.url).href,
  gold: new URL("./gold.webp", import.meta.url).href,
  hourglass: new URL("./hourglass.webp", import.meta.url).href,
  enemy: new URL("./Death_skull.webp", import.meta.url).href
};

const MUSIC_TRACKS = [
  new URL("./Abakus - Chips Challenge.mp3", import.meta.url).href,
  new URL("./Abakus - K-Hole.mp3", import.meta.url).href
];

const SFX = {
  click: new URL("./botton.wav", import.meta.url).href,
  move: new URL("./move.wav", import.meta.url).href,
  coin: new URL("./coin.wav", import.meta.url).href,
  trap: new URL("./malus1.wav", import.meta.url).href,
  gold: new URL("./malus.wav", import.meta.url).href,
  bonus: new URL("./bonus.wav", import.meta.url).href,
  hit: new URL("./hit.wav", import.meta.url).href,
  loss: new URL("./loss.wav", import.meta.url).href,
  win: new URL("./win.wav", import.meta.url).href,
  final: new URL("./finalscore.wav", import.meta.url).href,
  tick: new URL("./move.wav", import.meta.url).href
};

const PRESETS = {
  easy: {
    size: 25,
    time: 130,
    lives: 4,
    loot: {
      enabled: true,
      chest: { min: 8, max: 12 },
      question: { min: 2, max: 4 },
      gold: { min: 1, max: 3 },
      hourglass: { min: 1, max: 3 }
    },
    enemies: {
      enabled: false,
      range: { min: 0, max: 0 },
      moveMs: 930,
      chase: 0.12
    }
  },
  medium: {
    size: 35,
    time: 95,
    lives: 3,
    loot: {
      enabled: true,
      chest: { min: 12, max: 20 },
      question: { min: 4, max: 8 },
      gold: { min: 3, max: 6 },
      hourglass: { min: 2, max: 6 }
    },
    enemies: {
      enabled: false,
      range: { min: 0, max: 0 },
      moveMs: 820,
      chase: 0.28
    }
  },
  hard: {
    size: 35,
    time: 70,
    lives: 2,
    loot: {
      enabled: true,
      chest: { min: 15, max: 24 },
      question: { min: 5, max: 10 },
      gold: { min: 4, max: 8 },
      hourglass: { min: 4, max: 9 }
    },
    enemies: {
      enabled: true,
      range: { min: 4, max: 12 },
      moveMs: 720,
      chase: 0.58
    }
  }
};

const DIRECTION_RULES = {
  up: { wall: 0, dr: -1, dc: 0 },
  right: { wall: 1, dr: 0, dc: 1 },
  down: { wall: 2, dr: 1, dc: 0 },
  left: { wall: 3, dr: 0, dc: -1 }
};

const KEY_TO_DIRECTION = new Map([
  ["ArrowUp", "up"],
  ["ArrowRight", "right"],
  ["ArrowDown", "down"],
  ["ArrowLeft", "left"],
  ["w", "up"],
  ["W", "up"],
  ["z", "up"],
  ["Z", "up"],
  ["d", "right"],
  ["D", "right"],
  ["s", "down"],
  ["S", "down"],
  ["a", "left"],
  ["A", "left"],
  ["q", "left"],
  ["Q", "left"]
]);

const CODE_TO_DIRECTION = new Map([
  ["ArrowUp", "up"],
  ["ArrowRight", "right"],
  ["ArrowDown", "down"],
  ["ArrowLeft", "left"],
  ["KeyW", "up"],
  ["KeyZ", "up"],
  ["KeyD", "right"],
  ["KeyS", "down"],
  ["KeyA", "left"],
  ["KeyQ", "left"]
]);

const EXTENSION_PROTOCOL = "chrome-extension://";

function isExtensionNoise(text = "") {
  return typeof text === "string" && text.includes(EXTENSION_PROTOCOL);
}

function installExtensionErrorFilter() {
  // Ignore extension-injected runtime failures so only game errors remain visible.
  window.addEventListener(
    "error",
    (event) => {
      const message = String(event.message || "");
      const filename = String(event.filename || "");
      if (isExtensionNoise(message) || isExtensionNoise(filename)) {
        event.preventDefault();
      }
    },
    true
  );

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message =
      typeof reason === "object" && reason && "message" in reason
        ? String(reason.message || "")
        : String(reason || "");
    if (isExtensionNoise(message)) {
      event.preventDefault();
    }
  });
}

const dom = {
  menuView: document.getElementById("menuView"),
  gameView: document.getElementById("gameView"),
  startGameBtn: document.getElementById("startGameBtn"),
  musicToggleBtn: document.getElementById("musicToggleBtn"),
  difficultyInputs: Array.from(document.querySelectorAll('input[name="difficulty"]')),
  customSettings: document.getElementById("customSettings"),
  customSize: document.getElementById("customSize"),
  customTime: document.getElementById("customTime"),
  customLootEnabled: document.getElementById("customLootEnabled"),
  customEnemiesEnabled: document.getElementById("customEnemiesEnabled"),
  customLootRanges: document.getElementById("customLootRanges"),
  customEnemyRanges: document.getElementById("customEnemyRanges"),
  chestMin: document.getElementById("chestMin"),
  chestMax: document.getElementById("chestMax"),
  hourglassMin: document.getElementById("hourglassMin"),
  hourglassMax: document.getElementById("hourglassMax"),
  trapMin: document.getElementById("trapMin"),
  trapMax: document.getElementById("trapMax"),
  goldMin: document.getElementById("goldMin"),
  goldMax: document.getElementById("goldMax"),
  enemyMin: document.getElementById("enemyMin"),
  enemyMax: document.getElementById("enemyMax"),
  menuError: document.getElementById("menuError"),
  startPauseBtn: document.getElementById("startPauseBtn"),
  restartBtn: document.getElementById("restartBtn"),
  backMenuBtn: document.getElementById("backMenuBtn"),
  hudMode: document.getElementById("hudMode"),
  hudTime: document.getElementById("hudTime"),
  hudScore: document.getElementById("hudScore"),
  hudCoins: document.getElementById("hudCoins"),
  hudSteps: document.getElementById("hudSteps"),
  hudLives: document.getElementById("hudLives"),
  hudStreak: document.getElementById("hudStreak"),
  timeBar: document.getElementById("timeBar"),
  maze: document.getElementById("maze"),
  statusText: document.getElementById("statusText"),
  mobilePad: document.getElementById("mobilePad"),
  objectiveText: document.getElementById("objectiveText"),
  hintBtn: document.getElementById("hintBtn"),
  freezeBtn: document.getElementById("freezeBtn"),
  abilityInfo: document.getElementById("abilityInfo"),
  eventLog: document.getElementById("eventLog"),
  resultOverlay: document.getElementById("resultOverlay"),
  resultTitle: document.getElementById("resultTitle"),
  resultMessage: document.getElementById("resultMessage"),
  resultScore: document.getElementById("resultScore"),
  resultCoins: document.getElementById("resultCoins"),
  resultSteps: document.getElementById("resultSteps"),
  resultLives: document.getElementById("resultLives"),
  resultStreak: document.getElementById("resultStreak"),
  resultModeBonus: document.getElementById("resultModeBonus"),
  resultBase: document.getElementById("resultBase"),
  resultTimeBonus: document.getElementById("resultTimeBonus"),
  resultCoinBonus: document.getElementById("resultCoinBonus"),
  resultStreakBonus: document.getElementById("resultStreakBonus"),
  resultSurvivalBonus: document.getElementById("resultSurvivalBonus"),
  closeResultBtn: document.getElementById("closeResultBtn"),
  playAgainBtn: document.getElementById("playAgainBtn")
};

const state = {
  config: null,
  mode: "easy",
  rows: 0,
  cols: 0,
  grid: [],
  cellElements: [],
  exits: new Set(),
  playerIndex: 0,
  loot: createEmptyLoot(),
  enemies: [],
  status: "idle",
  score: 0,
  coins: 0,
  steps: 0,
  lives: 0,
  streak: 0,
  maxStreak: 0,
  lastChestAt: 0,
  timeLeft: 120,
  timeTotal: 120,
  enemyFreezeUntil: 0,
  invulnerableUntil: 0,
  hintCells: new Set(),
  timers: {
    countdown: null,
    enemies: null,
    hintClear: null
  },
  controls: {
    heldDirection: null,
    pressedKeys: new Map(),
    keyOrder: [],
    moveCooldownMs: 82,
    lastMoveAt: 0,
    rafId: null
  },
  audioEnabled: true,
  backgroundAudio: null,
  trackCursor: Math.floor(Math.random() * MUSIC_TRACKS.length)
};

let resizeTimer = null;

function init() {
  installExtensionErrorFilter();
  bindEvents();
  ensureMovementLoop();
  updateCustomVisibility();
  updateAudioButton();
  updateHud();
  updateStartPauseButton();
  setObjectiveText("Configure your run, then generate a maze.");
  setMenuError("");
  setAbilityInfo("Hint Path costs 1 coin. Freeze Enemies costs 2 coins.");
}

function bindEvents() {
  dom.difficultyInputs.forEach((input) => {
    input.addEventListener("change", updateCustomVisibility);
  });

  dom.customLootEnabled.addEventListener("change", updateCustomVisibility);
  dom.customEnemiesEnabled.addEventListener("change", updateCustomVisibility);

  dom.startGameBtn.addEventListener("click", () => {
    playSfx("click", 0.25);
    const config = getSelectedConfig();
    if (!config) {
      return;
    }

    state.config = config;
    state.mode = config.mode;
    showGameView();
    createNewMaze();
  });

  dom.musicToggleBtn.addEventListener("click", () => {
    state.audioEnabled = !state.audioEnabled;
    if (!state.audioEnabled && state.backgroundAudio) {
      state.backgroundAudio.pause();
    }
    if (state.audioEnabled && state.status !== "idle") {
      ensureBackgroundTrack();
      playSfx("click", 0.2);
    }
    updateAudioButton();
  });

  dom.startPauseBtn.addEventListener("click", () => {
    playSfx("click", 0.2);
    toggleStartPause();
  });

  dom.restartBtn.addEventListener("click", () => {
    if (!state.config) {
      return;
    }
    playSfx("click", 0.2);
    createNewMaze();
  });

  dom.backMenuBtn.addEventListener("click", () => {
    playSfx("click", 0.2);
    clearTimers();
    clearHintPath();
    state.status = "idle";
    if (state.backgroundAudio) {
      state.backgroundAudio.pause();
    }
    hideResultOverlay();
    showMenuView();
    updateStartPauseButton();
    setMenuError("");
  });

  dom.hintBtn.addEventListener("click", activateHintPath);
  dom.freezeBtn.addEventListener("click", activateFreezeEnemies);

  dom.closeResultBtn.addEventListener("click", () => {
    playSfx("click", 0.2);
    hideResultOverlay();
  });

  dom.playAgainBtn.addEventListener("click", () => {
    playSfx("click", 0.2);
    hideResultOverlay();
    if (state.config) {
      createNewMaze();
    }
  });

  dom.mobilePad.addEventListener("pointerdown", (event) => {
    const button = event.target.closest("button[data-dir]");
    if (!button) {
      return;
    }
    event.preventDefault();
    tryMove(button.dataset.dir);
  });

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
  window.addEventListener("blur", resetMovementInput);

  window.addEventListener("resize", () => {
    if (!state.grid.length || dom.gameView.classList.contains("hidden")) {
      return;
    }

    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      renderMaze();
      renderEntities();
    }, 140);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.status === "running") {
      state.status = "paused";
      resetMovementInput();
      setStatus("Auto-paused while tab is hidden.", "warn");
      pushEvent("Auto-paused");
      updateStartPauseButton();
      updateAbilityButtons();
    }
  });
}

function handleKeydown(event) {
  const gameVisible = !dom.gameView.classList.contains("hidden");
  if (!gameVisible) {
    return;
  }

  const direction = resolveDirection(event);
  if (direction) {
    event.preventDefault();
    pressDirection(event, direction);
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    toggleStartPause();
    return;
  }

  if (event.key === "r" || event.key === "R") {
    event.preventDefault();
    if (state.config) {
      createNewMaze();
    }
    return;
  }

  if (event.key === "h" || event.key === "H") {
    event.preventDefault();
    activateHintPath();
    return;
  }

  if (event.key === "f" || event.key === "F") {
    event.preventDefault();
    activateFreezeEnemies();
    return;
  }

  if (event.key === "Escape" && !dom.resultOverlay.classList.contains("hidden")) {
    hideResultOverlay();
  }
}

function handleKeyup(event) {
  const direction = resolveDirection(event);
  if (!direction) {
    return;
  }

  event.preventDefault();
  releaseDirection(event);
}

function resolveDirection(event) {
  return KEY_TO_DIRECTION.get(event.key) || CODE_TO_DIRECTION.get(event.code) || null;
}

function inputToken(event) {
  if (event.code) {
    return `code:${event.code}`;
  }
  return `key:${event.key}`;
}

function pressDirection(event, direction) {
  const token = inputToken(event);
  const controls = state.controls;

  if (!controls.pressedKeys.has(token)) {
    controls.pressedKeys.set(token, direction);
    controls.keyOrder.push(token);
  } else {
    controls.pressedKeys.set(token, direction);
    const idx = controls.keyOrder.indexOf(token);
    if (idx !== -1) {
      controls.keyOrder.splice(idx, 1);
    }
    controls.keyOrder.push(token);
  }

  refreshHeldDirection();

  if (state.status === "running" && controls.heldDirection) {
    const now = performance.now();
    if (now - controls.lastMoveAt >= controls.moveCooldownMs * 0.72) {
      controls.lastMoveAt = now;
      tryMove(controls.heldDirection);
    }
  }
}

function releaseDirection(event) {
  const token = inputToken(event);
  const controls = state.controls;

  controls.pressedKeys.delete(token);
  const idx = controls.keyOrder.indexOf(token);
  if (idx !== -1) {
    controls.keyOrder.splice(idx, 1);
  }

  refreshHeldDirection();
}

function refreshHeldDirection() {
  const controls = state.controls;

  for (let i = controls.keyOrder.length - 1; i >= 0; i -= 1) {
    const token = controls.keyOrder[i];
    if (controls.pressedKeys.has(token)) {
      controls.heldDirection = controls.pressedKeys.get(token);
      return;
    }
    controls.keyOrder.splice(i, 1);
  }

  controls.heldDirection = null;
}

function resetMovementInput() {
  state.controls.heldDirection = null;
  state.controls.pressedKeys.clear();
  state.controls.keyOrder = [];
}

function ensureMovementLoop() {
  if (state.controls.rafId !== null) {
    return;
  }

  const tick = (timestamp) => {
    movementTick(timestamp);
    state.controls.rafId = window.requestAnimationFrame(tick);
  };

  state.controls.rafId = window.requestAnimationFrame(tick);
}

function movementTick(timestamp) {
  if (state.status !== "running" || !state.controls.heldDirection) {
    return;
  }

  if (timestamp - state.controls.lastMoveAt < state.controls.moveCooldownMs) {
    return;
  }

  state.controls.lastMoveAt = timestamp;
  tryMove(state.controls.heldDirection);
}

function getSelectedMode() {
  const selected = dom.difficultyInputs.find((input) => input.checked);
  return selected ? selected.value : "easy";
}

function getSelectedConfig() {
  setMenuError("");
  const mode = getSelectedMode();

  if (mode === "custom") {
    return buildCustomConfig();
  }

  return clonePreset(mode);
}

function clonePreset(mode) {
  const preset = PRESETS[mode];
  if (!preset) {
    return null;
  }

  return {
    mode,
    size: preset.size,
    time: preset.time,
    lives: preset.lives,
    loot: {
      enabled: preset.loot.enabled,
      chest: { ...preset.loot.chest },
      question: { ...preset.loot.question },
      gold: { ...preset.loot.gold },
      hourglass: { ...preset.loot.hourglass }
    },
    enemies: {
      enabled: preset.enemies.enabled,
      range: { ...preset.enemies.range },
      moveMs: preset.enemies.moveMs,
      chase: preset.enemies.chase
    }
  };
}

function buildCustomConfig() {
  const size = parseInteger(dom.customSize.value);
  const time = parseInteger(dom.customTime.value);

  if (!Number.isFinite(size) || size < 15 || size > 60) {
    setMenuError("Custom maze size must be between 15 and 60.");
    return null;
  }

  if (!Number.isFinite(time) || time < 30 || time > 500) {
    setMenuError("Custom time must be between 30 and 500 seconds.");
    return null;
  }

  const lootEnabled = dom.customLootEnabled.checked;
  const enemiesEnabled = dom.customEnemiesEnabled.checked;

  const chest = lootEnabled ? readRange(dom.chestMin, dom.chestMax, "Chests") : { min: 0, max: 0 };
  if (!chest) {
    return null;
  }

  const hourglass = lootEnabled
    ? readRange(dom.hourglassMin, dom.hourglassMax, "Hourglasses")
    : { min: 0, max: 0 };
  if (!hourglass) {
    return null;
  }

  const question = lootEnabled
    ? readRange(dom.trapMin, dom.trapMax, "Question traps")
    : { min: 0, max: 0 };
  if (!question) {
    return null;
  }

  const gold = lootEnabled ? readRange(dom.goldMin, dom.goldMax, "Gold") : { min: 0, max: 0 };
  if (!gold) {
    return null;
  }

  const range = enemiesEnabled
    ? readRange(dom.enemyMin, dom.enemyMax, "Enemies")
    : { min: 0, max: 0 };
  if (!range) {
    return null;
  }

  const lives = enemiesEnabled ? (size >= 40 ? 2 : 3) : 4;
  const moveMs = enemiesEnabled ? clamp(980 - size * 5, 560, 980) : 900;
  const chase = enemiesEnabled ? clamp(0.34 + size / 220, 0.34, 0.68) : 0.2;

  return {
    mode: "custom",
    size,
    time,
    lives,
    loot: {
      enabled: lootEnabled,
      chest,
      question,
      gold,
      hourglass
    },
    enemies: {
      enabled: enemiesEnabled,
      range,
      moveMs,
      chase
    }
  };
}

function readRange(minInput, maxInput, label) {
  const min = parseInteger(minInput.value);
  const max = parseInteger(maxInput.value);

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    setMenuError(`${label} min/max must be whole numbers.`);
    return null;
  }

  if (min < 0 || max < 0) {
    setMenuError(`${label} min/max must be positive values.`);
    return null;
  }

  if (min > max) {
    setMenuError(`${label} min cannot be greater than max.`);
    return null;
  }

  return { min, max };
}

function updateCustomVisibility() {
  const mode = getSelectedMode();
  const customActive = mode === "custom";
  dom.customSettings.classList.toggle("hidden", !customActive);
  dom.customLootRanges.classList.toggle("hidden", !(customActive && dom.customLootEnabled.checked));
  dom.customEnemyRanges.classList.toggle("hidden", !(customActive && dom.customEnemiesEnabled.checked));
}

function createNewMaze() {
  if (!state.config) {
    return;
  }

  clearTimers();
  clearHintPath();
  resetMovementInput();
  hideResultOverlay();

  state.rows = state.config.size;
  state.cols = state.config.size;
  state.score = 0;
  state.coins = 0;
  state.steps = 0;
  state.lives = state.config.lives;
  state.streak = 0;
  state.maxStreak = 0;
  state.lastChestAt = 0;
  state.playerIndex = 0;
  state.timeLeft = state.config.time;
  state.timeTotal = state.config.time;
  state.enemyFreezeUntil = 0;
  state.invulnerableUntil = 0;
  state.loot = createEmptyLoot();
  state.enemies = [];
  applyMovementFeel();

  const { grid, exits } = generateMaze(state.config.size);
  state.grid = grid;
  state.exits = exits;

  populateSpecialCells();

  state.status = "ready";
  updateStartPauseButton();
  updateHud();
  renderMaze();
  renderEntities();
  clearEventLog();
  pushEvent("Maze generated");
  setStatus("Press Start to begin.");
  setObjectiveText(buildObjectiveText());
  updateAbilityButtons();
  dom.maze.focus();
}

function buildObjectiveText() {
  if (!state.config) {
    return "Reach any exit and preserve lives for bonus score.";
  }

  if (state.config.enemies.enabled) {
    return "Reach an exit while avoiding patrols. Use Freeze when pressure is high.";
  }

  return "Optimize your route, chain chest streaks, and exit with maximum time bonus.";
}

function applyMovementFeel() {
  if (!state.config) {
    return;
  }

  let cooldown = Math.round(118 - state.config.size * 1.1);
  cooldown = clamp(cooldown, 60, 106);

  if (state.config.enemies.enabled) {
    cooldown -= 8;
  }

  if (state.mode === "hard") {
    cooldown -= 4;
  }

  state.controls.moveCooldownMs = clamp(cooldown, 54, 110);
  state.controls.lastMoveAt = 0;
}

function generateMaze(size) {
  const grid = [];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      grid.push({
        row,
        col,
        walls: [true, true, true, true],
        visited: false
      });
    }
  }

  const stack = [0];
  grid[0].visited = true;
  const toLocalIndex = (row, col) => row * size + col;

  while (stack.length) {
    const currentIndex = stack[stack.length - 1];
    const current = grid[currentIndex];
    const options = [];

    if (current.row > 0) {
      const up = toLocalIndex(current.row - 1, current.col);
      if (!grid[up].visited) {
        options.push({ index: up, wall: 0 });
      }
    }

    if (current.col < size - 1) {
      const right = toLocalIndex(current.row, current.col + 1);
      if (!grid[right].visited) {
        options.push({ index: right, wall: 1 });
      }
    }

    if (current.row < size - 1) {
      const down = toLocalIndex(current.row + 1, current.col);
      if (!grid[down].visited) {
        options.push({ index: down, wall: 2 });
      }
    }

    if (current.col > 0) {
      const left = toLocalIndex(current.row, current.col - 1);
      if (!grid[left].visited) {
        options.push({ index: left, wall: 3 });
      }
    }

    if (!options.length) {
      stack.pop();
      continue;
    }

    const nextStep = options[randInt(0, options.length - 1)];
    const next = grid[nextStep.index];

    current.walls[nextStep.wall] = false;
    next.walls[(nextStep.wall + 2) % 4] = false;
    next.visited = true;
    stack.push(nextStep.index);
  }

  const exits = pickExitCells(size);
  exits.forEach((index) => {
    grid[index].walls[1] = false;
  });

  return { grid, exits };
}

function pickExitCells(size) {
  const rows = new Set([size - 1]);
  while (rows.size < Math.min(3, size)) {
    rows.add(randInt(0, size - 1));
  }

  const exits = new Set();
  rows.forEach((row) => exits.add(row * size + (size - 1)));
  return exits;
}

function populateSpecialCells() {
  const occupied = new Set([0, ...state.exits]);

  if (state.config.loot.enabled) {
    placeLoot("chest", state.config.loot.chest, occupied);
    placeLoot("question", state.config.loot.question, occupied);
    placeLoot("gold", state.config.loot.gold, occupied);
    placeLoot("hourglass", state.config.loot.hourglass, occupied);
  }

  if (state.config.enemies.enabled) {
    const enemyCount = countFromRange(state.config.enemies.range);
    state.enemies = drawRandomCells(enemyCount, occupied);
  }
}

function placeLoot(type, range, occupied) {
  const count = countFromRange(range);
  const indexes = drawRandomCells(count, occupied);
  indexes.forEach((index) => state.loot[type].add(index));
}

function drawRandomCells(count, occupied) {
  const total = state.rows * state.cols;
  const available = Math.max(0, total - occupied.size);
  const target = Math.min(count, available);
  const cells = [];
  let attempts = 0;

  while (cells.length < target && attempts < total * 12) {
    const index = randInt(0, total - 1);
    if (occupied.has(index)) {
      attempts += 1;
      continue;
    }

    occupied.add(index);
    cells.push(index);
  }

  return cells;
}

function renderMaze() {
  dom.maze.innerHTML = "";
  state.cellElements = [];

  const cellSize = computeCellSize(state.cols);
  dom.maze.style.setProperty("--maze-cols", String(state.cols));
  dom.maze.style.setProperty("--cell-size", `${cellSize}px`);

  for (let index = 0; index < state.grid.length; index += 1) {
    const data = state.grid[index];
    const cell = document.createElement("div");
    cell.className = "cell";

    if (index === 0) {
      cell.classList.add("start-cell");
    }

    if (state.exits.has(index)) {
      cell.classList.add("is-exit");
    }

    if (state.hintCells.has(index)) {
      cell.classList.add("hint-cell");
    }

    cell.style.borderTop = data.walls[0] ? "1px solid var(--wall)" : "1px solid transparent";
    cell.style.borderRight = data.walls[1] ? "1px solid var(--wall)" : "1px solid transparent";
    cell.style.borderBottom = data.walls[2] ? "1px solid var(--wall)" : "1px solid transparent";
    cell.style.borderLeft = data.walls[3] ? "1px solid var(--wall)" : "1px solid transparent";

    dom.maze.appendChild(cell);
    state.cellElements.push(cell);
  }
}

function renderEntities() {
  state.cellElements.forEach((cell) => {
    cell.textContent = "";
  });

  state.loot.chest.forEach((index) => placeSprite(index, "chest"));
  state.loot.question.forEach((index) => placeSprite(index, "question"));
  state.loot.gold.forEach((index) => placeSprite(index, "gold"));
  state.loot.hourglass.forEach((index) => placeSprite(index, "hourglass"));

  state.enemies.forEach((index) => placeSprite(index, "enemy"));
  const playerSprite = placeSprite(state.playerIndex, "player");
  if (playerSprite && isPlayerInvulnerable()) {
    playerSprite.classList.add("invulnerable");
  }
}

function placeSprite(index, type) {
  const cell = state.cellElements[index];
  if (!cell) {
    return null;
  }

  const image = document.createElement("img");
  image.className = "sprite";
  image.src = ASSETS[type];
  image.alt = type;
  image.draggable = false;
  cell.appendChild(image);
  return image;
}

function tryMove(direction) {
  if (state.status !== "running") {
    return;
  }

  const rule = DIRECTION_RULES[direction];
  if (!rule) {
    return;
  }

  const currentCell = state.grid[state.playerIndex];
  if (currentCell.walls[rule.wall]) {
    return;
  }

  const { row, col } = coordsFromIndex(state.playerIndex);
  const nextRow = row + rule.dr;
  const nextCol = col + rule.dc;

  if (nextRow < 0 || nextRow >= state.rows || nextCol < 0 || nextCol >= state.cols) {
    return;
  }

  state.playerIndex = toIndex(nextRow, nextCol);
  state.steps += 1;
  playSfx("move", 0.12);

  const hadEffect = applyCellEffects();

  renderEntities();
  updateHud();
  updateAbilityButtons();

  if (isEnemyAt(state.playerIndex) && !isPlayerInvulnerable()) {
    handleEnemyCollision("Enemy patrol intercepted you.");
    return;
  }

  if (state.exits.has(state.playerIndex)) {
    endGame(true, "You escaped the labyrinth.");
    return;
  }

  if (!hadEffect) {
    const nearest = nearestEnemyDistance();
    if (nearest <= 2) {
      setStatus("Danger: enemy nearby.", "warn");
    }
  }
}

function applyCellEffects() {
  const index = state.playerIndex;
  const now = Date.now();

  if (state.loot.chest.delete(index)) {
    state.coins += 1;

    if (now - state.lastChestAt <= 7000) {
      state.streak += 1;
    } else {
      state.streak = 1;
    }

    state.lastChestAt = now;
    state.maxStreak = Math.max(state.maxStreak, state.streak);

    const streakBonus = state.streak > 1 ? state.streak * 28 : 0;
    const gained = 110 + streakBonus;
    state.score += gained;

    playSfx("coin", 0.25);
    setStatus(`Chest collected: +${gained} score (x${state.streak} streak).`, "good");
    pushEvent(`Chest +${gained} (streak x${state.streak})`);
    return true;
  }

  if (state.loot.question.delete(index)) {
    state.score -= 260;
    state.streak = 0;

    playSfx("trap", 0.25);
    setStatus("Question trap: -260 score.", "warn");
    pushEvent("Question trap triggered");
    return true;
  }

  if (state.loot.gold.delete(index)) {
    state.coins += 1;
    state.streak = 0;

    const delta = Math.random() < 0.5 ? -220 : 220;
    state.score += delta;
    state.playerIndex = 0;

    playSfx("gold", 0.27);
    if (delta >= 0) {
      setStatus("Mystic gold: +220 and returned to start.", "good");
      pushEvent("Gold reward +220 and reset");
    } else {
      setStatus("Cursed gold: -220 and returned to start.", "warn");
      pushEvent("Gold curse -220 and reset");
    }

    return true;
  }

  if (state.loot.hourglass.delete(index)) {
    state.timeLeft += 5;
    state.score += 28;

    playSfx("bonus", 0.27);
    setStatus("Hourglass found: +5 seconds.", "good");
    pushEvent("Hourglass +5 seconds");
    return true;
  }

  return false;
}

function moveEnemies() {
  if (state.status !== "running" || !state.enemies.length) {
    return;
  }

  if (Date.now() < state.enemyFreezeUntil) {
    return;
  }

  const enemySteps = computeEnemyStepCount();

  for (let step = 0; step < enemySteps; step += 1) {
    const caught = performEnemyStep();
    if (caught) {
      return;
    }
  }

  if (nearestEnemyDistance() <= 2) {
    setStatus("Danger: enemy nearby.", "warn");
  }
}

function computeEnemyStepCount() {
  let steps = 1;
  const timeRatio = state.timeTotal > 0 ? state.timeLeft / state.timeTotal : 1;
  const nearest = nearestEnemyDistance();

  if (timeRatio < 0.34 && Math.random() < 0.24) {
    steps += 1;
  }

  if (nearest <= 2 && Math.random() < 0.32) {
    steps += 1;
  }

  return steps;
}

function performEnemyStep() {
  const reserved = new Set();
  const updated = [];

  for (let i = 0; i < state.enemies.length; i += 1) {
    const current = state.enemies[i];
    const neighbors = getReachableNeighbors(current);
    const picked = pickEnemyMove(current, neighbors, reserved);
    reserved.add(picked);
    updated.push(picked);
  }

  state.enemies = updated;
  renderEntities();

  if (isEnemyAt(state.playerIndex) && !isPlayerInvulnerable()) {
    handleEnemyCollision("Enemy patrol intercepted you.");
    return true;
  }

  return false;
}

function pickEnemyMove(current, neighbors, reserved) {
  const candidates = [...neighbors, current];
  shuffle(candidates);

  let picked = current;

  const chaseEnabled = Math.random() < getEnemyChaseFactor();
  if (chaseEnabled && neighbors.length) {
    let best = Number.POSITIVE_INFINITY;
    const shortlist = [];

    neighbors.forEach((neighbor) => {
      if (reserved.has(neighbor)) {
        return;
      }
      const distance = manhattanDistance(neighbor, state.playerIndex);
      if (distance < best) {
        best = distance;
        shortlist.length = 0;
        shortlist.push(neighbor);
      } else if (distance === best) {
        shortlist.push(neighbor);
      }
    });

    if (shortlist.length) {
      picked = shortlist[randInt(0, shortlist.length - 1)];
      return picked;
    }
  }

  for (const candidate of candidates) {
    if (!reserved.has(candidate)) {
      picked = candidate;
      break;
    }
  }

  return picked;
}

function getEnemyChaseFactor() {
  if (!state.config) {
    return 0;
  }

  const base = state.config.enemies.chase;
  const timeRatio = state.timeTotal > 0 ? state.timeLeft / state.timeTotal : 1;

  let boost = (1 - timeRatio) * 0.16;
  if (state.lives <= 1) {
    boost += 0.08;
  }
  if (nearestEnemyDistance() <= 3) {
    boost += 0.06;
  }

  return clamp(base + boost, 0.08, 0.84);
}

function getReachableNeighbors(index) {
  const cell = state.grid[index];
  const { row, col } = coordsFromIndex(index);
  const neighbors = [];

  if (!cell.walls[0] && row > 0) {
    neighbors.push(toIndex(row - 1, col));
  }

  if (!cell.walls[1] && col < state.cols - 1) {
    neighbors.push(toIndex(row, col + 1));
  }

  if (!cell.walls[2] && row < state.rows - 1) {
    neighbors.push(toIndex(row + 1, col));
  }

  if (!cell.walls[3] && col > 0) {
    neighbors.push(toIndex(row, col - 1));
  }

  return neighbors;
}

function isEnemyAt(index) {
  return state.enemies.includes(index);
}

function handleEnemyCollision(reason) {
  if (state.status !== "running") {
    return;
  }

  if (isPlayerInvulnerable()) {
    return;
  }

  state.lives -= 1;
  state.streak = 0;
  state.score -= 110;

  playSfx("hit", 0.3);

  if (state.lives <= 0) {
    endGame(false, reason);
    return;
  }

  state.playerIndex = 0;
  state.invulnerableUntil = Date.now() + 2200;
  setStatus(`You were hit. Lives remaining: ${state.lives}. Temporary shield active.`, "danger");
  pushEvent(`Hit by enemy, ${state.lives} lives left (shield 2.2s)`);

  updateHud();
  renderEntities();
  updateAbilityButtons();
}

function activateHintPath() {
  if (state.status !== "running") {
    return;
  }

  if (state.coins < 1) {
    setStatus("Hint requires 1 coin.", "warn");
    return;
  }

  const path = findPathToClosestExit(state.playerIndex);
  if (path.length < 2) {
    setStatus("No hint available from current position.", "warn");
    return;
  }

  state.coins -= 1;
  state.hintCells = new Set(path.slice(1, -1));

  if (state.timers.hintClear !== null) {
    clearTimeout(state.timers.hintClear);
  }

  state.timers.hintClear = window.setTimeout(() => {
    clearHintPath();
    renderMaze();
    renderEntities();
    updateAbilityButtons();
  }, 5000);

  renderMaze();
  renderEntities();
  updateHud();
  updateAbilityButtons();

  setStatus("Hint path revealed for 5 seconds.", "good");
  pushEvent("Hint path activated (-1 coin)");
}

function activateFreezeEnemies() {
  if (state.status !== "running") {
    return;
  }

  if (!state.config || !state.config.enemies.enabled || !state.enemies.length) {
    setStatus("No enemies to freeze in this run.", "warn");
    return;
  }

  if (Date.now() < state.enemyFreezeUntil) {
    setStatus("Freeze is already active.", "warn");
    return;
  }

  if (state.coins < 2) {
    setStatus("Freeze requires 2 coins.", "warn");
    return;
  }

  state.coins -= 2;
  state.enemyFreezeUntil = Date.now() + 6000;

  updateHud();
  updateAbilityButtons();

  setStatus("Enemies frozen for 6 seconds.", "good");
  pushEvent("Freeze enemies activated (-2 coins)");
}

function findPathToClosestExit(startIndex) {
  const total = state.grid.length;
  const visited = new Array(total).fill(false);
  const prev = new Array(total).fill(-1);
  const queue = [startIndex];
  visited[startIndex] = true;

  while (queue.length) {
    const current = queue.shift();
    if (state.exits.has(current)) {
      return rebuildPath(current, prev);
    }

    const neighbors = getReachableNeighbors(current);
    for (const neighbor of neighbors) {
      if (visited[neighbor]) {
        continue;
      }

      visited[neighbor] = true;
      prev[neighbor] = current;
      queue.push(neighbor);
    }
  }

  return [];
}

function rebuildPath(endIndex, prev) {
  const path = [endIndex];
  let current = endIndex;

  while (prev[current] !== -1) {
    current = prev[current];
    path.push(current);
  }

  path.reverse();
  return path;
}

function nearestEnemyDistance() {
  if (!state.enemies.length) {
    return Number.POSITIVE_INFINITY;
  }

  let nearest = Number.POSITIVE_INFINITY;

  for (const enemy of state.enemies) {
    const distance = manhattanDistance(enemy, state.playerIndex);
    if (distance < nearest) {
      nearest = distance;
    }
  }

  return nearest;
}

function manhattanDistance(fromIndex, toIndex) {
  const from = coordsFromIndex(fromIndex);
  const to = coordsFromIndex(toIndex);
  return Math.abs(from.row - to.row) + Math.abs(from.col - to.col);
}

function isPlayerInvulnerable() {
  return Date.now() < state.invulnerableUntil;
}

function toggleStartPause() {
  if (!state.config) {
    return;
  }

  if (state.status === "ready") {
    resetMovementInput();
    startGameLoop();
    return;
  }

  if (state.status === "running") {
    state.status = "paused";
    resetMovementInput();
    setStatus("Game paused.");
    pushEvent("Paused");
    updateStartPauseButton();
    updateAbilityButtons();
    return;
  }

  if (state.status === "paused") {
    state.status = "running";
    state.controls.lastMoveAt = performance.now() - state.controls.moveCooldownMs;
    setStatus("Game resumed.", "good");
    pushEvent("Resumed");
    updateStartPauseButton();
    updateAbilityButtons();
  }
}

function startGameLoop() {
  clearTimers();

  state.status = "running";
  state.invulnerableUntil = Date.now() + 1200;
  state.controls.lastMoveAt = performance.now() - state.controls.moveCooldownMs;
  updateStartPauseButton();
  updateAbilityButtons();
  ensureBackgroundTrack();
  setStatus("Run started. Reach any glowing exit.");
  pushEvent("Run started");

  state.timers.countdown = window.setInterval(() => {
    if (state.status !== "running") {
      updateAbilityButtons();
      return;
    }

    state.timeLeft -= 1;

    if (state.timeLeft <= 10 && state.timeLeft > 0) {
      playSfx("tick", 0.08);
    }

    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      updateHud();
      endGame(false, "Time is up.");
      return;
    }

    updateHud();
    updateAbilityButtons();
  }, 1000);

  if (state.config.enemies.enabled && state.enemies.length) {
    state.timers.enemies = window.setInterval(moveEnemies, state.config.enemies.moveMs);
  }

  updateHud();
}

function endGame(won, message) {
  if (state.status === "ended") {
    return;
  }

  state.status = "ended";
  clearTimers();
  clearHintPath();
  resetMovementInput();
  updateStartPauseButton();
  updateAbilityButtons();

  if (won) {
    playSfx("win", 0.27);
    window.setTimeout(() => playSfx("final", 0.2), 260);
  } else {
    playSfx("loss", 0.27);
  }

  setStatus(message, won ? "good" : "danger");
  pushEvent(won ? "Escaped the maze" : "Run failed");
  openResultOverlay(won, message);
}

function openResultOverlay(won, message) {
  const breakdown = computeScoreBreakdown(won);

  dom.resultTitle.textContent = won ? "You Escaped" : "Game Over";
  dom.resultMessage.textContent = message;
  dom.resultScore.textContent = String(breakdown.final);
  dom.resultCoins.textContent = String(state.coins);
  dom.resultSteps.textContent = String(state.steps);
  dom.resultLives.textContent = String(Math.max(0, state.lives));
  dom.resultStreak.textContent = `x${state.maxStreak}`;
  dom.resultModeBonus.textContent = `x${breakdown.multiplier.toFixed(2)}`;
  dom.resultBase.textContent = String(breakdown.base);
  dom.resultTimeBonus.textContent = String(breakdown.timeBonus);
  dom.resultCoinBonus.textContent = String(breakdown.coinBonus);
  dom.resultStreakBonus.textContent = String(breakdown.streakBonus);
  dom.resultSurvivalBonus.textContent = String(breakdown.survivalBonus);

  dom.resultOverlay.classList.remove("hidden");
}

function hideResultOverlay() {
  dom.resultOverlay.classList.add("hidden");
}

function computeScoreBreakdown(won) {
  const base = Math.max(0, state.score);
  const timeBonus = won ? state.timeLeft * 25 : Math.floor(state.timeLeft * 6);
  const coinBonus = state.coins * 85;
  const streakBonus = state.maxStreak * 140;
  const survivalBonus = Math.max(0, state.lives) * 100;
  const multiplier = modeMultiplier();
  const final = Math.max(0, Math.round((base + timeBonus + coinBonus + streakBonus + survivalBonus) * multiplier));

  return {
    base,
    timeBonus,
    coinBonus,
    streakBonus,
    survivalBonus,
    multiplier,
    final
  };
}

function modeMultiplier() {
  if (!state.config) {
    return 1;
  }

  if (state.mode === "easy") {
    return 1;
  }

  if (state.mode === "medium") {
    return 1.35;
  }

  if (state.mode === "hard") {
    return 1.75;
  }

  let result = 1.2;
  if (state.config.enemies.enabled) {
    result += 0.25;
  }
  if (state.config.size >= 40) {
    result += 0.15;
  }
  if (!state.config.loot.enabled) {
    result -= 0.08;
  }

  return clamp(result, 1.05, 2.2);
}

function updateHud() {
  dom.hudMode.textContent = modeLabel(state.mode);
  dom.hudTime.textContent = formatTime(Math.max(0, state.timeLeft));
  dom.hudScore.textContent = String(state.score);
  dom.hudCoins.textContent = String(state.coins);
  dom.hudSteps.textContent = String(state.steps);
  dom.hudLives.textContent = String(state.lives);
  dom.hudStreak.textContent = `x${state.streak}`;

  updateTimeBar();
}

function updateTimeBar() {
  if (!state.timeTotal) {
    dom.timeBar.style.width = "0%";
    return;
  }

  const ratio = clamp(state.timeLeft / state.timeTotal, 0, 1);
  dom.timeBar.style.width = `${Math.round(ratio * 100)}%`;

  if (ratio > 0.45) {
    dom.timeBar.style.background = "linear-gradient(90deg, #58ef9f, #3ed9ff)";
  } else if (ratio > 0.2) {
    dom.timeBar.style.background = "linear-gradient(90deg, #ffdc74, #ffae66)";
  } else {
    dom.timeBar.style.background = "linear-gradient(90deg, #ff9a6f, #ff6464)";
  }
}

function updateStartPauseButton() {
  dom.startPauseBtn.disabled = !state.config || state.status === "ended";

  if (state.status === "running") {
    dom.startPauseBtn.textContent = "Pause";
    return;
  }

  if (state.status === "paused") {
    dom.startPauseBtn.textContent = "Resume";
    return;
  }

  if (state.status === "ended") {
    dom.startPauseBtn.textContent = "Ended";
    return;
  }

  dom.startPauseBtn.textContent = "Start";
}

function updateAbilityButtons() {
  const running = state.status === "running";
  const freezeActive = Date.now() < state.enemyFreezeUntil;

  dom.hintBtn.disabled = !running || state.coins < 1;
  dom.freezeBtn.disabled =
    !running ||
    !state.config ||
    !state.config.enemies.enabled ||
    !state.enemies.length ||
    state.coins < 2 ||
    freezeActive;

  if (!state.config) {
    setAbilityInfo("Generate a maze to enable abilities.");
    return;
  }

  if (!running) {
    setAbilityInfo("Abilities unlock while a run is active.");
    return;
  }

  if (freezeActive) {
    const remaining = Math.max(0, Math.ceil((state.enemyFreezeUntil - Date.now()) / 1000));
    setAbilityInfo(`Freeze active: ${remaining}s remaining.`);
    return;
  }

  setAbilityInfo("Hint Path costs 1 coin. Freeze Enemies costs 2 coins.");
}

function updateAudioButton() {
  dom.musicToggleBtn.textContent = `Audio: ${state.audioEnabled ? "On" : "Off"}`;
}

function ensureBackgroundTrack() {
  if (!state.audioEnabled) {
    return;
  }

  if (state.backgroundAudio && !state.backgroundAudio.paused) {
    return;
  }

  startNextTrack();
}

function startNextTrack() {
  if (!state.audioEnabled) {
    return;
  }

  const source = MUSIC_TRACKS[state.trackCursor % MUSIC_TRACKS.length];
  state.trackCursor = (state.trackCursor + 1) % MUSIC_TRACKS.length;

  if (state.backgroundAudio) {
    state.backgroundAudio.pause();
    state.backgroundAudio.removeEventListener("ended", handleTrackEnded);
  }

  const track = new Audio(source);
  track.volume = 0.16;
  track.addEventListener("ended", handleTrackEnded);
  state.backgroundAudio = track;
  track.play().catch(() => {
    // Autoplay can be blocked before user interaction.
  });
}

function handleTrackEnded() {
  startNextTrack();
}

function playSfx(name, volume = 0.25) {
  if (!state.audioEnabled) {
    return;
  }

  const source = SFX[name];
  if (!source) {
    return;
  }

  const clip = new Audio(source);
  clip.volume = volume;
  clip.play().catch(() => {
    // Ignore playback interruptions.
  });
}

function clearTimers() {
  if (state.timers.countdown !== null) {
    clearInterval(state.timers.countdown);
    state.timers.countdown = null;
  }

  if (state.timers.enemies !== null) {
    clearInterval(state.timers.enemies);
    state.timers.enemies = null;
  }

  if (state.timers.hintClear !== null) {
    clearTimeout(state.timers.hintClear);
    state.timers.hintClear = null;
  }
}

function clearHintPath() {
  state.hintCells.clear();
  if (state.timers.hintClear !== null) {
    clearTimeout(state.timers.hintClear);
    state.timers.hintClear = null;
  }
}

function showGameView() {
  dom.menuView.classList.add("hidden");
  dom.gameView.classList.remove("hidden");
}

function showMenuView() {
  dom.gameView.classList.add("hidden");
  dom.menuView.classList.remove("hidden");
}

function setStatus(message, tone = "neutral") {
  dom.statusText.textContent = message;
  dom.statusText.dataset.tone = tone;
}

function setObjectiveText(message) {
  dom.objectiveText.textContent = message;
}

function setAbilityInfo(message) {
  dom.abilityInfo.textContent = message;
}

function setMenuError(message) {
  dom.menuError.textContent = message;
}

function clearEventLog() {
  dom.eventLog.innerHTML = "";
}

function pushEvent(message) {
  const item = document.createElement("li");
  item.className = "event-item";
  item.textContent = `[${eventTimestamp()}] ${message}`;
  dom.eventLog.prepend(item);

  while (dom.eventLog.children.length > 8) {
    dom.eventLog.removeChild(dom.eventLog.lastChild);
  }
}

function eventTimestamp() {
  if (!state.config || state.status === "idle") {
    return "00:00";
  }

  const elapsed = Math.max(0, state.timeTotal - state.timeLeft);
  return formatTime(elapsed);
}

function createEmptyLoot() {
  return {
    chest: new Set(),
    question: new Set(),
    gold: new Set(),
    hourglass: new Set()
  };
}

function countFromRange(range) {
  const min = Number.isFinite(range.min) ? Math.max(0, range.min) : 0;
  const max = Number.isFinite(range.max) ? Math.max(min, range.max) : min;
  return randInt(min, max);
}

function computeCellSize(size) {
  const maxWidth = Math.max(300, Math.min(window.innerWidth - 110, 920));
  const maxHeight = Math.max(300, Math.min(window.innerHeight - 250, 920));
  const boardSize = Math.min(maxWidth, maxHeight);
  return clamp(Math.floor(boardSize / size), 10, 28);
}

function toIndex(row, col) {
  return row * state.cols + col;
}

function coordsFromIndex(index) {
  return {
    row: Math.floor(index / state.cols),
    col: index % state.cols
  };
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const minutes = String(Math.floor(safe / 60)).padStart(2, "0");
  const seconds = String(safe % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function modeLabel(mode) {
  switch (mode) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
    case "custom":
      return "Custom";
    default:
      return "Unknown";
  }
}

function parseInteger(value) {
  return Number.parseInt(value, 10);
}

function randInt(min, max) {
  if (max <= min) {
    return min;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

init();
