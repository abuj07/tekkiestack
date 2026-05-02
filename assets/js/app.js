/**
 * TekkieStack 2.0 — App Core
 * Bootstraps window.TSA, registers the service worker,
 * wires up the router, and manages the UI lifecycle.
 *
 * Author: Aperintel Ltd
 */

// ── Global Namespace ─────────────────────────────────────────────────────
window.TSA = {
  config: {
    version:        '2.0.0',
    storageVersion:  5,          // Schema v5, added userId for Release 2 sync
    deviceId:        _getOrCreateDeviceId(),
    featureFlags: {
      onlineAI:      true,       // Online AI active for Y5+
      googleFonts:   true,
    },
  },

  routes:   {},    // registered by each screen module: TSA.routes['dashboard'] = renderFn
  modules:  {},    // loaded module references
  services: {},    // populated in init()
  storage:  null,  // TSAStorage instance
  guard:    {},    // { aiInput, aiOutput }, wired by ai-lab.js
  ui:       {},    // shared helpers below
};

// ── Device ID ────────────────────────────────────────────────────────────
function _getOrCreateDeviceId() {
  let id = localStorage.getItem('ts_device_id');
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() :
      'dev-' + Math.random().toString(36).slice(2);
    localStorage.setItem('ts_device_id', id);
  }
  return id;
}

// ── Router ────────────────────────────────────────────────────────────────
/**
 * Navigate to a named screen.
 * Screens are <div id="s-{name}" class="screen"> elements.
 * @param {string} name — screen name
 */
function go(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  const target = document.getElementById(`s-${name}`);
  if (target) {
    target.classList.add('on');
    // Update nav active state
    document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
    const nb = document.getElementById(`nb-${name}`);
    if (nb) nb.classList.add('on');
    // Call screen's render function if registered
    if (TSA.routes[name]) {
      try { TSA.routes[name](); } catch(e) { console.error(`[Router] Error rendering ${name}:`, e); }
    }
  } else {
    console.warn('[Router] Unknown screen:', name);
  }
}

/**
 * Navigate to a screen that requires an active session.
 * If no session, redirects to picker with a friendly message.
 * @param {string} name
 */
function need(name) {
  TSA.services.sessionManager.getActiveSession().then(sess => {
    if (sess) {
      go(name);
    } else {
      go('picker');
      const sub = document.getElementById('pickerSub');
      if (sub) {
        sub.style.color = 'var(--coral)';
        sub.textContent = 'Please choose your profile first';
        setTimeout(() => {
          sub.style.color = '';
          sub.textContent = 'Tap your profile to get started';
        }, 2500);
      }
    }
  });
}

// ── Session UI helpers ───────────────────────────────────────────────────
/**
 * Update nav bar with active profile data.
 * @param {object} profile
 */
function _showSessionUI(profile) {
  document.getElementById('navXpPill')?.style && (document.getElementById('navXpPill').style.display = 'flex');
  document.getElementById('navChip')?.style   && (document.getElementById('navChip').style.display   = 'flex');
  document.getElementById('endBtn')?.style    && (document.getElementById('endBtn').style.display    = 'block');

  const el = (id) => document.getElementById(id);
  if (el('cAv'))    el('cAv').textContent    = profile.avatar;
  if (el('cName'))  el('cName').textContent  = profile.name;
  if (el('cXp'))    el('cXp').textContent    = `${profile.xp} XP`;
  if (el('nStreak')) el('nStreak').textContent = profile.streak || 0;

  const xp  = profile.xp || 0;
  const pct = Math.min((xp / 500) * 100, 100);
  if (el('xpFill'))  el('xpFill').style.width = `${pct}%`;
  if (el('xpNum'))   el('xpNum').textContent  = `${xp} XP`;
}

