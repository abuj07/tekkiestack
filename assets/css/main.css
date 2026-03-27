/*
 * TekkieStack 2.0 — Main Stylesheet
 * Design System: Friendly-technical. Warm confidence without being childish.
 * Palette:   Navy #0F1F3D | Cyan #00C9B1 | Coral #FF6B6B | Amber #FFB347 | Cream #F8F5F0
 * Fonts:     Fredoka One (headings) | DM Sans (body) | JetBrains Mono (code)
 * Author:    Aperintel Ltd
 */

/* ── Google Fonts ────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap');

/* ── Design Tokens ───────────────────────────────────────────────────────── */
:root {
  /* Colours */
  --navy:    #0F1F3D;
  --navy2:   #1A3260;
  --navy3:   #243A70;
  --cyan:    #00C9B1;
  --cyan2:   #00A896;
  --cyan3:   #80E8DE;
  --coral:   #FF6B6B;
  --amber:   #FFB347;
  --amber2:  #FF9500;
  --cream:   #F8F5F0;
  --slate:   #E8EDF5;
  --card:    #FFFFFF;
  --ink:     #1A2540;
  --muted:   #6B7A99;
  --border:  #D8E0EE;
  --green:   #2EC4B6;
  --green-l: #EDFDF8;
  --purple:  #6C63FF;

  /* Shape */
  --r:    14px;
  --r-lg: 22px;
  --r-sm: 8px;

  /* Shadows */
  --sh-sm: 0 2px 14px rgba(15,31,61,0.08);
  --sh-md: 0 6px 30px rgba(15,31,61,0.13);
  --sh-lg: 0 20px 60px rgba(15,31,61,0.20);

  /* Nav */
  --nav-h: 62px;
}

/* ── Reset ────────────────────────────────────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--cream);
  color: var(--ink);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Heading font */
h1, h2, h3, h4,
.brand, .phase-name, .stat-num,
.celeb-title, .ob-title, .modal-title,
.tip-card-title, .daily-title,
.streak-big { font-family: 'Fredoka One', cursive; }

/* Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--slate); }
::-webkit-scrollbar-thumb { background: var(--cyan2); border-radius: 3px; }

/* ── Offline Banner ───────────────────────────────────────────────────────── */
#offlineBanner {
  display: none;
  position: fixed;
  top: var(--nav-h);
  left: 0; right: 0;
  background: var(--amber2);
  color: var(--navy);
  font-size: 13px;
  font-weight: 700;
  padding: 8px 20px;
  text-align: center;
  z-index: 90;
  animation: slideDown .3s ease;
}
#offlineBanner.show { display: block; }
@keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }

