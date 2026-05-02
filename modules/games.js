/**
 * TekkieStack 2.0 — Game Hub
 *
 * 8 self-contained, replayable games. No accounts, no servers, no AI.
 * All run in the browser, save high scores per profile.
 *
 * Sorted by "addictive instant fun" first (Tower Stacker, Code Snake,
 * Reaction Test, Memory Match), then learning-flavoured brain workouts.
 *
 * Defence: route registers immediately AND retries on DOMContentLoaded
 * so it works regardless of script-order timing surprises.
 *
 * Author: Aperintel Ltd
 */

const TSAGames = (() => {

  // ── Game registry ────────────────────────────────────────────────────────
  // Order in this list = order in the hub. Most exciting first.
  const GAMES = [
    { id: 'tower_stacker', title: 'Tower Stacker',  tagline: 'Stack falling blocks. Build the tallest tower.',          icon: 'layers',   xp: 25, badge: 'NEW',   accent: '#FF9500' },
    { id: 'code_snake',    title: 'Code Snake',     tagline: 'Eat the code tokens. Do not bite your own tail.',         icon: 'controller', xp: 25, badge: 'NEW', accent: '#00C9B1' },
    { id: 'reaction',      title: 'Reaction Test',  tagline: 'Tap the moment the screen goes green. Beat your time.',   icon: 'bolt',     xp: 20, badge: 'NEW',   accent: '#FF6B6B' },
    { id: 'memory_match',  title: 'Memory Match',   tagline: 'Flip cards. Find the pairs. Fewest flips wins.',          icon: 'puzzle',   xp: 25, badge: 'NEW',   accent: '#6C63FF' },
    { id: 'bug_hunt',      title: 'Bug Hunt',       tagline: 'Spot the typo. Beat the clock.',                          icon: 'bug',      xp: 25 },
    { id: 'tag_match',     title: 'Tag Match',      tagline: 'Pair every opening tag with its closer.',                  icon: 'puzzle',   xp: 25 },
    { id: 'css_painter',   title: 'CSS Painter',    tagline: 'Match the target shape using sliders.',                    icon: 'palette',  xp: 25 },
    { id: 'logic_loops',   title: 'Logic Loops',    tagline: 'What comes next in the pattern?',                          icon: 'pattern',  xp: 25 },
  ];
  const GAMES_BY_ID = Object.fromEntries(GAMES.map(g => [g.id, g]));

  // ── Buggy snippets for Bug Hunt ──────────────────────────────────────────
  const BUG_SNIPPETS = [
    { code: 'function add(a, b) {\n  return a + B;\n}', bug: 'B', explain: 'Variable name should be lowercase b.' },
    { code: 'const arr = [1, 2, 3];\narr.lenght;', bug: 'lenght', explain: 'Typo: should be `length`.' },
    { code: 'if (x = 5) {\n  console.log("five");\n}', bug: '=', explain: '`=` is assignment. Should be `==` or `===`.' },
    { code: 'document.getElementByID("btn")', bug: 'ID', explain: 'getElementById, capital I, lowercase d.' },
    { code: 'const name = "Alex"\nconsole.log(nme);', bug: 'nme', explain: 'Typo: variable is name, not nme.' },
    { code: 'const colors = ["red", "blue" "green"];', bug: '"green"', explain: 'Missing comma between array items.' },
    { code: 'document.querySelector(".btn").style.colour = "red";', bug: 'colour', explain: 'CSS property in JS uses American spelling: color.' },
    { code: 'let total = 0;\nfor (let i = 0; i < 10; i++) {\n  total = total + 1\n}', bug: '+ 1', explain: 'Should add i, not 1, to compute the sum.' },
    { code: 'function greet(name) {\n  retrun "Hi " + name;\n}', bug: 'retrun', explain: 'Typo: should be return.' },
    { code: 'arr.forEach(x = > {\n  console.log(x);\n})', bug: '= >', explain: 'The arrow operator is =>, no space between = and >.' },
  ];
  const TAG_PAIRS = ['div','p','h1','h2','span','a','ul','li','section','header','footer','nav','article','button','strong','em'];
  const PATTERN_ROUNDS = [
    { seq: ['2','4','6','8'], options: ['9','10','11','12'], answer: '10' },
    { seq: ['A','C','E','G'], options: ['H','I','J','K'], answer: 'I' },
    { seq: ['1','1','2','3','5'], options: ['6','7','8','9'], answer: '8' },
    { seq: ['10','9','8','7'], options: ['5','6','7','8'], answer: '6' },
    { seq: ['Mon','Tue','Wed','Thu'], options: ['Sat','Sun','Fri','Mon'], answer: 'Fri' },
    { seq: ['1','4','9','16'], options: ['20','25','30','36'], answer: '25' },
    { seq: ['Z','X','V','T'], options: ['Q','R','S','U'], answer: 'R' },
    { seq: ['2','3','5','7','11'], options: ['12','13','14','15'], answer: '13' },
  ];

  // ── Game state ───────────────────────────────────────────────────────────
  let _state = {};

  // ── Hub render ───────────────────────────────────────────────────────────
  function renderHub() {
    const screen = document.getElementById('s-games');
    if (!screen) {
      console.warn('[Games] s-games screen not found in DOM');
      return;
    }
    const cards = GAMES.map(g => `
      <button class="game-card" type="button" onclick="TSAGames.startGame('${g.id}')">
        ${g.badge ? `<span class="game-card-badge">${g.badge}</span>` : ''}
        <div class="game-card-icon" style="${g.accent ? `background:${g.accent}1a;color:${g.accent}` : ''}"><span class="ts-i ts-i-${g.icon}" aria-hidden="true"></span></div>
        <div class="game-card-title">${g.title}</div>
        <div class="game-card-tagline">${g.tagline}</div>
        <div class="game-card-xp">+${g.xp} XP per play</div>
      </button>
    `).join('');
    screen.innerHTML = `
      <div class="games-screen">
        <div class="games-header">
          <h2 class="games-title">Game Arcade</h2>
          <p class="games-sub">Quick brain workouts and pure-fun classics. Beat your high score, earn XP.</p>
        </div>
        <div class="games-grid">${cards}</div>
        <div id="gameStage"></div>
      </div>
    `;
    _loadHighScores();
  }

  async function _loadHighScores() {
    if (!window.TSA?.services?.sessionManager) return;
    try {
      const p = await TSA.services.sessionManager.getActiveProfile();
      if (!p) return;
      const stats = p.gameStats || {};
      document.querySelectorAll('.game-card').forEach(card => {
        const onclick = card.getAttribute('onclick') || '';
        const m = onclick.match(/startGame\('(\w+)'\)/);
        if (!m) return;
        const id = m[1];
        const best = stats[id]?.bestScore;
        if (typeof best === 'number') {
          const xpEl = card.querySelector('.game-card-xp');
          if (xpEl) xpEl.innerHTML += ` &middot; <strong>Best: ${best}</strong>`;
        }
      });
    } catch (e) { console.warn('[Games] high score load failed:', e); }
  }

  // ── Dispatch ─────────────────────────────────────────────────────────────
  function startGame(id) {
    _exitCleanup();
    switch (id) {
      case 'tower_stacker': return _startTowerStacker();
      case 'code_snake':    return _startCodeSnake();
      case 'reaction':      return _startReaction();
      case 'memory_match':  return _startMemoryMatch();
      case 'bug_hunt':      return _startBugHunt();
      case 'tag_match':     return _startTagMatch();
      case 'css_painter':   return _startCSSPainter();
      case 'logic_loops':   return _startLogicLoops();
    }
  }

  function _exitCleanup() {
    if (_state.timer) { clearInterval(_state.timer); }
    if (_state.raf)   { cancelAnimationFrame(_state.raf); }
    if (_state.kbHandler) { window.removeEventListener('keydown', _state.kbHandler); }
    _state = {};
  }
  function exitGame() { _exitCleanup(); renderHub(); }

  function _stageBar(label, gameId) {
    return `
      <div class="game-stage-bar">
        <button class="btn btn-gh" onclick="TSAGames.exitGame()"><span class="ts-i ts-i-arrow_left" aria-hidden="true"></span>Back</button>
        <div class="game-stat" id="gameStatLine">${label || ''}</div>
      </div>
    `;
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 1: TOWER STACKER
  //  Top block slides left-right. Tap to drop. Anything outside the previous
  //  block falls off and the next block becomes that little. Build as tall
  //  as you can. Inspired by the iOS "Stack" mechanic.
  // ════════════════════════════════════════════════════════════════════════
  function _startTowerStacker() {
    _state = { activeGame: 'tower_stacker', score: 0, raf: null };
    const stage = document.getElementById('gameStage');
    if (!stage) return;

    stage.innerHTML = `
      <div class="game-stage">
        ${_stageBar('Tap or press SPACE to drop the block.')}
        <div class="ts-instructions">Stack as many blocks as you can. Misalign and the overhang chops off, leaving a smaller landing zone.</div>
        <div class="ts-stack-wrap">
          <canvas id="tsStackCanvas" width="400" height="540" aria-label="Tower Stacker"></canvas>
          <div class="ts-stack-score">Tower height: <strong id="tsScore">0</strong></div>
        </div>
      </div>
    `;

    const cv = document.getElementById('tsStackCanvas');
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const baseColors = ['#00C9B1','#FF9500','#FF6B6B','#6C63FF','#80E8DE','#FFB347'];
    let stack = [{ x: 0, w: W * 0.6 }]; // first block at the bottom, centered position pre-shifted below
    stack[0].x = (W - stack[0].w) / 2;
    let blockH = 24;
    let camOffset = 0;
    let target = stack[0].x + Math.random() * 60;
    let dir = 1;
    let speed = 2.0;
    let movingX = stack[0].x;
    let movingW = stack[0].w;
    let alive = true;
    let dropped = 0;

    function step() {
      // Move the active block
      movingX += dir * speed;
      if (movingX < 0) { movingX = 0; dir = 1; }
      if (movingX + movingW > W) { movingX = W - movingW; dir = -1; }

      // Render
      ctx.fillStyle = '#0F1F3D';
      ctx.fillRect(0, 0, W, H);

      // Stack
      for (let i = 0; i < stack.length; i++) {
        const b = stack[i];
        const y = H - 24 - i * blockH + camOffset;
        if (y < -blockH) continue;
        ctx.fillStyle = baseColors[i % baseColors.length];
        ctx.fillRect(b.x, y, b.w, blockH);
        ctx.fillStyle = 'rgba(0,0,0,0.10)';
        ctx.fillRect(b.x, y + blockH - 4, b.w, 4);
      }
      // Active moving block
      const yActive = H - 24 - stack.length * blockH + camOffset;
      ctx.fillStyle = baseColors[stack.length % baseColors.length];
      ctx.fillRect(movingX, yActive, movingW, blockH);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(movingX + 0.5, yActive + 0.5, movingW - 1, blockH - 1);

      if (alive) _state.raf = requestAnimationFrame(step);
    }

    function drop() {
      if (!alive) return;
      const last = stack[stack.length - 1];
      const overlapStart = Math.max(movingX, last.x);
      const overlapEnd   = Math.min(movingX + movingW, last.x + last.w);
      const overlap     = overlapEnd - overlapStart;
      if (overlap <= 0) {
        alive = false;
        cancelAnimationFrame(_state.raf);
        _state.raf = null;
        _finishGame('tower_stacker', dropped);
        return;
      }
      stack.push({ x: overlapStart, w: overlap });
      movingX = overlapStart;
      movingW = overlap;
      dropped++;
      _setText('tsScore', dropped);
      // Speed up gradually
      speed = Math.min(2.0 + dropped * 0.10, 8.0);
      // Camera scrolls up so tower stays in view
      camOffset += blockH;
      // Reset moving block to opposite side
      dir = (dir === 1) ? -1 : 1;
      movingX = (dir === 1) ? 0 : (W - movingW);
    }

    cv.addEventListener('click', drop);
    cv.addEventListener('touchstart', e => { e.preventDefault(); drop(); }, { passive: false });
    _state.kbHandler = e => { if (e.code === 'Space') { e.preventDefault(); drop(); } };
    window.addEventListener('keydown', _state.kbHandler);
    step();
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 2: CODE SNAKE
  //  Classic snake. Token icons spawn randomly. Eat them, grow, do not
  //  bite your tail. Score = tokens eaten. Speed scales with score.
  // ════════════════════════════════════════════════════════════════════════
  function _startCodeSnake() {
    _state = { activeGame: 'code_snake' };
    const stage = document.getElementById('gameStage');
    if (!stage) return;

    const COLS = 18, ROWS = 18, CELL = 22;
    stage.innerHTML = `
      <div class="game-stage">
        ${_stageBar('Arrows or WASD to move. Eat tokens. Avoid your tail.')}
        <div class="ts-instructions">Score: <strong id="csScore">0</strong>  &middot;  Best: <strong id="csBest">--</strong></div>
        <div class="ts-snake-wrap">
          <canvas id="csCanvas" width="${COLS * CELL}" height="${ROWS * CELL}" aria-label="Code Snake"></canvas>
        </div>
        <div class="ts-snake-controls">
          <button class="ts-snake-btn" data-d="up" aria-label="Up"><span class="ts-i ts-i-arrow_up"></span></button>
          <div class="ts-snake-row">
            <button class="ts-snake-btn" data-d="left" aria-label="Left"><span class="ts-i ts-i-arrow_left"></span></button>
            <button class="ts-snake-btn" data-d="down" aria-label="Down"><span class="ts-i ts-i-arrow_down"></span></button>
            <button class="ts-snake-btn" data-d="right" aria-label="Right"><span class="ts-i ts-i-arrow_right"></span></button>
          </div>
        </div>
      </div>
    `;

    const cv = document.getElementById('csCanvas');
    const ctx = cv.getContext('2d');
    let snake = [{ x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }];
    let dir = { x: 1, y: 0 };
    let nextDir = dir;
    let food = _spawnFood(snake, COLS, ROWS);
    let score = 0;
    let alive = true;
    let tickRate = 130; // ms per move
    const TOKENS = ['{', '}', '<', '>', '(', ')', ';', '=', '+', '*'];
    let foodToken = TOKENS[Math.floor(Math.random() * TOKENS.length)];

    function tick() {
      if (!alive) return;
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      // Wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) return _gameOver();
      // Self collision
      for (const s of snake) if (s.x === head.x && s.y === head.y) return _gameOver();
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++;
        _setText('csScore', score);
        food = _spawnFood(snake, COLS, ROWS);
        foodToken = TOKENS[Math.floor(Math.random() * TOKENS.length)];
        tickRate = Math.max(60, tickRate - 4);
      } else {
        snake.pop();
      }
      _drawSnake();
      _state.timer = setTimeout(tick, tickRate);
    }

    function _drawSnake() {
      ctx.fillStyle = '#0F1F3D';
      ctx.fillRect(0, 0, cv.width, cv.height);
      // Grid background dots
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          ctx.fillRect(c * CELL + CELL / 2 - 1, r * CELL + CELL / 2 - 1, 2, 2);
        }
      }
      // Snake body
      snake.forEach((s, i) => {
        const isHead = i === 0;
        ctx.fillStyle = isHead ? '#00C9B1' : `rgba(0, 201, 177, ${1 - i / snake.length * 0.55})`;
        ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
        if (isHead) {
          ctx.fillStyle = '#0F1F3D';
          // Eyes look in dir
          const cx = s.x * CELL + CELL / 2, cy = s.y * CELL + CELL / 2;
          const ex = dir.x * 4, ey = dir.y * 4;
          ctx.beginPath(); ctx.arc(cx + ex - 3, cy + ey - 3, 2, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(cx + ex + 3, cy + ey - 3, 2, 0, Math.PI * 2); ctx.fill();
        }
      });
      // Food (token)
      ctx.fillStyle = '#FF9500';
      ctx.fillRect(food.x * CELL + 2, food.y * CELL + 2, CELL - 4, CELL - 4);
      ctx.fillStyle = '#0F1F3D';
      ctx.font = 'bold 14px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(foodToken, food.x * CELL + CELL / 2, food.y * CELL + CELL / 2 + 1);
    }

    function _gameOver() {
      alive = false;
      clearTimeout(_state.timer);
      _state.timer = null;
      _finishGame('code_snake', score);
    }

    _drawSnake();
    _state.timer = setTimeout(tick, tickRate);

    // Controls
    _state.kbHandler = e => {
      const k = e.key;
      if ((k === 'ArrowUp'    || k === 'w' || k === 'W') && dir.y !== 1)  nextDir = { x: 0, y: -1 };
      if ((k === 'ArrowDown'  || k === 's' || k === 'S') && dir.y !== -1) nextDir = { x: 0, y: 1 };
      if ((k === 'ArrowLeft'  || k === 'a' || k === 'A') && dir.x !== 1)  nextDir = { x: -1, y: 0 };
      if ((k === 'ArrowRight' || k === 'd' || k === 'D') && dir.x !== -1) nextDir = { x: 1, y: 0 };
    };
    window.addEventListener('keydown', _state.kbHandler);
    document.querySelectorAll('.ts-snake-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = btn.dataset.d;
        if (d === 'up'    && dir.y !== 1)  nextDir = { x: 0, y: -1 };
        if (d === 'down'  && dir.y !== -1) nextDir = { x: 0, y: 1 };
        if (d === 'left'  && dir.x !== 1)  nextDir = { x: -1, y: 0 };
        if (d === 'right' && dir.x !== -1) nextDir = { x: 1, y: 0 };
      });
    });

    // Show personal best
    if (window.TSA?.services?.sessionManager) {
      TSA.services.sessionManager.getActiveProfile().then(p => {
        const best = p?.gameStats?.code_snake?.bestScore;
        if (typeof best === 'number') _setText('csBest', best);
      });
    }
  }
  function _spawnFood(snake, cols, rows) {
    while (true) {
      const f = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
      if (!snake.some(s => s.x === f.x && s.y === f.y)) return f;
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 3: REACTION TEST
  //  Screen turns red, then unpredictably green. Tap when green. Tap red
  //  early = penalty. Average over 5 rounds = score (lower ms = better).
  // ════════════════════════════════════════════════════════════════════════
  function _startReaction() {
    _state = { activeGame: 'reaction' };
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    let round = 0, total = 0, fails = 0;
    let waiting = false, ready = false, tStart = 0;

    function render(msg, bg, big) {
      stage.innerHTML = `
        <div class="game-stage">
          ${_stageBar(`Round ${Math.min(round + 1, 5)} of 5`)}
          <div class="ts-react-arena" id="reactArena" style="background:${bg}">
            <div class="ts-react-msg">${msg}</div>
            ${big ? `<div class="ts-react-big">${big}</div>` : ''}
          </div>
        </div>
      `;
      const arena = document.getElementById('reactArena');
      arena.addEventListener('click', onTap);
      arena.addEventListener('touchstart', e => { e.preventDefault(); onTap(); }, { passive: false });
    }

    function nextRound() {
      if (round >= 5) {
        const avg = Math.max(1, Math.round(total / Math.max(1, round - fails)));
        // Score is "1000 - avg" capped to 0..950. Lower ms = higher score.
        const score = Math.max(0, Math.min(950, 1000 - avg));
        _finishGame('reaction', score);
        return;
      }
      waiting = true;
      ready = false;
      render('Wait for GREEN, then tap fast', '#FF6B6B');
      const delay = 800 + Math.random() * 2400;
      _state.timer = setTimeout(() => {
        waiting = false;
        ready = true;
        tStart = performance.now();
        render('TAP NOW', '#2EC4B6');
      }, delay);
    }

    function onTap() {
      if (waiting) {
        // Too early
        clearTimeout(_state.timer);
        fails++;
        render('Too early! Wait for green next time.', '#0F1F3D', '+200ms penalty');
        total += 700; // penalty
        round++;
        setTimeout(nextRound, 1100);
        return;
      }
      if (ready) {
        const dt = Math.round(performance.now() - tStart);
        ready = false;
        total += dt;
        round++;
        render(`${dt} ms`, '#0F1F3D', dt < 250 ? 'Lightning!' : dt < 400 ? 'Solid.' : 'Keep practising.');
        setTimeout(nextRound, 1000);
        return;
      }
    }

    render('Tap the arena to start', '#0F1F3D', 'Reaction Test');
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 4: MEMORY MATCH
  //  Pairs of code-symbol cards face down. Click two: match or flip back.
  //  Score = 100 if perfect, deductions per extra flip. Polished.
  // ════════════════════════════════════════════════════════════════════════
  function _startMemoryMatch() {
    _state = { activeGame: 'memory_match', flips: 0, matched: 0, firstPick: null, locked: false };
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    const symbols = ['{}','[]','()','</>','=>','&&','||','??','==','++'];
    const PAIRS = 8;
    const chosen = [...symbols].sort(() => Math.random() - 0.5).slice(0, PAIRS);
    const deck = [...chosen, ...chosen].sort(() => Math.random() - 0.5);
    _state.deck = deck;
    _state.totalPairs = PAIRS;

    stage.innerHTML = `
      <div class="game-stage">
        ${_stageBar('Match all pairs in the fewest flips.')}
        <div class="ts-instructions">Pairs: <strong id="mmPairs">0/${PAIRS}</strong>  &middot;  Flips: <strong id="mmFlips">0</strong></div>
        <div class="mm-grid">
          ${deck.map((s, i) => `
            <button class="mm-card" data-i="${i}" type="button" onclick="TSAGames._mmFlip(${i})">
              <span class="mm-back"></span>
              <span class="mm-front">${s}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
  function _mmFlip(i) {
    if (_state.locked) return;
    const card = document.querySelector(`.mm-card[data-i="${i}"]`);
    if (!card || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    _state.flips++;
    _setText('mmFlips', _state.flips);
    if (!_state.firstPick) {
      _state.firstPick = { i, sym: _state.deck[i], el: card };
      return;
    }
    const a = _state.firstPick;
    const b = { i, sym: _state.deck[i], el: card };
    _state.firstPick = null;
    if (a.sym === b.sym) {
      a.el.classList.add('matched');
      b.el.classList.add('matched');
      _state.matched++;
      _setText('mmPairs', `${_state.matched}/${_state.totalPairs}`);
      if (_state.matched === _state.totalPairs) {
        // Score: best at 16 flips (8 pairs x 2). Each extra flip = -5.
        const score = Math.max(0, 100 - (_state.flips - 16) * 5);
        _finishGame('memory_match', score);
      }
    } else {
      _state.locked = true;
      setTimeout(() => {
        a.el.classList.remove('flipped');
        b.el.classList.remove('flipped');
        _state.locked = false;
      }, 700);
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 5: BUG HUNT (existing, polished)
  // ════════════════════════════════════════════════════════════════════════
  function _startBugHunt() {
    _state = { activeGame: 'bug_hunt', score: 0, timeLeft: 60, misses: 0 };
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    stage.innerHTML = `
      <div class="game-stage">
        ${_stageBar('Click the bug. Beat the clock.')}
        <div class="ts-instructions">Score: <strong id="bhScore">0</strong>  &middot;  Time: <strong id="bhTime">60</strong>s  &middot;  Misses: <strong id="bhMisses">0/3</strong></div>
        <div id="bhSnippet" class="game-snippet"></div>
        <div id="bhFeedback" class="game-feedback"></div>
      </div>
    `;
    _bhNextRound();
    _state.timer = setInterval(() => {
      _state.timeLeft--;
      _setText('bhTime', _state.timeLeft);
      if (_state.timeLeft <= 0) _bhEnd();
    }, 1000);
  }
  function _bhNextRound() {
    const snippet = BUG_SNIPPETS[Math.floor(Math.random() * BUG_SNIPPETS.length)];
    _state.currentBug = snippet.bug;
    _state.currentExplain = snippet.explain;
    const wrap = document.getElementById('bhSnippet');
    const fb = document.getElementById('bhFeedback');
    if (!wrap) return;
    if (fb) fb.textContent = '';
    const lines = snippet.code.split('\n');
    wrap.innerHTML = lines.map(line =>
      `<div class="bh-line">${line.split(/(\s+)/).map(tok =>
        tok.match(/^\s+$/) ? tok : `<span class="bh-tok" data-tok="${tok.replace(/"/g,'&quot;')}">${tok.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</span>`
      ).join('')}</div>`
    ).join('');
    wrap.querySelectorAll('.bh-tok').forEach(t => {
      t.onclick = () => _bhCheck(t);
    });
  }
  function _bhCheck(el) {
    const tok = el.dataset.tok;
    const fb = document.getElementById('bhFeedback');
    if (tok === _state.currentBug || (tok && tok.includes(_state.currentBug))) {
      _state.score += 10;
      el.classList.add('bh-correct');
      if (fb) fb.innerHTML = `<strong class="game-fb-good">Got it!</strong> ${_state.currentExplain}`;
      _setText('bhScore', _state.score);
      setTimeout(_bhNextRound, 900);
    } else {
      _state.misses++;
      el.classList.add('bh-wrong');
      _setText('bhMisses', `${_state.misses}/3`);
      if (fb) fb.innerHTML = `<strong class="game-fb-bad">Not quite, try again.</strong>`;
      if (_state.misses >= 3) _bhEnd();
    }
  }
  function _bhEnd() {
    clearInterval(_state.timer);
    _state.timer = null;
    _finishGame('bug_hunt', _state.score);
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 6: TAG MATCH (existing)
  // ════════════════════════════════════════════════════════════════════════
  function _startTagMatch() {
    _state = { activeGame: 'tag_match', clicks: 0, matched: 0, firstPick: null };
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    const pairs = [...TAG_PAIRS].sort(() => Math.random() - 0.5).slice(0, 8);
    const cards = [];
    pairs.forEach(t => { cards.push({ tag: t, kind: 'open' }); cards.push({ tag: t, kind: 'close' }); });
    cards.sort(() => Math.random() - 0.5);
    _state.deck = cards;
    _state.totalPairs = pairs.length;
    stage.innerHTML = `
      <div class="game-stage">
        ${_stageBar('Match opening to closing tags.')}
        <div class="ts-instructions">Pairs: <strong id="tmPairs">0/${pairs.length}</strong>  &middot;  Clicks: <strong id="tmClicks">0</strong></div>
        <div class="tm-grid" id="tmGrid">
          ${cards.map((c, i) => `
            <button class="tm-card" type="button" data-i="${i}" data-tag="${c.tag}" data-kind="${c.kind}" onclick="TSAGames._tmFlip(${i})">
              <span class="tm-q">?</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
  function _tmFlip(i) {
    const card = document.querySelector(`.tm-card[data-i="${i}"]`);
    if (!card || card.classList.contains('matched') || card.classList.contains('flipped')) return;
    const c = _state.deck[i];
    card.classList.add('flipped');
    card.querySelector('.tm-q').textContent = c.kind === 'open' ? `<${c.tag}>` : `</${c.tag}>`;
    _state.clicks++;
    _setText('tmClicks', _state.clicks);
    if (!_state.firstPick) {
      _state.firstPick = { i, c };
    } else {
      const prev = _state.firstPick;
      _state.firstPick = null;
      if (prev.c.tag === c.tag && prev.c.kind !== c.kind) {
        document.querySelector(`.tm-card[data-i="${prev.i}"]`)?.classList.add('matched');
        card.classList.add('matched');
        _state.matched++;
        _setText('tmPairs', `${_state.matched}/${_state.totalPairs}`);
        if (_state.matched === _state.totalPairs) {
          const score = Math.max(0, Math.round((_state.totalPairs * 20) - (_state.clicks - _state.totalPairs * 2) * 5));
          _finishGame('tag_match', score);
        }
      } else {
        const prevCard = document.querySelector(`.tm-card[data-i="${prev.i}"]`);
        setTimeout(() => {
          prevCard?.classList.remove('flipped');
          card.classList.remove('flipped');
          if (prevCard) prevCard.querySelector('.tm-q').textContent = '?';
          card.querySelector('.tm-q').textContent = '?';
        }, 700);
      }
    }
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 7: CSS PAINTER (existing)
  // ════════════════════════════════════════════════════════════════════════
  function _startCSSPainter() {
    _state = { activeGame: 'css_painter' };
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    const targets = [
      { w: 60, h: 60, r: 50, hue: 200 }, { w: 80, h: 40, r: 8, hue: 30 },
      { w: 40, h: 80, r: 20, hue: 280 }, { w: 70, h: 70, r: 14, hue: 120 },
      { w: 90, h: 30, r: 50, hue: 0 },
    ];
    const t = targets[Math.floor(Math.random() * targets.length)];
    _state.target = t;
    _state.you = { w: 50, h: 50, r: 0, hue: 180 };
    stage.innerHTML = `
      <div class="game-stage">
        ${_stageBar('Match the target shape.')}
        <div class="cssp-row">
          <div class="cssp-pane">
            <div class="cssp-label">Target</div>
            <div class="cssp-stage"><div style="width:${t.w}%;height:${t.h}%;border-radius:${t.r}%;background:hsl(${t.hue},70%,52%)"></div></div>
          </div>
          <div class="cssp-pane">
            <div class="cssp-label">You</div>
            <div class="cssp-stage"><div id="cspYou" style="width:50%;height:50%;border-radius:0%;background:hsl(180,70%,52%)"></div></div>
          </div>
        </div>
        <div class="cssp-controls">
          <label>Width <input type="range" min="10" max="100" value="50" oninput="TSAGames._cssUpdate('w',this.value)"><span id="cspWv">50%</span></label>
          <label>Height <input type="range" min="10" max="100" value="50" oninput="TSAGames._cssUpdate('h',this.value)"><span id="cspHv">50%</span></label>
          <label>Radius <input type="range" min="0" max="50" value="0" oninput="TSAGames._cssUpdate('r',this.value)"><span id="cspRv">0%</span></label>
          <label>Hue <input type="range" min="0" max="360" value="180" oninput="TSAGames._cssUpdate('hue',this.value)"><span id="cspHv2">180</span></label>
        </div>
        <div class="ts-bar" style="margin-top:14px">
          <button class="btn btn-cy" onclick="TSAGames._cssCheck()"><span class="ts-i ts-i-check"></span>Score it</button>
          <span id="cspFeedback" class="game-feedback"></span>
        </div>
      </div>
    `;
  }
  function _cssUpdate(field, val) {
    _state.you[field] = parseInt(val);
    const e = document.getElementById('cspYou');
    if (!e) return;
    e.style.width = _state.you.w + '%';
    e.style.height = _state.you.h + '%';
    e.style.borderRadius = _state.you.r + '%';
    e.style.background = `hsl(${_state.you.hue},70%,52%)`;
    _setText('cspWv', _state.you.w + '%');
    _setText('cspHv', _state.you.h + '%');
    _setText('cspRv', _state.you.r + '%');
    _setText('cspHv2', _state.you.hue);
  }
  function _cssCheck() {
    const t = _state.target, y = _state.you;
    const dw = Math.abs(t.w - y.w), dh = Math.abs(t.h - y.h), dr = Math.abs(t.r - y.r);
    let dhue = Math.abs(t.hue - y.hue);
    if (dhue > 180) dhue = 360 - dhue;
    const avg = (dw + dh + dr + dhue / 3.6) / 4;
    const score = Math.max(0, Math.round(100 - avg * 1.6));
    const fb = document.getElementById('cspFeedback');
    if (fb) fb.innerHTML = `<strong class="game-fb-good">Score: ${score}/100</strong> ${score >= 90 ? 'Pixel perfect.' : score >= 70 ? 'Close.' : 'Try again.'}`;
    _finishGame('css_painter', score);
  }

  // ════════════════════════════════════════════════════════════════════════
  //  GAME 8: LOGIC LOOPS (existing)
  // ════════════════════════════════════════════════════════════════════════
  function _startLogicLoops() {
    _state = { activeGame: 'logic_loops', round: 0, score: 0, totalRounds: PATTERN_ROUNDS.length };
    _llRender();
  }
  function _llRender() {
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    if (_state.round >= _state.totalRounds) {
      _finishGame('logic_loops', _state.score);
      return;
    }
    const round = PATTERN_ROUNDS[_state.round];
    stage.innerHTML = `
      <div class="game-stage">
        ${_stageBar(`Round ${_state.round + 1} of ${_state.totalRounds}`)}
        <div class="ts-instructions">What comes next?  &middot;  Score: <strong>${_state.score}</strong></div>
        <div class="ll-seq">
          ${round.seq.map(s => `<div class="ll-cell">${s}</div>`).join('')}
          <div class="ll-cell ll-cell-q">?</div>
        </div>
        <div class="ll-options">
          ${round.options.map(o => `<button class="ll-opt" type="button" onclick="TSAGames._llPick('${o.replace(/'/g,"\\'")}')">${o}</button>`).join('')}
        </div>
      </div>
    `;
  }
  function _llPick(answer) {
    const round = PATTERN_ROUNDS[_state.round];
    if (answer === round.answer) {
      _state.score += 10;
      _state.round++;
      setTimeout(_llRender, 400);
    } else {
      _state.round++;
      setTimeout(_llRender, 800);
    }
  }

  // ── Finish & save ───────────────────────────────────────────────────────
  async function _finishGame(gameId, score) {
    const game = GAMES_BY_ID[gameId] || { title: 'Game', xp: 20 };
    let isPB = false;
    if (window.TSA?.services?.sessionManager) {
      try {
        const p = await TSA.services.sessionManager.getActiveProfile();
        if (p) {
          const stats = p.gameStats || {};
          const prev = stats[gameId] || { bestScore: 0, plays: 0 };
          isPB = score > prev.bestScore;
          stats[gameId] = {
            bestScore: Math.max(prev.bestScore, score),
            plays: prev.plays + 1,
            lastScore: score,
            lastPlayed: new Date().toISOString().slice(0, 10),
          };
          await TSA.services.sessionManager.updateProfile(p.profileId, { gameStats: stats });
          if (window.TSA.services.xp?.addXP) {
            await TSA.services.xp.addXP('GAME_PLAY', isPB ? game.xp + 10 : game.xp);
          }
        }
      } catch (e) { console.warn('[Games] save failed:', e); }
    }
    _showResult(game, score, isPB);
  }

  function _showResult(game, score, isPB) {
    const stage = document.getElementById('gameStage');
    if (!stage) return;
    stage.insertAdjacentHTML('beforeend', `
      <div class="game-result">
        <div class="game-result-icon"><span class="ts-i ts-i-${isPB ? 'trophy' : 'check_circle'}" aria-hidden="true"></span></div>
        <div class="game-result-title">${isPB ? 'Personal Best!' : 'Round complete'}</div>
        <div class="game-result-score">${score}</div>
        <div class="game-result-xp">+${isPB ? game.xp + 10 : game.xp} XP</div>
        <div class="game-result-actions">
          <button class="btn btn-cy" type="button" onclick="TSAGames.startGame('${game.id}')"><span class="ts-i ts-i-refresh"></span>Play Again</button>
          <button class="btn btn-gh" type="button" onclick="TSAGames.exitGame()"><span class="ts-i ts-i-arrow_left"></span>Back to Hub</button>
        </div>
      </div>
    `);
    if (typeof celebrate === 'function' && isPB) {
      celebrate('trophy', 'Personal Best!', `${game.title}: ${score}`, `+${game.xp + 10} XP`);
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  function _setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ── Route registration with retry (handles late-loading TSA) ─────────────
  function _register() {
    if (window.TSA && window.TSA.routes) {
      window.TSA.routes['games'] = renderHub;
      return true;
    }
    return false;
  }
  if (!_register()) {
    document.addEventListener('DOMContentLoaded', _register, { once: true });
  }

  return { renderHub, startGame, exitGame, _tmFlip, _mmFlip, _cssUpdate, _cssCheck, _llPick, GAMES };
})();

if (typeof window !== 'undefined') {
  window.TSAGames = TSAGames;
}
