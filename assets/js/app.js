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
    storageVersion:  5,          // Schema v5 — added userId for Release 2 sync
    deviceId:        _getOrCreateDeviceId(),
    featureFlags: {
      onlineAI:      false,      // Disabled by default — enabled per-profile Y5+
      googleFonts:   true,
    },
  },

  routes:   {},    // registered by each screen module: TSA.routes['dashboard'] = renderFn
  modules:  {},    // loaded module references
  services: {},    // populated in init()
  storage:  null,  // TSAStorage instance
  guard:    {},    // { aiInput, aiOutput } — wired by ai-lab.js
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
 * @param {string} emoji
 * @param {string} title
 * @param {string} subtitle
 * @param {string} xpLabel  — e.g. '+20 XP'
 */
function celebrate(emoji, title, subtitle, xpLabel) {
  const el = (id) => document.getElementById(id);
  if (el('celebEm'))  el('celebEm').textContent  = emoji;
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
  if (!grid) return;

  const profiles = await storage.getAll('profiles_store');
  grid.innerHTML  = '';

  profiles.forEach(p => {
    // Validate profile integrity before rendering — skip corrupted records
    const errors = window.TSASecurity?.validateProfile(p);
    if (errors && errors.length) {
      console.warn('[Security] Skipping malformed profile:', p.profileId, errors);
      return;
    }
    const card = document.createElement('div');
    card.className = 'profile-card';
    // Escape all user-supplied data — XSS prevention
    const e = window.TSASecurity ? window.TSASecurity.esc : (s => String(s));
    card.innerHTML = `
      <span class="pav">${e(p.avatar)}</span>
      <div class="pnm">${e(p.name)}</div>
      <div class="pmt">Year ${e(String(p.yearGroup))} · ${p.journeyType === 'junior' ? 'Junior' : 'Senior'}</div>
      <div class="pxp">&#11088; ${e(String(p.xp))} XP</div>
    `;
    card.onclick = () => openPinModal(p);
    grid.appendChild(card);
  });

  // Add "New Profile" card
  const addCard = document.createElement('div');
  addCard.className = 'add-card';
  addCard.innerHTML = `<span class="ai-">＋</span><div class="al">New Profile</div>`;
  addCard.onclick = async () => {
    const sess = await TSA.services.sessionManager.getActiveSession();
    if (sess) {
      // A profile is active — show prompt to end session first
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
    let errMsg = "That PIN isn't right — try again!";
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
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('[SW] Registered:', reg.scope);
    }).catch(err => {
      console.warn('[SW] Registration failed:', err);
    });
  }
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