function _hideSessionUI() {
  ['navXpPill','navChip','endBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// ── End session prompt ────────────────────────────────────────────────────
function promptEnd() {
  TSA.services.sessionManager.getActiveProfile().then(p => {
    if (!p) return;
    const av = document.getElementById('eMoAv');
    const ti = document.getElementById('eMoTi');
    if (av) av.textContent = p.avatar;
    if (ti) ti.textContent = `Done for now, ${p.name}?`;
    // Restore default button text (in case it was changed by _promptEndBeforeNewProfile)
    const endBtn  = document.querySelector('#endOvl .btn-co');
    const keepBtn = document.querySelector('#endOvl .btn-gh');
    if (endBtn  && endBtn.textContent  !== 'End Session')        { endBtn.textContent  = 'End Session'; endBtn.onclick = endSession; }
    if (keepBtn && keepBtn.textContent !== 'Keep Going')         { keepBtn.textContent = 'Keep Going'; keepBtn.onclick = () => document.getElementById('endOvl')?.classList.remove('show'); }
    const sub = document.querySelector('#endOvl .modal-sub');
    if (sub) sub.textContent = "Your progress is saved. End session so someone else can use TekkieStack.";
    document.getElementById('endOvl')?.classList.add('show');
  });
}

/**
 * Shown when a user clicks "New Profile" while someone is logged in.
 * Reuses the end-session overlay with customised text and a button
 * that ends the session and then navigates to onboarding.
 */
function _promptEndBeforeNewProfile(name) {
  const e  = window.TSASecurity ? window.TSASecurity.esc : s => String(s || '');
  const av  = document.getElementById('eMoAv');
  const ti  = document.getElementById('eMoTi');
  const sub = document.querySelector('#endOvl .modal-sub');
  if (av)  av.textContent  = '👤';
  if (ti)  ti.textContent  = e(name) + ' is still logged in';
  if (sub) sub.textContent = 'Please end the current session before creating a new profile.';

  const endBtn  = document.querySelector('#endOvl .btn-co');
  const keepBtn = document.querySelector('#endOvl .btn-gh');
  if (keepBtn) {
    keepBtn.textContent = 'Cancel';
    keepBtn.onclick = () => document.getElementById('endOvl')?.classList.remove('show');
  }
  if (endBtn) {
    endBtn.textContent = 'End Session & Create Profile';
    endBtn.onclick = async () => {
      document.getElementById('endOvl')?.classList.remove('show');
      await endSession();
      go('onboard');
    };
  }
  document.getElementById('endOvl')?.classList.add('show');
}

async function endSession() {
  await TSA.services.sessionManager.endSession();
  _hideSessionUI();
  document.getElementById('endOvl')?.classList.remove('show');
  go('picker');
  renderPicker();
}

/**
 * Navigate to the Profiles picker.
 * If a session is active, prompt the user to end it first.
 */
function goToProfiles() {
  TSA.services.sessionManager.getActiveSession().then(sess => {
    if (!sess) { go('picker'); return; }
    TSA.services.sessionManager.getActiveProfile().then(p => {
      const av  = document.getElementById('eMoAv');
      const ti  = document.getElementById('eMoTi');
      const sub = document.querySelector('#endOvl .modal-sub');
      if (av)  av.textContent  = p ? p.avatar : '👤';
      if (ti)  ti.textContent  = p ? `Still logged in as ${p.name}` : 'Session still active';
      if (sub) sub.textContent = 'End your current session first to view or switch profiles.';
      const endBtn  = document.querySelector('#endOvl .btn-co');
      const keepBtn = document.querySelector('#endOvl .btn-gh');
      if (endBtn) {
        endBtn.textContent = 'End Session & Switch';
        endBtn.onclick = endSession;
      }
      if (keepBtn) {
        keepBtn.textContent = 'Keep Going';
        keepBtn.onclick = () => document.getElementById('endOvl')?.classList.remove('show');
      }
      document.getElementById('endOvl')?.classList.add('show');
    });
  });
}

// ── Celebration overlay ───────────────────────────────────────────────────
/**
 * Show the celebration overlay.
 * @param {string} iconOrEmoji — icon name (preferred) OR legacy emoji string
 * @param {string} title
 * @param {string} subtitle
 * @param {string} xpLabel  — e.g. '+20 XP'
 */
function celebrate(iconOrEmoji, title, subtitle, xpLabel) {
  const el = (id) => document.getElementById(id);
  const iconHost = el('celebEm');
  if (iconHost) {
    // Resolve emoji or icon-name to an SVG. Falls back to text for unknown emojis.
    let html = '';
    if (window.TSAIcons) {
      const isLikelyEmoji = /[\uD83C-\uDBFF☀-➿]/.test(iconOrEmoji || '');
      const name = isLikelyEmoji
        ? (TSAIcons.EMOJI_MAP[iconOrEmoji] || 'celebrate')
        : (iconOrEmoji || 'celebrate');
      html = TSAIcons.render(name);
    } else {
      html = iconOrEmoji || '';
    }
    iconHost.innerHTML = html;
  }
  if (el('celebTi'))  el('celebTi').textContent  = title;
  if (el('celebSu'))  el('celebSu').textContent  = subtitle;
  if (el('celebXp'))  el('celebXp').textContent  = xpLabel;
  el('celebOverlay')?.classList.add('show');

  // Confetti
  const card   = el('celebCard');
  const colors = ['#FF6B6B','#FFD93D','#6BCB77','#4D96FF','#FF6B9D','#C77DFF'];
  if (card) {
    for (let i = 0; i < 22; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*28}%;width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*.7}s`;
      card.appendChild(c);
    }
    setTimeout(() => card.querySelectorAll('.confetti').forEach(c => c.remove()), 1700);
  }
}

function closeC() { document.getElementById('celebOverlay')?.classList.remove('show'); }

// ── Profile Picker ────────────────────────────────────────────────────────
async function renderPicker() {
  const storage = TSA.storage;
  const grid    = document.getElementById('profilesGrid');
  const sub     = document.getElementById('pickerSub');
  const greet   = document.getElementById('pickerGreeting');
  const picker  = document.querySelector('.picker');
  if (!grid) return;

  // Time-of-day greeting (set once per render)
  if (greet) {
    const h = new Date().getHours();
    let phrase = 'Hello';
    if (h < 12) phrase = 'Good morning';
    else if (h < 18) phrase = 'Good afternoon';
    else phrase = 'Good evening';
    greet.textContent = phrase + '!';
  }

  // Filter to valid profiles only
  const all = await storage.getAll('profiles_store');
  const profiles = all.filter(p => {
    const errors = window.TSASecurity?.validateProfile(p);
    if (errors && errors.length) {
      console.warn('[Security] Skipping malformed profile:', p.profileId, errors);
      return false;
    }
    return true;
  });

  grid.innerHTML  = '';
  // Apply state class to picker for CSS-driven layout (centered when empty/single)
  if (picker) {
    picker.classList.remove('state-empty','state-single','state-multi');
    if (profiles.length === 0) picker.classList.add('state-empty');
    else if (profiles.length === 1) picker.classList.add('state-single');
    else picker.classList.add('state-multi');
  }

  // Tweak the subtitle text for the empty state
  if (sub) {
    if (profiles.length === 0) {
      sub.textContent = 'Create your first profile to start the journey';
    } else if (profiles.length === 1) {
      sub.textContent = 'Welcome back, tap to continue';
    } else {
      sub.textContent = 'Tap your profile to get started';
    }
  }

  const e = window.TSASecurity ? window.TSASecurity.esc : (s => String(s));
  profiles.forEach(p => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
      <span class="pav">${e(p.avatar)}</span>
      <div class="pnm">${e(p.name)}</div>
      <div class="pmt">Year ${e(String(p.yearGroup))} · ${p.journeyType === 'junior' ? 'Junior' : 'Senior'}</div>
      <div class="pxp"><span class="ts-i ts-i-star_filled ts-i-on-amber" aria-hidden="true"></span> ${e(String(p.xp))} XP</div>
    `;
    card.onclick = () => openPinModal(p);
    grid.appendChild(card);
  });

  // Add card — visually different in empty state (premium hero CTA)
  const addCard = document.createElement('div');
  addCard.className = 'add-card';
  if (profiles.length === 0) {
    addCard.classList.add('add-card-hero');
    addCard.innerHTML = `
      <span class="ai-"><span class="ts-i ts-i-add" aria-hidden="true"></span></span>
      <div class="al">Create Your First Profile</div>
      <div class="al-sub">Pick an avatar, set a PIN, start coding</div>
    `;
  } else {
    addCard.innerHTML = `<span class="ai-"><span class="ts-i ts-i-add" aria-hidden="true"></span></span><div class="al">New Profile</div>`;
  }
  addCard.onclick = async () => {
    const sess = await TSA.services.sessionManager.getActiveSession();
    if (sess) {
      const ap = await TSA.storage.get('profiles_store', sess.profileId);
      _promptEndBeforeNewProfile(ap ? ap.name : 'Current user');
    } else {
      go('onboard');
    }
  };
  grid.appendChild(addCard);
}

