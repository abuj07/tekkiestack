/**
 * TekkieStack 2.0 — Typing Trainer Module
 * Full suite: on-screen keyboard, WPM tracking, 5 levels, progression gates.
 * Built in Stage 6.
 *
 * Author: Aperintel Ltd
 */

const TSATyping = (() => {

  // ── Keyboard layout ──────────────────────────────────────────────────────
  const KB_ROWS = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','=','⌫'],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['Caps','a','s','d','f','g','h','j','k','l',';',"'",'↵'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    ['Space'],
  ];
  const HOME_ROW = new Set(['a','s','d','f','j','k','l',';']);
  const WIDE     = new Set(['Tab','Caps','Shift','⌫','↵','\\']);

  // ── Lesson pools ─────────────────────────────────────────────────────────
  const LEVELS = {
    home:  {
      label: 'Home Row',
      passages: ['asdf jkl; asdf jkl;','fdsa ;lkj fdsa ;lkj','asdfjkl; fdsajkl; asdf','jkl; asdf jkl; fdsa','afjk dsla fjdk slaf'],
      gateWpm: 0, gateAcc: 0,
    },
    alpha: {
      label: 'All Letters',
      passages: ['the quick brown fox','jumps over lazy dog','pack my box with five','the five boxing wizards','sphinx of black quartz'],
      gateWpm: 20, gateAcc: 90,
    },
    words: {
      label: 'Common Words',
      passages: ['code build create learn','web page style design','function return let const','array object string true','click input button form div'],
      gateWpm: 30, gateAcc: 88,
    },
    code: {
      label: 'Code Snippets',
      passages: ["let x = 10;","function add(a, b) {","return a + b;","const name = 'Alex';","document.getElementById('btn')"],
      gateWpm: 40, gateAcc: 85, gateYr: 5,
    },
    speed: {
      label: 'Speed Run',
      passages: ['the quick brown fox jumps','over the lazy dog and then','runs back to the start again','speed comes from daily practice','keep your eyes on the text always'],
      gateWpm: 50, gateAcc: 85,
    },
  };

  // ── State ────────────────────────────────────────────────────────────────
  let _level   = 'home';
  let _text    = '';
  let _pos     = 0;
  let _errors  = 0;
  let _correct = 0;
  let _start   = null;
  let _timer   = null;
  let _active  = false;

  // ── Build keyboard ───────────────────────────────────────────────────────
  function buildKeyboard() {
    KB_ROWS.forEach((row, ri) => {
      const rowEl = document.getElementById(`kbRow${ri}`);
      if (!rowEl) return;
      rowEl.innerHTML = '';
      row.forEach(k => {
        const div = document.createElement('div');
        div.className = 'kk';
        if (k === 'Space') { div.classList.add('sp'); div.textContent = 'Space'; div.id = 'kk-space'; }
        else if (WIDE.has(k)) { div.classList.add(k === 'Shift' || k === 'Caps' ? 'w3' : 'w2'); div.textContent = k; }
        else { div.textContent = k; }
        if (HOME_ROW.has(k.toLowerCase())) div.classList.add('home-row');
        div.id = div.id || ('kk-' + k.replace(/[^a-zA-Z0-9]/g, '_'));
        rowEl.appendChild(div);
      });
    });
  }

  // ── Set level ─────────────────────────────────────────────────────────────
  function setTypingLevel(el, lvl) {
    document.querySelectorAll('.lp').forEach(p => p.classList.remove('on'));
    el.classList.add('on');
    _level = lvl;
    resetTyping();
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  function resetTyping() {
    clearInterval(_timer);
    _active = false; _pos = 0; _errors = 0; _correct = 0; _start = null;
    const pool = LEVELS[_level]?.passages || LEVELS.home.passages;
    _text = pool[Math.floor(Math.random() * pool.length)];
    _setEl('wpmStat', '0'); _setEl('accStat', '100%');
    _setEl('timeStat', '0s'); _setEl('corStat', '0');
    _renderPrompt();
    _highlightNextKey();
  }

  // ── Start ─────────────────────────────────────────────────────────────────
  function startTyping() { resetTyping(); _active = true; focusTyping(); }
  function focusTyping() { document.getElementById('typingHidden')?.focus(); }

  // ── Render prompt ─────────────────────────────────────────────────────────
  function _renderPrompt() {
    const el = document.getElementById('typingPrompt');
    if (!el) return;
    el.innerHTML = _text.split('').map((c, i) => {
      let cls = 'ch';
      if (i < _pos)    cls += ' ck';
      if (i === _pos)  cls += ' cc';
      return `<span class="${cls}">${c === ' ' ? '&nbsp;' : c}</span>`;
    }).join('');
  }

  // ── Highlight next key ────────────────────────────────────────────────────
  function _highlightNextKey() {
    document.querySelectorAll('.kk').forEach(k => k.classList.remove('next','ok','bad'));
    if (_pos >= _text.length) return;
    const nk = _text[_pos].toLowerCase();
    const id = 'kk-' + (nk === ' ' ? 'space' : nk.replace(/[^a-zA-Z0-9]/g, '_'));
    document.getElementById(id)?.classList.add('next');
  }

  // ── Handle input ──────────────────────────────────────────────────────────
  function handleTypingInput(e) {
    const inp = document.getElementById('typingHidden');
    const typed = inp.value; inp.value = '';
    if (!_text || _pos >= _text.length) return;
    if (!_start) { _start = Date.now(); _startTimer(); }

    const expected = _text[_pos];
    const id = 'kk-' + (expected === ' ' ? 'space' : expected.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_'));
    const kEl = document.getElementById(id);

    if (typed === expected) {
      _correct++;
      if (kEl) { kEl.classList.add('ok'); setTimeout(() => kEl.classList.remove('ok'), 180); }
      _pos++;
      _setEl('corStat', _correct);
    } else {
      _errors++;
      if (kEl) { kEl.classList.add('bad'); setTimeout(() => kEl.classList.remove('bad'), 280); }
    }

    const acc = Math.round((_correct / (_correct + _errors)) * 100);
    _setEl('accStat', acc + '%');
    _renderPrompt();
    _highlightNextKey();

    if (_pos >= _text.length) {
      clearInterval(_timer);
      const elapsed = (Date.now() - _start) / 1000;
      const wpm = Math.round((_text.split(' ').length / (elapsed / 60)));
      _setEl('wpmStat', wpm);
      const best = parseInt(document.getElementById('bestStat')?.textContent) || 0;
      if (wpm > best) _setEl('bestStat', wpm);

      // Award XP
      const xpKey = wpm > best ? 'TYPING_PERSONAL_BEST' : 'TYPING_SESSION';
      TSA.services.xp.addXP(xpKey).then(() => {
        celebrate('⌨️', 'Session Complete!', `WPM: ${wpm} · Accuracy: ${acc}%`, xpKey === 'TYPING_PERSONAL_BEST' ? '+15 XP 🏆' : '+10 XP');
        // Check speed typer badge (40+ WPM)
        if (wpm >= 40) TSA.services.xp.awardBadge('speed_typer');
      });

      // Persist best WPM to profile
      TSA.services.sessionManager.getActiveProfile().then(p => {
        if (p && wpm > (p.typingStats?.bestWpm || 0)) {
          TSA.services.sessionManager.updateProfile(p.profileId, {
            typingStats: { ...p.typingStats, bestWpm: wpm, sessionsCompleted: (p.typingStats?.sessionsCompleted || 0) + 1 }
          });
        }
      });

      setTimeout(resetTyping, 2800);
    }
  }

  function handleTypingKey(e) {
    if (!_active && e.key.length === 1) { _active = true; _start = Date.now(); _startTimer(); }
  }

  function _startTimer() {
    clearInterval(_timer);
    _timer = setInterval(() => {
      const s = Math.round((Date.now() - _start) / 1000);
      _setEl('timeStat', s + 's');
      if (_pos > 0 && s > 0) {
        const wpm = Math.round(_text.slice(0, _pos).split(' ').length / (s / 60));
        _setEl('wpmStat', wpm);
      }
    }, 500);
  }

  function _setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ── Wire DOM events ───────────────────────────────────────────────────────
  function _wireEvents() {
    const hidden = document.getElementById('typingHidden');
    if (hidden) {
      hidden.oninput   = handleTypingInput;
      hidden.onkeydown = handleTypingKey;
    }
    const prompt = document.getElementById('typingPrompt');
    if (prompt) prompt.onclick = focusTyping;
  }

  // ── Init (called when typing screen loads) ────────────────────────────────
  function init() {
    buildKeyboard();
    _wireEvents();
    resetTyping();
    // Load personal best from profile
    TSA.services.sessionManager.getActiveProfile().then(p => {
      if (p?.typingStats?.bestWpm) _setEl('bestStat', p.typingStats.bestWpm);
    });
  }

  // Register screen route
  if (window.TSA) {
    TSA.routes['typing'] = init;
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return { init, buildKeyboard, resetTyping, startTyping, focusTyping, setTypingLevel, LEVELS };
})();

// Expose globals used by inline HTML onclick handlers
window.TSATyping        = TSATyping;
window.resetTyping      = TSATyping.resetTyping;
window.startTyping      = TSATyping.startTyping;
window.focusTyping      = TSATyping.focusTyping;
window.setTypingLevel   = TSATyping.setTypingLevel;