/* ── Navigation ───────────────────────────────────────────────────────────── */
.nav {
  background: var(--navy);
  height: var(--nav-h);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 4px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 24px rgba(0,0,0,0.28);
}
.nav-brand {
  display: flex; align-items: center; gap: 9px;
  text-decoration: none; margin-right: 10px; flex-shrink: 0;
  cursor: pointer;
}
.nav-logo {
  width: 34px; height: 34px;
  border-radius: 8px; object-fit: cover;
  box-shadow: 0 2px 10px rgba(0,201,177,0.3);
}
.nav-brand-text {
  font-family: 'Fredoka One', cursive;
  font-size: 20px; color: #fff; letter-spacing: 0.2px;
}
.nav-brand-text span { color: var(--cyan); }
.nav-tabs { display: flex; gap: 2px; flex: 1; overflow-x: auto; }
.nav-tabs::-webkit-scrollbar { height: 0; }
.nb {
  padding: 7px 13px; border-radius: 8px;
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
  color: rgba(255,255,255,.6); background: transparent; border: none;
  cursor: pointer; transition: all .18s; white-space: nowrap;
}
.nb:hover { background: rgba(255,255,255,.1); color: #fff; }
.nb.on   { background: rgba(0,201,177,.18); color: var(--cyan); }
.nav-right { display: flex; align-items: center; gap: 9px; margin-left: auto; flex-shrink: 0; }
.xp-pill {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,.07); border-radius: 20px; padding: 5px 13px;
}
.xp-track { width: 68px; height: 7px; background: rgba(255,255,255,.15); border-radius: 4px; overflow: hidden; }
.xp-fill {
  height: 100%; border-radius: 4px;
  background: linear-gradient(90deg, var(--cyan), var(--amber));
  transition: width .7s cubic-bezier(.4,0,.2,1);
}
.xp-num { font-size: 12px; font-weight: 700; color: var(--amber); }
.streak-tag { font-size: 13px; font-weight: 700; color: var(--coral); }
.nav-chip {
  display: flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
  border-radius: 20px; padding: 5px 12px 5px 5px; cursor: pointer; transition: all .2s;
}
.nav-chip:hover { background: rgba(255,255,255,.14); }
.nav-chip .c-av { font-size: 19px; }
.nav-chip .c-name { font-size: 13px; font-weight: 600; color: #fff; }
.nav-chip .c-xp  { font-size: 11px; color: var(--cyan); font-weight: 700; }
.end-btn {
  background: rgba(255,107,107,.18); border: 1px solid rgba(255,107,107,.4);
  color: #FFB3B3; font-size: 12px; font-weight: 700; padding: 6px 12px;
  border-radius: 8px; cursor: pointer; transition: all .2s;
  font-family: 'DM Sans', sans-serif;
}
.end-btn:hover { background: rgba(255,107,107,.4); color: #fff; }

/* ── Screens ─────────────────────────────────────────────────────────────── */
.screen { display: none; animation: sIn .26s ease; }
.screen.on { display: block; }
@keyframes sIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

/* ── Overlays & Modals ───────────────────────────────────────────────────── */
.overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(10,20,40,.78); backdrop-filter: blur(7px);
  z-index: 200; align-items: center; justify-content: center;
}
.overlay.show { display: flex; }
.modal {
  background: #fff; border-radius: var(--r-lg);
  padding: 38px 34px; max-width: 330px; width: 100%;
  text-align: center; box-shadow: var(--sh-lg);
  animation: pop .3s cubic-bezier(.34,1.56,.64,1); position: relative;
}
@keyframes pop { from { transform: scale(.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.modal-avatar { font-size: 54px; display: block; margin-bottom: 10px; }
.modal-title  { font-size: 23px; color: var(--navy); margin-bottom: 4px; }
.modal-sub    { font-size: 14px; color: var(--muted); margin-bottom: 22px; font-weight: 500; }

/* PIN dots */
.pin-dots { display: flex; justify-content: center; gap: 11px; margin-bottom: 22px; }
.pd { width: 15px; height: 15px; border-radius: 50%; border: 2px solid var(--border); transition: all .16s; }
.pd.on  { background: var(--navy); border-color: var(--navy); transform: scale(1.1); }
.pd.err { background: var(--coral); border-color: var(--coral); animation: shk .35s; }
@keyframes shk { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }

/* Numpad */
.numpad { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; max-width: 200px; margin: 0 auto 14px; }
.npb {
  aspect-ratio: 1; border-radius: 11px; border: 1.5px solid var(--border);
  font-family: 'Fredoka One', cursive; font-size: 21px; color: var(--navy);
  background: #fff; cursor: pointer; transition: all .14s;
}
.npb:hover { background: var(--slate); border-color: var(--cyan); }
.npb:active { transform: scale(.91); }
.npb.del { font-size: 15px; font-family: 'DM Sans', sans-serif; color: var(--muted); }
.pin-err { font-size: 13px; color: var(--coral); font-weight: 600; min-height: 17px; margin-bottom: 10px; }
.modal-link { font-size: 12px; color: var(--muted); cursor: pointer; text-decoration: underline; }

/* ── Buttons ─────────────────────────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 19px; border-radius: 10px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
  cursor: pointer; border: none; transition: all .17s; text-decoration: none;
}
.btn-cy { background: var(--cyan); color: var(--navy); }
.btn-cy:hover { background: var(--cyan2); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,201,177,.35); }
.btn-nv { background: var(--navy); color: #fff; }
.btn-nv:hover { background: var(--navy2); }
.btn-co { background: var(--coral); color: #fff; }
.btn-co:hover { background: #e85555; }
.btn-gh { background: transparent; border: 1.5px solid var(--border); color: var(--ink); }
.btn-gh:hover { border-color: var(--cyan); color: var(--cyan); }
.btn-am { background: var(--amber); color: var(--navy); }
.btn-am:hover { filter: brightness(.93); }
.btn-pu { background: var(--purple); color: #fff; }
.btn-full { width: 100%; justify-content: center; font-size: 15px; padding: 13px 18px; }
.btn:disabled { opacity: .45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
.brow { display: flex; gap: 9px; flex-wrap: wrap; }

/* ── Cards ───────────────────────────────────────────────────────────────── */
.card { background: var(--card); border-radius: var(--r-lg); padding: 22px; box-shadow: var(--sh-sm); border: 1px solid var(--border); }
.clabel { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); margin-bottom: 13px; }

/* ── Profile Picker ──────────────────────────────────────────────────────── */
.picker {
  min-height: calc(100vh - var(--nav-h));
  background: var(--navy);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 36px 20px; position: relative; overflow: hidden;
}
.picker::before {
  content: ''; position: absolute;
  width: 560px; height: 560px;
  background: radial-gradient(circle, rgba(0,201,177,.1) 0%, transparent 70%);
  top: -100px; right: -80px; pointer-events: none;
}
.picker::after {
  content: ''; position: absolute;
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(255,107,107,.07) 0%, transparent 70%);
  bottom: -60px; left: -60px; pointer-events: none;
}
.picker-logo { width: 70px; height: 70px; border-radius: 16px; margin-bottom: 14px; box-shadow: 0 8px 32px rgba(0,201,177,.28); }
.picker-title { font-family: 'Fredoka One', cursive; font-size: 32px; color: #fff; margin-bottom: 5px; }
.picker-sub { font-size: 14px; color: rgba(255,255,255,.5); margin-bottom: 36px; font-weight: 500; transition: color .2s; }
.profiles-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(148px,1fr));
  gap: 14px; max-width: 680px; width: 100%; margin-bottom: 18px; position: relative; z-index: 1;
}
.profile-card {
  background: rgba(255,255,255,.06); border: 1.5px solid rgba(255,255,255,.1);
  border-radius: var(--r-lg); padding: 26px 14px 18px; text-align: center;
  cursor: pointer; transition: all .22s cubic-bezier(.4,0,.2,1);
  backdrop-filter: blur(8px);
}
.profile-card:hover { background: rgba(0,201,177,.12); border-color: var(--cyan); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,201,177,.2); }
.profile-card .pav { font-size: 50px; display: block; margin-bottom: 10px; }
.profile-card .pnm { font-family: 'Fredoka One', cursive; font-size: 19px; color: #fff; margin-bottom: 3px; }
.profile-card .pmt { font-size: 12px; color: rgba(255,255,255,.5); margin-bottom: 8px; font-weight: 500; }
.profile-card .pxp { display: inline-flex; align-items: center; gap: 4px; background: rgba(0,201,177,.15); color: var(--cyan); font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }
.add-card {
  background: rgba(255,255,255,.04); border: 1.5px dashed rgba(255,255,255,.18);
  border-radius: var(--r-lg); padding: 26px 14px 18px; text-align: center;
  cursor: pointer; transition: all .22s; position: relative; z-index: 1;
}
.add-card:hover { border-color: var(--cyan); background: rgba(0,201,177,.06); }
.add-card .ai- { font-size: 38px; color: rgba(255,255,255,.3); display: block; margin-bottom: 10px; }
.add-card .al  { font-size: 13px; font-weight: 600; color: rgba(255,255,255,.4); }
.picker-ft { font-size: 12px; color: rgba(255,255,255,.28); position: relative; z-index: 1; }
.picker-tip-nudge {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,179,71,.1); border: 1px solid rgba(255,179,71,.25);
  border-radius: 12px; padding: 10px 18px; margin-top: 14px;
  cursor: pointer; transition: all .2s; position: relative; z-index: 1;
}
.picker-tip-nudge:hover { background: rgba(255,179,71,.18); border-color: rgba(255,179,71,.5); }
.picker-tip-nudge span { font-size: 13px; color: rgba(255,255,255,.75); font-weight: 600; }
.picker-tip-nudge strong { color: var(--amber); }