// ── PIN Modal ─────────────────────────────────────────────────────────────
let _pinBuf    = '';
let _pinTarget = null;

function openPinModal(profile) {
  _pinTarget = profile;
  _pinBuf    = '';
  _updatePinDots();
  const el = (id) => document.getElementById(id);
  if (el('mAv'))   el('mAv').textContent   = profile.avatar;
  if (el('mNm'))   el('mNm').textContent   = profile.name;
  if (el('pinErr')) el('pinErr').textContent = '';
  el('pinOvl')?.classList.add('show');
}

function closePinModal() {
  document.getElementById('pinOvl')?.classList.remove('show');
  _pinBuf = '';
}

function pk(digit) {
  if (_pinBuf.length >= 4) return;
  _pinBuf += digit;
  _updatePinDots();
  if (_pinBuf.length === 4) setTimeout(_verifyPin, 200);
}

function pd_() {
  _pinBuf = _pinBuf.slice(0, -1);
  _updatePinDots();
  document.getElementById('pinErr').textContent = '';
  document.querySelectorAll('.pd').forEach(d => d.classList.remove('err'));
}

// ── Keyboard input for PIN modals ────────────────────────────────────────
// Lets users type digits + use Backspace + Escape on physical keyboards
// (or mobile soft keyboards), instead of having to click the on-screen pad.
// Routes to whichever PIN overlay is currently open.
document.addEventListener('keydown', (e) => {
  const pinOpen = document.getElementById('pinOvl')?.classList.contains('show');
  const grOpen  = document.getElementById('grOvl')?.classList.contains('show');
  if (!pinOpen && !grOpen) return;

  // Don't hijack typing while a real input/textarea has focus inside the modal.
  const t = e.target;
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

  // Route to the active modal's handlers
  const onDigit  = grOpen ? gpk  : pk;
  const onBack   = grOpen ? gpd_ : pd_;
  const onClose  = grOpen ? closeGuardianReset : closePinModal;

  if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
    onDigit(e.key);
  } else if (e.key === 'Backspace' || e.key === 'Delete') {
    e.preventDefault();
    onBack();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    if (typeof onClose === 'function') onClose();
  }
});

