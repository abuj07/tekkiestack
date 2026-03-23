/**
 * TekkieStack 2.0 — Engagement Engine Module (Stage 11)
 * Daily challenges, return engine, badge showcase, XP milestone toasts.
 * Works alongside xp.js (core logic) — this module handles the UI layer.
 *
 * XP Events:   lesson +20 | project +10 | daily +15 | debug +25 | cert +50
 *              streak-7 +30 | streak-30 +100 | first-build +25 | badge +10
 * Milestones:  100 | 250 | 500 | 1000 | 2500 XP
 * Streaks:     freeze token per 7 days (max 3)
 * Return:      1 day → welcome back | 2 days → recap | 3+ → reminder | 7+ → refresher
 *
 * Author: Aperintel Ltd
 */

const TSAEngagement = (() => {

  // ── Daily challenge pool ──────────────────────────────────────────────────
  const CHALLENGE_POOL = [
    {
      id: 'dc-001', title: 'Fix the Broken Button',
      desc: 'There\'s a typo in the JavaScript — the button isn\'t responding. Find it and fix it!',
      tags: ['🐛 Debug', '⏱ 5 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:30px; }
    button { background:#00C9B1; color:#0F1F3D; padding:12px 24px; border:none; border-radius:8px; font-size:16px; cursor:pointer; font-weight:700; }
    #msg { margin-top:14px; font-size:18px; }
  </style>
</head>
<body>
  <h2>Debug Challenge 🐛</h2>
  <p>The button does nothing. Find the typo and fix it!</p>
  <button onclick="showMssage()">Click me!</button>
  <p id="msg"></p>
  <script>
    function showMessage() {
      document.getElementById("msg").textContent = "Fixed! 🎉";
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-002', title: 'Style the Navbar',
      desc: 'The navbar HTML is there but completely unstyled. Add CSS to make it look professional.',
      tags: ['🎨 CSS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* TODO: Style the .navbar so it looks professional
       - Dark background
       - Logo on the left, links on the right
       - Hover effects on links
    */
  </style>
</head>
<body>
  <nav class="navbar">
    <span class="logo">MyBrand</span>
    <div class="links">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </nav>
  <h1 style="padding:30px">Page content goes here</h1>
</body>
</html>`,
    },
    {
      id: 'dc-003', title: 'Colour Picker',
      desc: 'Use JavaScript to make a colour picker that updates the background live.',
      tags: ['⚡ JS', '⏱ 10 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family:sans-serif; padding:40px; text-align:center; transition:background .3s; }
    input[type=color] { width:80px; height:80px; border:none; cursor:pointer; border-radius:12px; }
    h2 { margin-bottom:20px; }
  </style>
</head>
<body>
  <h2>🎨 Pick a Colour</h2>
  <input type="color" value="#00C9B1" oninput="updateBackground(this.value)">
  <p id="hexLabel" style="margin-top:14px;font-size:18px;font-weight:700">#00C9B1</p>
  <script>
    function updateBackground(colour) {
      // TODO: Set document.body.style.background to the chosen colour
      // TODO: Update the #hexLabel text to show the colour value
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-004', title: 'Card Flip Animation',
      desc: 'Add a CSS transition so the card flips on hover to reveal the back side.',
      tags: ['🎨 CSS', '⏱ 12 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; display:flex; justify-content:center; align-items:center; min-height:100vh; }
    .card-wrapper { width:220px; height:160px; perspective:1000px; cursor:pointer; }
    .card-inner { width:100%; height:100%; position:relative; /* TODO: Add transform-style and transition */ }
    .front, .back { position:absolute; width:100%; height:100%; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:40px; }
    .front { background:#00C9B1; }
    .back  { background:#FF6B6B; /* TODO: Rotate 180deg by default */ }
    /* TODO: On .card-wrapper:hover, rotate .card-inner 180deg */
  </style>
</head>
<body>
  <div class="card-wrapper">
    <div class="card-inner">
      <div class="front">🚀</div>
      <div class="back">🎉</div>
    </div>
  </div>
</body>
</html>`,
    },
    {
      id: 'dc-005', title: 'Score Counter',
      desc: 'Build a score counter with + and − buttons and a reset. Use JavaScript to track the score.',
      tags: ['⚡ JS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; text-align:center; padding:60px; }
    h1 { font-size:80px; margin-bottom:20px; }
    button { padding:14px 28px; margin:8px; border:none; border-radius:10px; font-size:20px; font-weight:700; cursor:pointer; }
    .add { background:#00C9B1; color:#0F1F3D; }
    .sub { background:#FF6B6B; color:#fff; }
    .rst { background:rgba(255,255,255,.1); color:#fff; }
  </style>
</head>
<body>
  <h2>Score Counter</h2>
  <h1 id="score">0</h1>
  <button class="sub" onclick="change(-1)">−</button>
  <button class="add" onclick="change(1)">+</button>
  <button class="rst" onclick="reset()">Reset</button>
  <script>
    let score = 0;
    function change(n) {
      // TODO: Add n to score and update the #score element
    }
    function reset() {
      // TODO: Set score to 0 and update the display
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-006', title: 'Responsive Grid',
      desc: 'Make this grid switch from 3 columns on desktop to 1 column on mobile using CSS only.',
      tags: ['🎨 CSS', '⏱ 6 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family:sans-serif; background:#F8F5F0; padding:28px; }
    .grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
    .box { background:#0F1F3D; color:white; padding:24px; border-radius:12px; text-align:center; font-size:15px; }
    /* TODO: Add a media query for screens narrower than 600px
       Make the grid have 1 column instead of 3 */
  </style>
</head>
<body>
  <h2>Responsive Grid</h2>
  <div class="grid">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
    <div class="box">Box 4</div>
    <div class="box">Box 5</div>
    <div class="box">Box 6</div>
  </div>
</body>
</html>`,
    },
  ];

  // ── Return engine messages ─────────────────────────────────────────────────
  const RETURN_MESSAGES = {
    1: { title: 'Welcome back!',       msg: 'Good to see you again. Your streak is safe — let\'s keep it going!', emoji: '👋' },
    2: { title: 'Quick recap?',        msg: 'It\'s been 2 days. Want a quick recap of what you were working on?',  emoji: '📖' },
    3: { title: 'Pick up where you left off', msg: 'Your last lesson is waiting. It won\'t take long to get back in the flow.', emoji: '🔖' },
    7: { title: 'Full refresher mode', msg: 'It\'s been a week! Let\'s do a quick refresher before picking up where you were.', emoji: '🔄' },
  };

  // ── Get today's challenge (deterministic by date + profile) ───────────────
  function getTodaysChallenge(profileId) {
    const today = new Date().toISOString().slice(0, 10);
    const seed  = [...(today + profileId)].reduce((a, c) => a + c.charCodeAt(0), 0);
    return CHALLENGE_POOL[seed % CHALLENGE_POOL.length];
  }

  // ── Check return engine ────────────────────────────────────────────────────
  async function checkReturn() {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile?.streakLastDate) return null;

    const today = new Date().toISOString().slice(0, 10);
    const last  = profile.streakLastDate;
    if (last === today) return null; // active today — no return message

    const diff = Math.round((new Date(today) - new Date(last)) / 86400000);
    if (diff <= 0) return null;

    const msgKey = diff >= 7 ? 7 : diff >= 3 ? 3 : diff;
    return RETURN_MESSAGES[msgKey] || RETURN_MESSAGES[3];
  }

  // ── Show return banner ─────────────────────────────────────────────────────
  async function showReturnBannerIfNeeded() {
    const msg = await checkReturn();
    if (!msg) return;

    const el = document.getElementById('returnBanner');
    if (el) el.remove(); // clear any existing

    const banner = document.createElement('div');
    banner.id = 'returnBanner';
    banner.style.cssText = `
      position:fixed;top:var(--nav-h);left:0;right:0;
      background:linear-gradient(135deg,var(--navy),var(--navy2));
      border-bottom:1px solid rgba(0,201,177,.25);
      padding:13px 24px;display:flex;align-items:center;gap:14px;
      z-index:95;animation:slideDown .3s ease;flex-wrap:wrap;
    `;
    banner.innerHTML = `
      <span style="font-size:24px">${msg.emoji}</span>
      <div style="flex:1;min-width:200px">
        <div style="font-family:'Fredoka One',cursive;font-size:16px;color:#fff">${msg.title}</div>
        <div style="font-size:13px;color:rgba(255,255,255,.6);font-weight:500">${msg.msg}</div>
      </div>
      <button class="btn btn-cy" style="font-size:13px;padding:8px 16px" onclick="need('dashboard');document.getElementById('returnBanner').remove()">Continue →</button>
      <button class="btn" style="font-size:12px;padding:8px 13px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.5)" onclick="document.getElementById('returnBanner').remove()">✕</button>
    `;
    const nav = document.querySelector('.nav');
    nav?.after(banner);
    setTimeout(() => banner?.remove(), 12000);
  }

  // ── Render daily challenge card (used by dashboard) ────────────────────────
  async function renderDailyCard(containerId) {
    const el      = document.getElementById(containerId);
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!el || !profile) return;

    const ch    = getTodaysChallenge(profile.profileId);
    const today = new Date().toISOString().slice(0, 10);
    const done  = profile.phaseProgress?.daily_challenges?.includes(today);

    el.innerHTML = `
      <div class="dbadge">⚡ Daily · ${new Date().toLocaleDateString('en-GB', { weekday:'long' })}</div>
      <div class="daily-title">${ch.title}</div>
      <div class="daily-desc">${ch.desc}</div>
      <div class="mtags">${ch.tags.map(t => `<span class="mtag">${t}</span>`).join('')}</div>
      <div class="brow">
        ${done ? `
          <div style="display:flex;align-items:center;gap:8px;color:var(--green);font-weight:800;font-size:14px">✅ Completed today! Well done!</div>
        ` : `
          <button class="btn btn-cy" onclick="TSAEngagement.startDailyChallenge()">Start Challenge</button>
          <button class="btn btn-gh" onclick="TSAEngagement.skipDailyChallenge()">Skip today</button>
        `}
      </div>
    `;
  }

  // ── Start daily challenge ─────────────────────────────────────────────────
  async function startDailyChallenge() {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) return;
    const ch = getTodaysChallenge(profile.profileId);
    // Load challenge into code editor
    const codeInput = document.getElementById('codeInput');
    if (codeInput) codeInput.value = ch.code;
    const lessonTitle = document.getElementById('lessonTitle');
    const lessonDesc  = document.getElementById('lessonDesc');
    if (lessonTitle) lessonTitle.textContent = `Daily Challenge — ${ch.title}`;
    if (lessonDesc)  lessonDesc.textContent  = ch.desc;
    go('editor');
    setTimeout(() => {
      if (typeof runCode === 'function') runCode();
    }, 150);
  }

  // ── Complete daily challenge ──────────────────────────────────────────────
  async function completeDailyChallenge() {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) return;
    const today = new Date().toISOString().slice(0, 10);
    const prog  = { ...(profile.phaseProgress || {}) };
    if (!prog.daily_challenges) prog.daily_challenges = [];
    if (prog.daily_challenges.includes(today)) return; // already done
    prog.daily_challenges.push(today);
    await window.TSA.services.sessionManager.updateProfile(profile.profileId, { phaseProgress: prog });
    const { newXp, newBadges } = await window.TSA.services.xp.addXP('DAILY_CHALLENGE');
    celebrate('⚡', 'Daily Challenge Done!', `+15 XP · Total: ${newXp}`, '+15 XP');
  }

  // ── Skip daily challenge ──────────────────────────────────────────────────
  async function skipDailyChallenge() {
    await renderDailyCard('dailyChallengeCard');
  }

  // ── Badge showcase render ─────────────────────────────────────────────────
  async function renderBadgeShowcase(containerId) {
    const el      = document.getElementById(containerId);
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!el || !profile) return;

    const allBadges = window.TSA.services.xp.BADGES;
    el.innerHTML = `
      <div class="clabel">My Badges</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px">
        ${Object.entries(allBadges).map(([key, badge]) => {
          const earned = (profile.badges || []).includes(key);
          return `
            <div style="text-align:center;padding:14px 8px;border-radius:11px;border:1.5px solid ${earned ? 'var(--cyan)' : 'var(--border)'};background:${earned ? '#F0FDFB' : 'var(--slate)'};opacity:${earned ? 1 : .45};transition:all .2s" title="${badge.label}">
              <div style="font-size:26px;margin-bottom:5px">${earned ? badge.emoji : '🔒'}</div>
              <div style="font-size:10px;font-weight:700;color:${earned ? 'var(--navy)' : 'var(--muted)'};line-height:1.3">${badge.label}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // ── XP milestone toast ─────────────────────────────────────────────────────
  function showMilestoneToast(milestone) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
      background:linear-gradient(135deg,var(--navy),var(--navy2));
      border:1px solid var(--cyan);border-radius:14px;padding:14px 22px;
      display:flex;align-items:center;gap:12px;z-index:400;
      box-shadow:0 8px 32px rgba(0,0,0,.3);animation:slideUp .3s ease;
      min-width:280px;max-width:380px;
    `;
    toast.innerHTML = `
      <span style="font-size:30px">${milestone.emoji}</span>
      <div>
        <div style="font-family:'Fredoka One',cursive;font-size:17px;color:#fff">${milestone.label} unlocked!</div>
        <div style="font-size:12px;color:rgba(255,255,255,.55);margin-top:2px">${milestone.xp} XP milestone reached</div>
      </div>
      <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;color:rgba(255,255,255,.4);font-size:18px;cursor:pointer">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast?.remove(), 5000);
  }

  // ── Hook into XP engine to auto-show milestone toasts ─────────────────────
  function _hookMilestones() {
    const origAddXP = window.TSA.services.xp.addXP.bind(window.TSA.services.xp);
    window.TSA.services.xp.addXP = async (eventKey, override) => {
      const result = await origAddXP(eventKey, override);
      if (result.newBadges?.length) {
        for (const badge of result.newBadges) {
          const milestone = window.TSA.services.xp.MILESTONES.find(m => m.badge === badge);
          if (milestone) setTimeout(() => showMilestoneToast(milestone), 800);
        }
      }
      return result;
    };
  }

  // ── Wire dashboard daily card ──────────────────────────────────────────────
  function wireDashboard() {
    // Replace static daily challenge card in dashboard with dynamic one
    const card = document.querySelector('.c-daily');
    if (card) {
      card.id = 'dailyChallengeCard';
      renderDailyCard('dailyChallengeCard');
    }
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  async function init() {
    _hookMilestones();
    await showReturnBannerIfNeeded();
    wireDashboard();
  }

  // Hook into dashboard route to wire live daily challenge
  if (window.TSA) {
    const origDash = window.TSA.routes['dashboard'];
    window.TSA.routes['dashboard'] = () => {
      if (origDash) origDash();
      setTimeout(() => {
        wireDashboard();
        showReturnBannerIfNeeded();
      }, 100);
    };
  }

  return {
    CHALLENGE_POOL, getTodaysChallenge, checkReturn,
    showReturnBannerIfNeeded, renderDailyCard, renderBadgeShowcase,
    startDailyChallenge, completeDailyChallenge, skipDailyChallenge,
    showMilestoneToast, init,
  };
})();

window.TSAEngagement = TSAEngagement;