/* ── Dashboard Grid ──────────────────────────────────────────────────────── */
.dgrid { max-width: 1100px; margin: 0 auto; padding: 26px 18px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.c-welcome { grid-column: 1/3; background: linear-gradient(130deg,var(--navy),var(--navy2)); color: #fff; border: none; position: relative; overflow: hidden; }
.c-welcome::after { content:''; position:absolute; width:260px; height:260px; border-radius:50%; background:rgba(0,201,177,.07); right:-50px; top:-70px; pointer-events:none; }
.c-welcome .clabel { color: rgba(255,255,255,.5); }
.c-welcome h2 { font-size: 25px; margin-bottom: 5px; }
.c-welcome p { font-size: 13px; opacity:.75; margin-bottom: 18px; line-height: 1.55; }
.c-streak { background: linear-gradient(135deg,#FF6B6B,#FF8E53); border: none; color: #fff; }
.c-streak .clabel { color: rgba(255,255,255,.65); }
.streak-big { font-size: 58px; line-height: 1; }
.streak-sub { font-size: 13px; opacity:.85; margin-top: 2px; }
.streak-b   { font-size: 11px; opacity:.62; margin-top: 7px; }
.c-daily { grid-column: 1/3; }
.dbadge { display:inline-flex; align-items:center; gap:4px; background:rgba(255,179,71,.15); color:#B06000; font-size:10px; font-weight:800; padding:3px 8px; border-radius:20px; margin-bottom:9px; text-transform:uppercase; letter-spacing:.7px; }
.daily-title { font-size: 20px; color: var(--navy); margin-bottom: 4px; }
.daily-desc  { font-size: 13px; color: var(--muted); margin-bottom: 13px; line-height: 1.5; font-weight: 500; }
.mtags { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:14px; }
.mtag  { font-size:11px; font-weight:700; padding:3px 9px; border-radius:20px; background:var(--slate); color:var(--muted); }
.c-phases { grid-column:3; grid-row:1/4; }
.phase-item { display:flex; align-items:center; gap:11px; padding:10px; border-radius:11px; cursor:pointer; transition:all .17s; border:1.5px solid transparent; margin-bottom:7px; }
.phase-item:hover { background:var(--slate); border-color:var(--cyan); }
.phase-item.done { background:#EDFDF8; border-color:var(--green); }
.phase-item.cur  { background:#EFF4FF; border-color:var(--purple); }
.phase-item.locked { opacity:.4; cursor:not-allowed; }
.pib { width:38px; height:38px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
.phase-name { font-size: 13px; color: var(--navy); }
.phase-sub  { font-size: 11px; color: var(--muted); font-weight: 500; margin-top: 1px; }
.pchip { margin-left:auto; font-size:10px; font-weight:800; padding:2px 7px; border-radius:9px; flex-shrink:0; }
.ch-d { background:#D0F5EC; color:#0A6E56; }
.ch-c { background:#E8E6FF; color:#4A40CC; }
.ch-l { background:var(--slate); color:var(--muted); }
.c-projs { grid-column: 1/3; }
.projects-grid { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
.proj-card { border:1.5px solid var(--border); border-radius:11px; overflow:hidden; cursor:pointer; transition:all .19s; }
.proj-card:hover { border-color:var(--cyan); box-shadow:0 4px 20px rgba(0,201,177,.15); transform:translateY(-2px); }
.proj-thumb { height:66px; display:flex; align-items:center; justify-content:center; font-size:25px; }
.proj-info  { padding:8px 11px; }
.proj-name  { font-size:13px; font-weight:700; color:var(--navy); }
.proj-date  { font-size:11px; color:var(--muted); margin-top:2px; }
.proj-add { border:1.5px dashed var(--border); border-radius:11px; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:108px; cursor:pointer; transition:all .19s; background:var(--cream); }
.proj-add:hover { border-color:var(--cyan); background:#fff; }

/* ── Code Editor ─────────────────────────────────────────────────────────── */
.escreen { max-width: 1100px; margin: 0 auto; padding: 26px 18px; }
.eheader { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; flex-wrap:wrap; gap:10px; }
.elayout { display:grid; grid-template-columns:1fr 1fr; gap:16px; height:495px; }
.code-pane { background:#0D1B2E; border-radius:var(--r-lg); overflow:hidden; display:flex; flex-direction:column; }
.pane-bar  { padding:10px 14px; display:flex; align-items:center; gap:7px; border-bottom:1px solid rgba(255,255,255,.07); }
.pane-dot  { width:9px; height:9px; border-radius:50%; }
.pane-label { font-size:12px; font-weight:600; color:rgba(255,255,255,.4); margin-left:3px; font-family:'JetBrains Mono',monospace; }
.code-textarea { flex:1; padding:14px; font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.75; color:#CDD9F0; background:transparent; border:none; outline:none; resize:none; width:100%; }
.preview-pane { background:#fff; border-radius:var(--r-lg); overflow:hidden; display:flex; flex-direction:column; border:1.5px solid var(--border); }
.preview-bar  { padding:9px 13px; background:var(--slate); border-bottom:1px solid var(--border); display:flex; align-items:center; gap:7px; }
.url-pill { flex:1; background:#fff; border:1px solid var(--border); border-radius:5px; padding:3px 9px; font-size:12px; color:var(--muted); }
.live-badge { font-size:11px; font-weight:700; color:var(--green); }
.preview-frame { flex:1; border:none; width:100%; }
.hint-bar { margin-top:13px; background:#FFFBEB; border:1px solid #FDE68A; border-radius:9px; padding:12px 14px; display:flex; align-items:flex-start; gap:9px; }
.hint-text { font-size:13px; color:#92400E; font-weight:600; line-height:1.5; flex:1; }
.step-row { background:#fff; border-radius:9px; padding:12px 14px; margin-top:13px; display:flex; align-items:center; gap:12px; border:1px solid var(--border); }
.step-dots { display:flex; gap:4px; }
.step-dot   { width:8px; height:8px; border-radius:50%; background:var(--border); transition:background .3s; }
.step-dot.d { background:var(--green); }
.step-dot.c { background:var(--cyan); box-shadow:0 0 0 3px rgba(0,201,177,.2); }

/* ── Typing Trainer ──────────────────────────────────────────────────────── */
.tscreen { max-width: 880px; margin: 0 auto; padding: 26px 18px; }
.thead { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:10px; }
.ttitle { font-family:'Fredoka One',cursive; font-size:23px; color:var(--navy); }
.tsub   { font-size:13px; color:var(--muted); margin-top:2px; font-weight:500; }
.stats-row { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px; }
.sbox { background:var(--card); border-radius:11px; padding:13px 16px; border:1px solid var(--border); text-align:center; flex:1; min-width:80px; }
.stat-num { font-size:26px; color:var(--navy); }
.slbl { font-size:10px; color:var(--muted); font-weight:700; text-transform:uppercase; letter-spacing:.8px; margin-top:2px; }
.sbox.hl { background:var(--navy); border-color:var(--navy); }
.sbox.hl .stat-num { color:var(--cyan); }
.sbox.hl .slbl { color:rgba(255,255,255,.45); }
.kb-wrap { background:var(--navy); border-radius:var(--r-lg); padding:18px 16px; margin-bottom:18px; }
.kb-row { display:flex; justify-content:center; gap:5px; margin-bottom:5px; }
.kk { min-width:36px; height:38px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); border-radius:6px; display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:600; color:rgba(255,255,255,.65); transition:all .1s; padding:0 6px; }
.kk.w2 { min-width:54px; }
.kk.w3 { min-width:70px; }
.kk.sp { min-width:200px; }
.kk.next { background:var(--cyan); color:var(--navy); border-color:var(--cyan); box-shadow:0 0 14px rgba(0,201,177,.5); transform:scale(1.07); }
.kk.ok   { background:#2EC4B6; color:#fff; border-color:#2EC4B6; }
.kk.bad  { background:var(--coral); color:#fff; border-color:var(--coral); animation:ks .22s; }
.kk.home-row { border-bottom:3px solid var(--amber); }
@keyframes ks { 0%,100%{transform:translateX(0)} 30%{transform:translateX(-3px)} 70%{transform:translateX(3px)} }
.kb-legend { display:flex; gap:14px; justify-content:center; margin-top:10px; flex-wrap:wrap; }
.kbl { display:flex; align-items:center; gap:5px; font-size:11px; color:rgba(255,255,255,.45); font-weight:600; }
.kbd { width:9px; height:9px; border-radius:2px; }
.typing-prompt { background:#fff; border:1.5px solid var(--border); border-radius:var(--r-lg); padding:22px; font-family:'JetBrains Mono',monospace; font-size:19px; line-height:1.9; margin-bottom:14px; min-height:75px; cursor:text; }
.ch.ck { color:var(--green); }
.ch.ce { color:var(--coral); text-decoration:underline; }
.ch.cc { background:var(--navy); color:#fff; border-radius:2px; animation:cur 1s infinite; padding:0 1px; }
@keyframes cur { 0%,100%{opacity:1} 50%{opacity:0} }
.typing-hidden { position:absolute; opacity:0; pointer-events:none; width:1px; height:1px; }
.level-controls { display:flex; gap:9px; align-items:center; flex-wrap:wrap; }
.level-pills { display:flex; gap:5px; flex-wrap:wrap; }
.lp { padding:5px 13px; border-radius:20px; font-size:12px; font-weight:700; background:var(--slate); color:var(--muted); cursor:pointer; border:1.5px solid transparent; transition:all .17s; font-family:'DM Sans',sans-serif; }
.lp.on { background:var(--navy); color:var(--cyan); border-color:var(--navy); }
.lp:hover:not(.on) { border-color:var(--cyan); color:var(--cyan); }

/* ── Onboarding ───────────────────────────────────────────────────────────── */
.ob-screen { min-height:calc(100vh - var(--nav-h)); background:var(--navy); display:flex; align-items:center; justify-content:center; padding:28px 18px; position:relative; overflow:hidden; }
.ob-screen::before { content:''; position:absolute; width:480px; height:480px; background:radial-gradient(circle,rgba(0,201,177,.09) 0%,transparent 70%); top:-100px; right:-100px; pointer-events:none; }
.ob-card { background:#fff; border-radius:22px; padding:40px 32px; max-width:440px; width:100%; box-shadow:0 22px 80px rgba(0,0,0,.3); text-align:center; position:relative; z-index:1; animation:pop .28s cubic-bezier(.34,1.56,.64,1); }
.ob-step { font-size:10px; font-weight:800; color:var(--cyan2); text-transform:uppercase; letter-spacing:1.2px; margin-bottom:9px; }
.ob-title { font-size:26px; color:var(--navy); margin-bottom:5px; }
.ob-desc { font-size:14px; color:var(--muted); margin-bottom:24px; line-height:1.55; font-weight:500; }
.ob-input { width:100%; padding:14px 16px; border:1.5px solid var(--border); border-radius:11px; font-family:'Fredoka One',cursive; font-size:19px; text-align:center; outline:none; margin-bottom:12px; transition:border-color .2s; }
.ob-input:focus { border-color:var(--cyan); }
.avatar-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:7px; margin-bottom:20px; }
.av-btn { aspect-ratio:1; border-radius:9px; border:1.5px solid var(--border); font-size:23px; cursor:pointer; background:#fff; transition:all .17s; display:flex; align-items:center; justify-content:center; }
.av-btn:hover { border-color:var(--cyan); background:var(--slate); }
.av-btn.sel { border-color:var(--cyan); background:#F0FDFB; transform:scale(1.1); }
.year-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; margin-bottom:20px; }
.yr-btn { aspect-ratio:1; border-radius:9px; border:1.5px solid var(--border); font-size:12px; font-weight:800; cursor:pointer; background:#fff; transition:all .17s; display:flex; align-items:center; justify-content:center; font-family:'DM Sans',sans-serif; color:var(--ink); }
.yr-btn:hover { border-color:var(--cyan); }
.yr-btn.sel { background:var(--navy); color:var(--cyan); border-color:var(--navy); }
.pin-setup-row { display:flex; justify-content:center; gap:9px; margin-bottom:14px; }
.pin-box { width:50px; height:56px; border:1.5px solid var(--border); border-radius:11px; text-align:center; font-family:'Fredoka One',cursive; font-size:23px; outline:none; transition:border-color .2s; }
.pin-box:focus { border-color:var(--cyan); }
.starter-editor { background:#0D1B2E; border-radius:11px; overflow:hidden; margin-bottom:12px; }
.starter-bar { padding:8px 13px; border-bottom:1px solid rgba(255,255,255,.07); display:flex; gap:5px; }
.st-dot { width:8px; height:8px; border-radius:50%; }
.starter-input { width:100%; padding:13px; font-family:'JetBrains Mono',monospace; font-size:13px; background:transparent; border:none; outline:none; color:#A5F3FC; }
.starter-preview { background:#fff; border-radius:11px; padding:16px; margin-bottom:12px; border:1.5px solid var(--border); min-height:62px; text-align:left; font-family:'Fredoka One',cursive; font-size:22px; color:var(--navy); }
.live-indicator { display:inline-flex; align-items:center; gap:5px; font-size:11px; color:var(--green); font-weight:700; margin-bottom:7px; }
.live-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation:pulse 1.5s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

/* ── Celebration ──────────────────────────────────────────────────────────── */
.celeb-overlay { display:none; position:fixed; inset:0; background:rgba(10,20,40,.72); backdrop-filter:blur(6px); z-index:300; align-items:center; justify-content:center; }
.celeb-overlay.show { display:flex; }
.celeb-card { background:#fff; border-radius:22px; padding:40px 32px; max-width:340px; width:100%; text-align:center; box-shadow:var(--sh-lg); animation:pop .32s cubic-bezier(.34,1.56,.64,1); position:relative; overflow:hidden; }
.celeb-title { font-size:26px; color:var(--navy); margin-bottom:5px; }
.celeb-em   { font-size:68px; display:block; margin-bottom:13px; animation:bnc .55s ease .25s both; }
.celeb-sub  { font-size:14px; color:var(--muted); margin-bottom:18px; font-weight:500; }
.celeb-xp   { font-family:'Fredoka One',cursive; font-size:26px; color:var(--cyan); margin-bottom:20px; }
@keyframes bnc { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
.confetti { position:absolute; border-radius:2px; animation:cf 1.3s ease forwards; }
@keyframes cf { from{transform:translateY(-8px) rotate(0deg);opacity:1} to{transform:translateY(270px) rotate(600deg);opacity:0} }

/* ── Footer ───────────────────────────────────────────────────────────────── */
.site-footer { background:#080F1F; padding:0; border-top:1px solid rgba(255,255,255,.06); }
.footer-main { display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:36px; padding:36px 32px 28px; max-width:1100px; margin:0 auto; }
.footer-col-brand .footer-logo-wrap { display:flex; align-items:center; gap:9px; margin-bottom:12px; }
.footer-logo-img { width:30px; height:30px; border-radius:7px; object-fit:cover; }
.footer-brand-name { font-family:'Fredoka One',cursive; font-size:18px; color:#fff; }
.footer-brand-name span { color:var(--cyan); }
.footer-tagline { font-size:13px; color:rgba(255,255,255,.45); line-height:1.6; font-weight:500; margin-bottom:14px; }
.footer-aperintel { font-size:11px; color:rgba(255,255,255,.25); font-weight:500; line-height:1.6; }
.footer-col h4 { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1.1px; color:rgba(255,255,255,.35); margin-bottom:12px; }
.footer-col a { display:block; font-size:13px; color:rgba(255,255,255,.5); font-weight:500; margin-bottom:7px; cursor:pointer; text-decoration:none; transition:color .16s; }
.footer-col a:hover { color:var(--cyan); }
.footer-bottom { border-top:1px solid rgba(255,255,255,.06); padding:14px 32px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; max-width:1100px; margin:0 auto; }
.footer-copy-text { font-size:11px; color:rgba(255,255,255,.25); font-weight:500; }
.footer-legal-links { display:flex; gap:18px; }
.footer-legal-links a { font-size:11px; color:rgba(255,255,255,.35); cursor:pointer; font-weight:600; text-decoration:none; transition:color .16s; }
.footer-legal-links a:hover { color:var(--cyan); }

/* ── Cookie Banner ───────────────────────────────────────────────────────── */
.cookie-banner { position:fixed; bottom:0; left:0; right:0; background:var(--navy); border-top:1px solid rgba(0,201,177,.3); padding:14px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; z-index:500; flex-wrap:wrap; animation:slideUp .3s ease; }
@keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
.cookie-banner.hidden { display:none; }
.cookie-banner p { font-size:13px; color:rgba(255,255,255,.75); font-weight:500; flex:1; min-width:200px; }
.cookie-banner p a { color:var(--cyan); cursor:pointer; font-weight:700; }
.cookie-banner-btns { display:flex; gap:8px; flex-shrink:0; }

/* ── Legal Pages ─────────────────────────────────────────────────────────── */
.legal-screen { max-width:820px; margin:0 auto; padding:40px 24px 60px; }
.legal-hero { text-align:center; margin-bottom:36px; padding-bottom:28px; border-bottom:1px solid var(--border); }
.legal-badge { display:inline-flex; align-items:center; gap:6px; background:var(--slate); color:var(--muted); font-size:11px; font-weight:700; padding:4px 12px; border-radius:20px; margin-bottom:12px; text-transform:uppercase; letter-spacing:.8px; }
.legal-hero h1 { font-family:'Fredoka One',cursive; font-size:34px; color:var(--navy); margin-bottom:8px; }
.legal-date { font-size:13px; color:var(--muted); font-weight:500; }
.legal-toc { background:var(--slate); border-radius:var(--r); padding:20px 24px; margin-bottom:32px; }
.legal-toc-title { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--muted); margin-bottom:10px; }
.legal-toc a { display:block; font-size:13px; color:var(--navy); font-weight:600; padding:3px 0; text-decoration:none; transition:color .15s; }
.legal-toc a:hover { color:var(--cyan); }
.legal-section { margin-bottom:32px; }
.legal-section h2 { font-family:'Fredoka One',cursive; font-size:20px; color:var(--navy); margin-bottom:10px; padding-top:8px; scroll-margin-top:80px; }
.legal-section h3 { font-size:14px; font-weight:700; color:var(--navy); margin-bottom:6px; margin-top:16px; }
.legal-section p  { font-size:14px; color:#374151; line-height:1.75; margin-bottom:10px; }
.legal-section ul { margin:0 0 10px 20px; }
.legal-section ul li { font-size:14px; color:#374151; line-height:1.75; margin-bottom:4px; }
.legal-highlight { background:linear-gradient(135deg,rgba(0,201,177,.06),rgba(0,201,177,.02)); border-left:3px solid var(--cyan); border-radius:0 10px 10px 0; padding:14px 18px; margin:16px 0; }
.legal-warn { background:#FFF8EC; border-left:3px solid var(--amber); border-radius:0 10px 10px 0; padding:14px 18px; margin:16px 0; }
.legal-warn p { margin:0; font-size:13.5px; color:#7C4B00; }
.legal-contact-card { background:var(--navy); border-radius:var(--r-lg); padding:28px; margin-top:28px; text-align:center; }
.legal-contact-card h3 { font-family:'Fredoka One',cursive; font-size:20px; color:#fff; margin-bottom:6px; }
.legal-contact-card p  { font-size:14px; color:rgba(255,255,255,.65); margin-bottom:16px; }
.legal-contact-card a  { color:var(--cyan); font-weight:700; text-decoration:none; }

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width:768px) {
  .dgrid { grid-template-columns:1fr; }
  .c-welcome,.c-daily,.c-projs { grid-column:1; }
  .c-phases { grid-column:1; grid-row:auto; }
  .elayout { grid-template-columns:1fr; height:auto; }
  .nav-tabs { display:none; }
  .profiles-grid { grid-template-columns:repeat(2,1fr); }
  .footer-main { grid-template-columns:1fr 1fr; gap:24px; padding:28px 20px 20px; }
  .footer-bottom { padding:12px 20px; }
  .footer-col-brand { grid-column:1/3; }
}
@media (max-width:480px) {
  .footer-main { grid-template-columns:1fr; }
  .footer-col-brand { grid-column:1; }
}

/* ── WCAG 2.1 AA Accessibility (Stage 12) ──────────────────────────────── */

/* Skip to content link — visible only on keyboard focus */
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: var(--cyan);
  color: var(--navy);
  font-weight: 700;
  font-size: 14px;
  padding: 10px 18px;
  border-radius: 0 0 10px 10px;
  text-decoration: none;
  z-index: 9999;
  transition: top .15s;
}
.skip-link:focus { top: 0; }

/* Global focus-visible ring — keyboard nav indicator */
:focus-visible {
  outline: 3px solid var(--cyan);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remove outline for mouse users only */
:focus:not(:focus-visible) { outline: none; }

/* Ensure buttons and interactive elements meet 44×44px touch target */
.nb, .btn, .npb, .av-btn, .yr-btn, .lp, .profile-card, .add-card {
  min-height: 44px;
}
.npb { min-width: 44px; }

/* High-contrast text for legal pages */
.legal-section p,
.legal-section li { color: #1F2937; }

/* Reduced motion — respect OS preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* PWA install banner */
.pwa-banner {
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--navy);
  border: 1px solid var(--cyan);
  border-radius: 14px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 13px;
  z-index: 490;
  box-shadow: var(--sh-lg);
  max-width: 380px;
  width: calc(100% - 32px);
  animation: slideUp .3s ease;
}
.pwa-banner.hidden { display: none; }
.pwa-banner-text { flex: 1; }
.pwa-banner-title { font-family: 'Fredoka One', cursive; font-size: 16px; color: #fff; }
.pwa-banner-sub   { font-size: 12px; color: rgba(255,255,255,.55); font-weight: 500; margin-top: 2px; }

/* Storage migration progress overlay */
.migration-overlay {
  position: fixed; inset: 0;
  background: var(--navy);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  z-index: 9999;
  gap: 16px;
}
.migration-overlay.hidden { display: none; }
.migration-bar-wrap { width: 220px; height: 8px; background: rgba(255,255,255,.1); border-radius: 4px; overflow: hidden; }
.migration-bar { height: 100%; background: var(--cyan); border-radius: 4px; transition: width .4s ease; }