function _updatePinDots() {
  for (let i = 0; i < 4; i++) {
    const d = document.getElementById(`pd${i}`);
    if (d) d.classList.toggle('on', i < _pinBuf.length);
  }
}

async function _verifyPin() {
  const profileId = _pinTarget?.profileId;

  // Check lockout before attempting — security layer
  if (window.TSASecurity && profileId) {
    const { locked, secondsLeft } = TSASecurity.isLocked(profileId);
    if (locked) {
      const errEl = document.getElementById('pinErr');
      if (errEl) errEl.textContent = `Too many wrong attempts. Wait ${secondsLeft}s before trying again.`;
      _pinBuf = '';
      _updatePinDots();
      return;
    }
  }

  try {
    const profile = await TSA.services.sessionManager.startSession(profileId, _pinBuf);
    // Success — clear lockout counter
    if (window.TSASecurity) TSASecurity.clearLockout(profileId);
    closePinModal();
    _showSessionUI(profile);
    TSA.services.xp.updateStreak().then(({ streak }) => {
      const ds = document.getElementById('dashStrk');
      if (ds) ds.textContent = streak;
    });
    go('dashboard');
    _renderDashboard(profile);
    // Fire engagement engine — return banner + daily challenge card
    if (window.TSAEngagement) setTimeout(() => TSAEngagement.init(), 400);
  } catch {
    // Record failed attempt — may trigger lockout
    let errMsg = "That PIN isn't right, try again!";
    if (window.TSASecurity && profileId) {
      const result = TSASecurity.recordFailedAttempt(profileId);
      TSASecurity.auditLog('pin_fail', { profileId, remaining: result.remaining });
      if (result.locked) {
        errMsg = `Too many wrong attempts. Locked for ${result.secondsLeft} seconds.`;
      } else if (result.remaining <= 2) {
        errMsg = `Wrong PIN. ${result.remaining} attempt${result.remaining === 1 ? '' : 's'} left before lockout.`;
      }
    }
    document.getElementById('pinErr').textContent = errMsg;
    document.querySelectorAll('.pd').forEach(d => d.classList.add('err'));
    setTimeout(() => {
      _pinBuf = '';
      _updatePinDots();
      document.querySelectorAll('.pd').forEach(d => d.classList.remove('err'));
    }, 700);
  }
}

// ── Guardian PIN Reset ────────────────────────────────────────────────────
// Modes: 'setup-1' | 'setup-2' | 'verify' | 'reset-1' | 'reset-2' | 'locked'
const _GK = 'ts_guardian_hash';
const _GLOCK_KEY = 'ts_guardian_lock';   // { count, lockedUntil }
const GLOCK_THRESHOLD = 5;
const GLOCK_DURATION  = 60000;            // 60s — slightly stricter than PIN lockout

async function _hashGuardianCode(code) {
  const data = new TextEncoder().encode('guardian:' + code);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function _grLockState() {
  try {
    const raw = localStorage.getItem(_GLOCK_KEY);
    if (!raw) return { count: 0, lockedUntil: 0 };
    return JSON.parse(raw);
  } catch { return { count: 0, lockedUntil: 0 }; }
}
function _grLockSave(state) {
  try { localStorage.setItem(_GLOCK_KEY, JSON.stringify(state)); } catch {}
}
function _grLockClear() {
  try { localStorage.removeItem(_GLOCK_KEY); } catch {}
}
function _grLockRemaining() {
  const s = _grLockState();
  if (!s.lockedUntil || s.lockedUntil <= Date.now()) return 0;
  return Math.ceil((s.lockedUntil - Date.now()) / 1000);
}

let _grMode = 'verify';
let _grPin1 = '';
let _grBuf  = '';
let _grLockTimer = null;

function openGuardianReset() {
  if (!_pinTarget) return;
  _grBuf  = '';
  _grPin1 = '';

  // Locked out from too many wrong guardian-passcode attempts? Stay locked.
  if (_grLockRemaining() > 0) {
    _grMode = 'locked';
  } else {
    _grMode = localStorage.getItem(_GK) ? 'verify' : 'setup-1';
  }
  _grUpdateDots();
  _grRender();
  closePinModal();
  document.getElementById('grOvl')?.classList.add('show');
}

function closeGuardianReset() {
  document.getElementById('grOvl')?.classList.remove('show');
  _grBuf  = '';
  _grPin1 = '';
  _grMode = 'verify';
  if (_grLockTimer) { clearInterval(_grLockTimer); _grLockTimer = null; }
}

function _grRender() {
  const name = window.TSASecurity ? TSASecurity.esc(_pinTarget?.name || '') : (_pinTarget?.name || '');
  const map = {
    'setup-1': {
      title: 'Parent / Teacher Step',
      sub: `<strong>This step is for a parent or teacher.</strong><br>Create a 4-digit guardian passcode for <strong>${name}</strong>. Children should NOT do this alone, the passcode lets the adult unlock the device if the child forgets their PIN.`,
      step: 'Create guardian passcode',
    },
    'setup-2': { title: 'Guardian Setup',    sub: 'Enter it again to confirm.',                                                                    step: 'Confirm guardian passcode' },
    'verify':  { title: 'Guardian Required', sub: `Enter the guardian passcode to reset <strong>${name}</strong>'s PIN.`,                          step: 'Enter guardian passcode' },
    'reset-1': { title: 'New PIN',           sub: `Set a new PIN for <strong>${name}</strong>.`,                                                   step: 'Step 1 of 2: Enter new PIN' },
    'reset-2': { title: 'New PIN',           sub: `Set a new PIN for <strong>${name}</strong>.`,                                                   step: 'Step 2 of 2: Confirm new PIN' },
    'locked':  {
      title: 'Locked Out',
      sub: `Too many wrong guardian passcode attempts. Wait <strong><span id="grLockSec">${_grLockRemaining()}</span></strong> seconds and try again.`,
      step: 'Cooling down',
    },
  };
  const cfg = map[_grMode];
  const el = id => document.getElementById(id);
  if (el('grTitle')) el('grTitle').textContent = cfg.title;
  if (el('grSub'))   el('grSub').innerHTML     = cfg.sub;
  if (el('grStep'))  el('grStep').textContent  = cfg.step;
  if (el('grErr'))   el('grErr').textContent   = '';

  // While locked, run a 1Hz countdown that auto-exits when the lock expires.
  if (_grLockTimer) { clearInterval(_grLockTimer); _grLockTimer = null; }
  if (_grMode === 'locked') {
    _grLockTimer = setInterval(() => {
      const left = _grLockRemaining();
      const span = document.getElementById('grLockSec');
      if (span) span.textContent = left;
      if (left <= 0) {
        clearInterval(_grLockTimer); _grLockTimer = null;
        _grLockClear();
        // Drop back into normal flow
        _grMode = localStorage.getItem(_GK) ? 'verify' : 'setup-1';
        _grBuf = '';
        _grUpdateDots();
        _grRender();
      }
    }, 1000);
  }
}

function gpk(digit) {
  // While locked out, ignore digit input entirely.
  if (_grMode === 'locked') return;
  if (_grBuf.length >= 4) return;
  _grBuf += digit;
  _grUpdateDots();
  if (_grBuf.length === 4) setTimeout(_grNext, 200);
}

function gpd_() {
  if (_grMode === 'locked') return;
  _grBuf = _grBuf.slice(0, -1);
  _grUpdateDots();
  const err = document.getElementById('grErr');
  if (err) err.textContent = '';
  document.querySelectorAll('#grOvl .pd').forEach(d => d.classList.remove('err'));
}

function _grUpdateDots() {
  for (let i = 0; i < 4; i++) {
    const d = document.getElementById(`gd${i}`);
    if (d) d.classList.toggle('on', i < _grBuf.length);
  }
}

function _grShakeErr(msg, nextMode) {
  document.getElementById('grErr').textContent = msg;
  document.querySelectorAll('#grOvl .pd').forEach(d => d.classList.add('err'));
  setTimeout(() => {
    _grBuf  = '';
    _grPin1 = '';
    if (nextMode) _grMode = nextMode;
    _grUpdateDots();
    document.querySelectorAll('#grOvl .pd').forEach(d => d.classList.remove('err'));
    _grRender();
  }, 900);
}

async function _grNext() {
  // Locked? Bail out immediately so we never run hash compares while locked.
  if (_grMode === 'locked') return;

  switch (_grMode) {
    case 'setup-1': {
      const { ok, error } = TSASecurity.validatePIN(_grBuf);
      if (!ok) { _grShakeErr(error); return; }
      _grPin1 = _grBuf; _grBuf = ''; _grMode = 'setup-2';
      _grUpdateDots(); _grRender();
      break;
    }
    case 'setup-2': {
      if (_grBuf !== _grPin1) { _grShakeErr("Codes don't match. Try again.", 'setup-1'); return; }
      localStorage.setItem(_GK, await _hashGuardianCode(_grBuf));
      // First-time setup audit so a parent reviewing logs can see this.
      if (window.TSASecurity) TSASecurity.auditLog('guardian_setup', {});
      _grBuf = ''; _grPin1 = ''; _grMode = 'reset-1';
      _grUpdateDots(); _grRender();
      break;
    }
    case 'verify': {
      // Re-check lockout right before we hash, in case the user kept the
      // modal open across a lockout window from another flow.
      if (_grLockRemaining() > 0) {
        _grMode = 'locked'; _grBuf = ''; _grUpdateDots(); _grRender(); return;
      }
      const hash = await _hashGuardianCode(_grBuf);
      if (hash !== localStorage.getItem(_GK)) {
        const state = _grLockState();
        state.count = (state.count || 0) + 1;
        if (state.count >= GLOCK_THRESHOLD) {
          state.lockedUntil = Date.now() + GLOCK_DURATION;
          state.count = 0;
          _grLockSave(state);
          if (window.TSASecurity) TSASecurity.auditLog('guardian_lockout', {});
          _grBuf = ''; _grMode = 'locked'; _grUpdateDots(); _grRender();
          return;
        }
        _grLockSave(state);
        const left = GLOCK_THRESHOLD - state.count;
        _grShakeErr(`Wrong passcode. ${left} attempt${left === 1 ? '' : 's'} left before lockout.`);
        return;
      }
      // Correct, clear failed-attempt counter.
      _grLockClear();
      _grBuf = ''; _grMode = 'reset-1';
      _grUpdateDots(); _grRender();
      break;
    }
    case 'reset-1': {
      const { ok, error } = TSASecurity.validatePIN(_grBuf);
      if (!ok) { _grShakeErr(error); return; }
      _grPin1 = _grBuf; _grBuf = ''; _grMode = 'reset-2';
      _grUpdateDots(); _grRender();
      break;
    }
    case 'reset-2': {
      if (_grBuf !== _grPin1) { _grShakeErr("PINs don't match. Start again.", 'reset-1'); return; }
      await _grSave(_grBuf);
      break;
    }
  }
}

async function _grSave(newPin) {
  try {
    const deviceId = window.TSA.config.deviceId;
    const pinHash  = await TSA.services.sessionManager.hashPIN(newPin, deviceId);
    await TSA.services.sessionManager.updateProfile(_pinTarget.profileId, { pinHash });
    if (window.TSASecurity) {
      TSASecurity.clearLockout(_pinTarget.profileId);
      TSASecurity.auditLog('pin_reset', { profileId: _pinTarget.profileId });
    }
    const targetName = _pinTarget?.name || '';
    closeGuardianReset();
    // Show success feedback so the user knows the reset actually worked,
    // then reopen the PIN modal so they can sign in with the new PIN.
    if (typeof celebrate === 'function') {
      celebrate('check_circle', 'PIN updated!', `${targetName} can now sign in with the new PIN.`, '');
    }
    openPinModal(_pinTarget);
  } catch (err) {
    // Failure recovery: don't leave the user stuck with a full buffer.
    // Reset to reset-1 so they can re-enter the new PIN cleanly.
    console.error('[Guardian] PIN save failed:', err);
    _grShakeErr("Something went wrong saving the new PIN. Please try again.", 'reset-1');
  }
}

// ── Dashboard render ──────────────────────────────────────────────────────
function _renderDashboard(profile) {
  const el = (id) => document.getElementById(id);
  if (el('welH'))    el('welH').textContent    = `Hello, ${profile.name}! 👋`;
  if (el('dashStrk')) el('dashStrk').textContent = profile.streak || 0;
}

// ── Offline indicator ─────────────────────────────────────────────────────
function _setupOfflineIndicator() {
  function update() {
    const banner = document.getElementById('offlineBanner');
    if (banner) banner.classList.toggle('show', !navigator.onLine);
  }
  window.addEventListener('online',  update);
  window.addEventListener('offline', update);
  update();
}

// ── Cookie banner ────────────────────────────────────────────────────────
function acceptCookies() {
  document.getElementById('cookieBanner')?.classList.add('hidden');
  try { localStorage.setItem('ts_cookie_ok', '1'); } catch {}
}

function _initCookieBanner() {
  try {
    if (!localStorage.getItem('ts_cookie_ok')) {
      document.getElementById('cookieBanner')?.classList.remove('hidden');
    } else {
      document.getElementById('cookieBanner')?.classList.add('hidden');
    }
  } catch {}
}

// ── Footer copyright ─────────────────────────────────────────────────────
function _initFooter() {
  const yr  = new Date().getFullYear();
  const el  = document.getElementById('footerCopy');
  if (el) el.textContent = `© ${yr} Aperintel. All rights reserved. Tekkiestack is a product of Aperintel.`;
}

// ── Service worker registration ────────────────────────────────────────────
function _registerSW() {
  if (!('serviceWorker' in navigator)) return;

  // Reload when a new SW takes control so kids always get fresh assets.
  // _hadController guards against reloading on the very first SW install.
  let _hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (_hadController) {
      _showUpdateToast();
      // Brief delay so the user sees the toast before the page reloads
      setTimeout(() => window.location.reload(), 1100);
    }
    _hadController = true;
  });

  navigator.serviceWorker.register('./sw.js').then(reg => {
    console.log('[SW] Registered:', reg.scope);
  }).catch(err => {
    console.warn('[SW] Registration failed:', err);
  });
}

// Briefly show a toast so the auto-refresh feels intentional, not glitchy.
function _showUpdateToast() {
  // Don't double-render if it's already there
  if (document.getElementById('swUpdateToast')) return;
  const toast = document.createElement('div');
  toast.id = 'swUpdateToast';
  toast.className = 'sw-update-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  // Inline SVG (icons.js may not have hydrated by reload time)
  toast.innerHTML = `
    <span class="sw-update-spinner" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 0 1-9 9c-2.5 0-4.7-1-6.4-2.6"/>
        <path d="M3 12a9 9 0 0 1 9-9c2.5 0 4.7 1 6.4 2.6"/>
      </svg>
    </span>
    <span class="sw-update-text">Updating to the latest version&hellip;</span>
  `;
  document.body.appendChild(toast);
  // Force a reflow so the slide-in animation runs
  // eslint-disable-next-line no-unused-expressions
  toast.offsetHeight;
  toast.classList.add('show');
}

// ── Bootstrap ────────────────────────────────────────────────────────────
// ── PWA Install Prompt (Stage 15) ────────────────────────────────────────
let _deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  _deferredInstallPrompt = e;
  // Show install banner after 10 seconds if not already installed
  setTimeout(_showInstallBanner, 10000);
});

window.addEventListener('appinstalled', () => {
  const banner = document.getElementById('pwaBanner');
  if (banner) banner.classList.add('hidden');
  _deferredInstallPrompt = null;
  console.log('[PWA] App installed');
});

function _showInstallBanner() {
  if (!_deferredInstallPrompt) return;
  const banner = document.getElementById('pwaBanner');
  if (banner) banner.classList.remove('hidden');
}

function installPWA() {
  if (!_deferredInstallPrompt) return;
  _deferredInstallPrompt.prompt();
  _deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === 'accepted') console.log('[PWA] User accepted install');
    _deferredInstallPrompt = null;
    const banner = document.getElementById('pwaBanner');
    if (banner) banner.classList.add('hidden');
  });
}

function dismissInstallBanner() {
  const banner = document.getElementById('pwaBanner');
  if (banner) banner.classList.add('hidden');
  try { localStorage.setItem('ts_pwa_dismissed', '1'); } catch {}
}


async function _init() {
  try {
    // 0. Attach security module first
    TSA.services.security = window.TSASecurity;
    if (window.TSASecurity) TSASecurity.init();

    // 1. Attach storage
    TSA.storage = window._TSAStorageModule;
    await TSA.storage.open();

    // Run storage migration (repairs any v4 records, ensures all fields exist)
    try {
      const migResult = await TSA.storage.runMigration();
      if (migResult.repaired > 0) {
        console.log(`[Storage] Migration complete: ${migResult.repaired}/${migResult.checked} profiles repaired`);
      }
    } catch(e) { console.warn('[Storage] Migration error:', e); }

    // 2. Attach services
    TSA.services.sessionManager = window._TSASessionModule;
    TSA.services.xp             = window._TSAXpModule;

    // 3. Attach UI helpers to namespace
    TSA.ui = { celebrate, closeC, go, need, promptEnd, goToProfiles };

    // 4. Offline & cookie banner
    _setupOfflineIndicator();
    _initCookieBanner();
    _initFooter();

    // 5. Service worker
    _registerSW();

    // 6. Check for existing session
    const sess = await TSA.services.sessionManager.getActiveSession();
    if (sess) {
      const profile = await TSA.storage.get('profiles_store', sess.profileId);
      if (profile) {
        _showSessionUI(profile);
        go('dashboard');
        _renderDashboard(profile);
        return;
      }
      // Orphaned session — clear it
      await TSA.services.sessionManager.endSession();
    }

    // 7. No session — show picker
    renderPicker();
    go('picker');

    console.log('[TSA] Initialised. Storage version:', TSA.config.storageVersion, '| userId field: ready for Release 2');

  } catch(err) {
    console.error('[TSA] Init error:', err);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _init);
} else {
  _init();
}
