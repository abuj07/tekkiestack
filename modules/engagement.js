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
    {
      id: 'dc-007', title: 'Fix the Loop',
      desc: 'This loop should print numbers 1 to 5, but it\'s running forever! Find the bug.',
      tags: ['🐛 Debug', '⏱ 5 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:30px; }
    #output { background:#0D1B2E; padding:16px; border-radius:10px; margin-top:14px; font-size:15px; line-height:1.8; }
    button { background:#00C9B1; color:#0F1F3D; padding:12px 24px; border:none; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; }
  </style>
</head>
<body>
  <h2>🐛 Debug: Fix the Loop</h2>
  <p>Click "Run" — the page will freeze. Find the bug and fix it!</p>
  <button onclick="runLoop()">Run Loop</button>
  <div id="output"></div>
  <script>
    function runLoop() {
      let result = '';
      let i = 1;
      while (i <= 5) {
        result += 'Number: ' + i + '<br>';
        // BUG: i never increases!
      }
      document.getElementById('output').innerHTML = result;
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-008', title: 'Animate a Loading Bar',
      desc: 'Use CSS animations to make this loading bar fill from 0% to 100% over 2 seconds.',
      tags: ['🎨 CSS', '⏱ 10 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:sans-serif; color:#fff; }
    .bar-bg { width:320px; height:22px; background:rgba(255,255,255,.12); border-radius:11px; overflow:hidden; }
    .bar-fill {
      height:100%; width:0%; background:#00C9B1; border-radius:11px;
      /* TODO: Add a CSS animation that grows width from 0% to 100% over 2s, linear, infinite alternate */
    }
    /* TODO: Define the @keyframes for the animation above */
    p { margin-top:16px; font-size:14px; color:rgba(255,255,255,.6); }
  </style>
</head>
<body>
  <h2>Loading Bar</h2>
  <div class="bar-bg">
    <div class="bar-fill"></div>
  </div>
  <p>Animating...</p>
</body>
</html>`,
    },
    {
      id: 'dc-009', title: 'Build a Tip Calculator',
      desc: 'Complete the tip calculator — enter a bill amount and tip % to see the total.',
      tags: ['⚡ JS', '⏱ 10 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:40px; max-width:400px; margin:auto; }
    input { width:100%; padding:12px; margin:8px 0; border:1.5px solid #00C9B1; background:#0D1B2E; color:#fff; border-radius:8px; font-size:15px; box-sizing:border-box; }
    button { background:#00C9B1; color:#0F1F3D; padding:12px 24px; border:none; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; width:100%; margin-top:8px; }
    #result { background:#0D1B2E; padding:16px; border-radius:10px; margin-top:16px; font-size:16px; line-height:1.8; display:none; }
  </style>
</head>
<body>
  <h2>💰 Tip Calculator</h2>
  <label>Bill Amount (£)</label>
  <input type="number" id="bill" placeholder="e.g. 45.00" min="0">
  <label>Tip Percentage (%)</label>
  <input type="number" id="tipPct" placeholder="e.g. 15" min="0" max="100">
  <button onclick="calculate()">Calculate</button>
  <div id="result"></div>
  <script>
    function calculate() {
      const bill = parseFloat(document.getElementById('bill').value);
      const tip  = parseFloat(document.getElementById('tipPct').value);
      // TODO: Calculate the tip amount (bill * tip / 100)
      // TODO: Calculate the total (bill + tipAmount)
      // TODO: Show the result div with:
      //   "Tip: £X.XX"  and  "Total: £X.XX"
      //   Use .toFixed(2) to format the numbers
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-010', title: 'Fix the Broken Link',
      desc: 'The navigation links don\'t highlight when active. There are two CSS bugs — find them!',
      tags: ['🐛 Debug', '⏱ 6 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; font-family:sans-serif; margin:0; }
    nav { background:#0D1B2E; padding:14px 24px; display:flex; gap:20px; }
    nav a { color:rgba(255,255,255,.6); text-decoration:none; font-size:15px; font-weight:600; padding:8px 14px; border-radius:8px; }
    /* BUG 1: The selector below should target .active links but doesn't work */
    nav a.Active { color:#00C9B1; background:rgba(0,201,177,.12); }
    /* BUG 2: The hover state below has a typo */
    nav a:hovr { color:#fff; }
  </style>
</head>
<body>
  <nav>
    <a href="#" class="active">Home</a>
    <a href="#">Lessons</a>
    <a href="#">Projects</a>
    <a href="#">Profile</a>
  </nav>
  <div style="color:#fff;padding:30px">
    <p>Fix both CSS bugs above so the Home link highlights correctly and all links respond to hover.</p>
  </div>
</body>
</html>`,
    },
    {
      id: 'dc-011', title: 'Glassmorphism Card',
      desc: 'Style this card with the glassmorphism effect — frosted glass look with blur and transparency.',
      tags: ['🎨 CSS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
      background: linear-gradient(135deg, #667eea, #764ba2, #00C9B1);
      font-family:sans-serif;
    }
    .card {
      width:300px; padding:32px; border-radius:20px; color:#fff;
      /* TODO: Add these glassmorphism styles:
         - background: rgba(255,255,255, 0.15)
         - backdrop-filter: blur(12px)
         - border: 1px solid rgba(255,255,255,0.25)
         - box-shadow: 0 8px 32px rgba(0,0,0,0.2)
      */
    }
    h2 { margin-top:0; font-size:22px; }
    p { font-size:14px; opacity:0.85; line-height:1.6; }
    .btn { background:#fff; color:#764ba2; border:none; padding:10px 20px; border-radius:8px; font-weight:700; cursor:pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h2>✨ Glassmorphism</h2>
    <p>This card should look like frosted glass. Add the CSS to make it happen!</p>
    <button class="btn">Click me</button>
  </div>
</body>
</html>`,
    },
    {
      id: 'dc-012', title: 'Build a Random Quote Generator',
      desc: 'Every time the button is clicked, show a random quote from the array.',
      tags: ['⚡ JS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; text-align:center; padding:60px 30px; }
    .quote-box { background:#0D1B2E; border-left:4px solid #00C9B1; padding:24px; border-radius:12px; max-width:500px; margin:0 auto 24px; }
    blockquote { font-size:18px; line-height:1.7; margin:0 0 10px; font-style:italic; }
    cite { font-size:13px; color:rgba(255,255,255,.5); }
    button { background:#00C9B1; color:#0F1F3D; border:none; padding:12px 28px; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; }
  </style>
</head>
<body>
  <h2>💬 Random Quote Generator</h2>
  <div class="quote-box">
    <blockquote id="quoteText">Press the button to get a quote!</blockquote>
    <cite id="quoteAuthor"></cite>
  </div>
  <button onclick="newQuote()">New Quote</button>
  <script>
    const quotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Code is like humour. When you have to explain it, it's bad.", author: "Cory House" },
      { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
      { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
      { text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
    ];
    function newQuote() {
      // TODO: Pick a random quote from the quotes array
      // HINT: Use Math.floor(Math.random() * quotes.length)
      // TODO: Update #quoteText with the quote's text
      // TODO: Update #quoteAuthor with "— " + the author's name
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-013', title: 'Fix the Array Crash',
      desc: 'This code crashes with a TypeError. Find the bug that\'s causing it!',
      tags: ['🐛 Debug', '⏱ 5 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:30px; }
    #output { background:#0D1B2E; padding:16px; border-radius:10px; margin-top:14px; font-size:15px; }
    button { background:#00C9B1; color:#0F1F3D; padding:12px 24px; border:none; border-radius:8px; font-weight:700; cursor:pointer; }
  </style>
</head>
<body>
  <h2>🐛 Debug: Fix the Array Crash</h2>
  <button onclick="showFavourites()">Show Favourites</button>
  <div id="output">Click the button...</div>
  <script>
    const user = {
      name: 'Alex',
      // BUG: favourites should be an array but it's the wrong type
      favourites: 'coding, gaming, music'
    };
    function showFavourites() {
      // This will crash because .map() doesn't work on strings
      const list = user.favourites.map(item => '• ' + item).join('<br>');
      document.getElementById('output').innerHTML = '<strong>Favourites:</strong><br>' + list;
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-014', title: 'Dark/Light Mode Toggle',
      desc: 'Add CSS variables and JavaScript so clicking the toggle switches between dark and light mode.',
      tags: ['🎨 CSS', '⏱ 12 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html data-theme="dark">
<head>
  <style>
    /* TODO: Define CSS variables for both themes using [data-theme="dark"] and [data-theme="light"] selectors */
    /* Dark theme: --bg: #0F1F3D; --text: #ffffff; --card: #0D1B2E; --btn: #00C9B1; */
    /* Light theme: --bg: #f5f7fa; --text: #0F1F3D; --card: #ffffff; --btn: #0F1F3D; */

    body { background: var(--bg); color: var(--text); font-family:sans-serif; padding:40px; transition: background .3s, color .3s; }
    .card { background: var(--card); padding:24px; border-radius:14px; max-width:400px; }
    .toggle-btn { background: var(--btn); color: var(--bg); border:none; padding:10px 20px; border-radius:8px; font-weight:700; cursor:pointer; margin-top:16px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>🌗 Theme Toggle</h2>
    <p>Click the button to switch themes. Define the CSS variables above to make it work!</p>
    <button class="toggle-btn" onclick="toggleTheme()">Switch Theme</button>
  </div>
  <script>
    function toggleTheme() {
      const html = document.documentElement;
      // TODO: Check the current data-theme attribute
      // If it's "dark", set it to "light", otherwise set it to "dark"
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-015', title: 'Build a Countdown Timer',
      desc: 'Complete the countdown timer that counts from 60 seconds down to zero and stops.',
      tags: ['⚡ JS', '⏱ 10 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; text-align:center; padding:60px 30px; }
    #timer { font-size:96px; font-weight:900; color:#00C9B1; line-height:1; margin:20px 0; }
    .controls { display:flex; gap:12px; justify-content:center; margin-top:20px; }
    button { padding:12px 28px; border:none; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; }
    #startBtn { background:#00C9B1; color:#0F1F3D; }
    #resetBtn { background:rgba(255,255,255,.1); color:#fff; }
  </style>
</head>
<body>
  <h2>⏱ Countdown Timer</h2>
  <div id="timer">60</div>
  <div class="controls">
    <button id="startBtn" onclick="startTimer()">Start</button>
    <button id="resetBtn" onclick="resetTimer()">Reset</button>
  </div>
  <script>
    let seconds = 60;
    let interval = null;
    function startTimer() {
      if (interval) return; // already running
      document.getElementById('startBtn').textContent = 'Running...';
      // TODO: Use setInterval to call a function every 1000ms
      // Each tick: decrease seconds by 1 and update #timer
      // When seconds reaches 0: clear the interval, show "Done! 🎉"
    }
    function resetTimer() {
      // TODO: Clear the interval, set seconds back to 60
      // TODO: Update #timer to show 60 and reset the button text to "Start"
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-016', title: 'Fix the Form Validation',
      desc: 'The form should reject empty submissions and short passwords, but it accepts everything. Find 2 bugs.',
      tags: ['🐛 Debug', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:40px; max-width:360px; }
    input { width:100%; padding:12px; margin:8px 0; border:1.5px solid rgba(255,255,255,.2); background:#0D1B2E; color:#fff; border-radius:8px; font-size:14px; box-sizing:border-box; }
    button { background:#00C9B1; color:#0F1F3D; padding:12px; border:none; border-radius:8px; font-weight:700; cursor:pointer; width:100%; }
    #msg { margin-top:12px; font-size:14px; }
    .error { color:#FF6B6B; }
    .success { color:#00C9B1; }
  </style>
</head>
<body>
  <h2>🐛 Fix Form Validation</h2>
  <input type="text" id="username" placeholder="Username">
  <input type="password" id="password" placeholder="Password (min 8 chars)">
  <button onclick="validate()">Sign Up</button>
  <div id="msg"></div>
  <script>
    function validate() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const msg = document.getElementById('msg');
      // BUG 1: This condition is wrong — it should reject EMPTY usernames
      if (username !== '') {
        msg.className = 'error';
        msg.textContent = 'Username is required';
        return;
      }
      // BUG 2: Password length check uses wrong operator
      if (password.length > 8) {
        msg.className = 'error';
        msg.textContent = 'Password must be at least 8 characters';
        return;
      }
      msg.className = 'success';
      msg.textContent = '✅ Account created!';
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-017', title: 'CSS Gradient Button',
      desc: 'Style these buttons with gradient backgrounds, hover lift effects, and smooth transitions.',
      tags: ['🎨 CSS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; min-height:100vh; font-family:sans-serif; }
    .btn-primary {
      padding:14px 32px; border:none; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer;
      /* TODO: Add a gradient from #00C9B1 to #0090FF */
      /* TODO: Add color: #fff */
      /* TODO: Add transition: all 0.2s ease */
      /* TODO: On :hover — use transform: translateY(-3px) and add a box-shadow */
    }
    .btn-danger {
      padding:14px 32px; border:none; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer;
      /* TODO: Add a gradient from #FF6B6B to #FF8E53 */
      /* TODO: Add color: #fff and matching transition + hover */
    }
    .btn-ghost {
      padding:14px 32px; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer; background:none;
      /* TODO: Add border: 2px solid #00C9B1 and color: #00C9B1 */
      /* TODO: On :hover — fill the background with #00C9B1 and change color to #0F1F3D */
    }
  </style>
</head>
<body>
  <button class="btn-primary">Primary Action</button>
  <button class="btn-danger">Delete This</button>
  <button class="btn-ghost">Ghost Button</button>
</body>
</html>`,
    },
    {
      id: 'dc-018', title: 'Build a Character Counter',
      desc: 'Complete the character counter that shows remaining characters and changes colour when nearly full.',
      tags: ['⚡ JS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:40px; max-width:500px; margin:auto; }
    textarea { width:100%; height:120px; background:#0D1B2E; color:#fff; border:1.5px solid #00C9B1; border-radius:10px; padding:14px; font-size:15px; resize:none; box-sizing:border-box; }
    #counter { text-align:right; font-size:14px; font-weight:700; margin-top:6px; color:#00C9B1; }
    #counter.warning { color:#FFB347; }
    #counter.danger  { color:#FF6B6B; }
  </style>
</head>
<body>
  <h2>📝 Character Counter</h2>
  <textarea id="tweet" maxlength="280" placeholder="What's happening?" oninput="countChars()"></textarea>
  <div id="counter">280 remaining</div>
  <script>
    const MAX = 280;
    function countChars() {
      const text    = document.getElementById('tweet').value;
      const counter = document.getElementById('counter');
      // TODO: Calculate remaining = MAX - text.length
      // TODO: Update counter text to show "X remaining"
      // TODO: Remove all classes from counter first
      // TODO: If remaining <= 20, add class "danger"
      // TODO: Else if remaining <= 60, add class "warning"
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-019', title: 'Fix the Broken Function',
      desc: 'The greet function should return a personalised message but always returns undefined. Find the bug!',
      tags: ['🐛 Debug', '⏱ 5 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:30px; }
    input { padding:12px; border:1.5px solid #00C9B1; background:#0D1B2E; color:#fff; border-radius:8px; font-size:14px; margin-right:8px; }
    button { background:#00C9B1; color:#0F1F3D; padding:12px 20px; border:none; border-radius:8px; font-weight:700; cursor:pointer; }
    #output { background:#0D1B2E; padding:16px; border-radius:10px; margin-top:16px; font-size:16px; }
  </style>
</head>
<body>
  <h2>🐛 Fix the Function</h2>
  <input type="text" id="nameInput" placeholder="Enter your name">
  <button onclick="showGreeting()">Greet me!</button>
  <div id="output">Output will appear here</div>
  <script>
    function greet(name) {
      // BUG: This function builds the message but never returns it!
      const message = 'Hello, ' + name + '! Welcome to TekkieStack 🚀';
    }
    function showGreeting() {
      const name = document.getElementById('nameInput').value || 'Coder';
      const message = greet(name);
      document.getElementById('output').textContent = message;
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-020', title: 'CSS Sticky Header',
      desc: 'Make the header stick to the top of the page as you scroll and add a subtle shadow when scrolled.',
      tags: ['🎨 CSS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:sans-serif; }
    header {
      background:#0F1F3D; color:#fff; padding:16px 30px;
      display:flex; align-items:center; justify-content:space-between;
      /* TODO: Make this header sticky at the top using position and top */
      /* TODO: Add z-index:100 so it stays above other content */
      /* TODO: Add transition: box-shadow 0.3s ease */
    }
    header.scrolled {
      /* TODO: Add box-shadow: 0 4px 20px rgba(0,0,0,0.4) */
    }
    .logo { font-size:20px; font-weight:700; color:#00C9B1; }
    main { padding:20px; }
    .section { background:#f5f7fa; margin:16px 0; padding:40px 30px; border-radius:12px; }
  </style>
</head>
<body>
  <header id="header">
    <span class="logo">TekkieStack</span>
    <nav style="display:flex;gap:20px;font-size:14px"><a href="#" style="color:rgba(255,255,255,.7);text-decoration:none">Home</a><a href="#" style="color:rgba(255,255,255,.7);text-decoration:none">Lessons</a></nav>
  </header>
  <main>
    <div class="section"><h2>Section 1</h2><p>Scroll down to test the sticky header.</p></div>
    <div class="section"><h2>Section 2</h2><p>The header should shadow when you scroll.</p></div>
    <div class="section"><h2>Section 3</h2><p>Add the JavaScript scroll listener below to toggle the .scrolled class.</p></div>
    <div class="section"><h2>Section 4</h2><p>Keep going!</p></div>
  </main>
  <script>
    // TODO: Add a scroll event listener to window
    // When window.scrollY > 10, add class "scrolled" to the header
    // When scrollY <= 10, remove the class
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-021', title: 'Build a Password Strength Checker',
      desc: 'Show a strength bar and label (Weak / OK / Strong) as the user types a password.',
      tags: ['⚡ JS', '⏱ 12 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:40px; max-width:400px; margin:auto; }
    input { width:100%; padding:12px; background:#0D1B2E; border:1.5px solid rgba(255,255,255,.2); color:#fff; border-radius:8px; font-size:15px; box-sizing:border-box; margin-bottom:12px; }
    .bar-bg { height:8px; background:rgba(255,255,255,.1); border-radius:4px; overflow:hidden; margin-bottom:8px; }
    .bar { height:100%; width:0%; border-radius:4px; transition: width .3s, background .3s; }
    #label { font-size:13px; font-weight:700; }
  </style>
</head>
<body>
  <h2>🔐 Password Strength</h2>
  <input type="password" id="pwd" placeholder="Type a password..." oninput="checkStrength()">
  <div class="bar-bg"><div class="bar" id="bar"></div></div>
  <div id="label">Type a password to check its strength</div>
  <script>
    function checkStrength() {
      const pwd = document.getElementById('pwd').value;
      const bar = document.getElementById('bar');
      const label = document.getElementById('label');
      // TODO: Score the password based on:
      //   +1 if length >= 8
      //   +1 if it contains a number (/\d/.test(pwd))
      //   +1 if it contains uppercase (/[A-Z]/.test(pwd))
      //   +1 if it contains a special char (/[^a-zA-Z0-9]/.test(pwd))
      // score 0-1: Weak (red, 25%)
      // score 2:   OK (orange, 50%)
      // score 3:   Good (yellow, 75%)
      // score 4:   Strong (green #00C9B1, 100%)
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-022', title: 'Fix the Missing Semicolons',
      desc: 'This script has 3 bugs that stop it working. Two are missing semicolons — what\'s the third?',
      tags: ['🐛 Debug', '⏱ 5 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:30px; }
    .item { background:#0D1B2E; padding:14px; border-radius:8px; margin:8px 0; }
    button { background:#00C9B1; color:#0F1F3D; padding:10px 20px; border:none; border-radius:8px; font-weight:700; cursor:pointer; margin-bottom:16px; }
  </style>
</head>
<body>
  <h2>🐛 Fix the Script</h2>
  <button onclick="showItems()">Show Items</button>
  <div id="list"></div>
  <script>
    const items = ['HTML', 'CSS', 'JavaScript', 'Python']
    function showItems() {
      const list = document.getElementById('list')
      // BUG 3: The wrong method is used to loop here
      items.forEach(item => {
        const div = document.createElement('p')
        div.className = 'item'
        div.textContent = item
        list.appendChild(div)
      })
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-023', title: 'CSS Flexbox Profile Card',
      desc: 'Use Flexbox to build a profile card with avatar, name, role, and social buttons perfectly aligned.',
      tags: ['🎨 CSS', '⏱ 10 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:sans-serif; }
    .card {
      background:#0D1B2E; border-radius:20px; padding:32px; width:280px;
      border:1px solid rgba(0,201,177,.25);
      /* TODO: Use flexbox — flex-direction:column, align-items:center, gap:12px */
    }
    .avatar { width:80px; height:80px; border-radius:50%; background:#00C9B1; font-size:32px; display:flex; align-items:center; justify-content:center; }
    .name { color:#fff; font-size:20px; font-weight:700; margin:0; }
    .role { color:rgba(255,255,255,.5); font-size:13px; margin:0; }
    .stats {
      width:100%; display:flex; gap:8px;
      /* TODO: Use justify-content:space-around */
    }
    .stat { text-align:center; }
    .stat-num { color:#00C9B1; font-size:18px; font-weight:700; }
    .stat-label { color:rgba(255,255,255,.4); font-size:11px; }
    .buttons {
      width:100%; display:flex; gap:8px;
      /* TODO: Use equal flex distribution */
    }
    .btn { flex:1; padding:10px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; border:none; }
    .btn-primary { background:#00C9B1; color:#0F1F3D; }
    .btn-ghost { background:rgba(255,255,255,.08); color:#fff; }
  </style>
</head>
<body>
  <div class="card">
    <div class="avatar">👩‍💻</div>
    <p class="name">Alex Johnson</p>
    <p class="role">Junior Developer</p>
    <div class="stats">
      <div class="stat"><div class="stat-num">24</div><div class="stat-label">Lessons</div></div>
      <div class="stat"><div class="stat-num">1,250</div><div class="stat-label">XP</div></div>
      <div class="stat"><div class="stat-num">7</div><div class="stat-label">Badges</div></div>
    </div>
    <div class="buttons">
      <button class="btn btn-primary">Follow</button>
      <button class="btn btn-ghost">Message</button>
    </div>
  </div>
</body>
</html>`,
    },
    {
      id: 'dc-024', title: 'Build a Word Counter',
      desc: 'Build a textarea that counts words, characters, and estimates reading time as you type.',
      tags: ['⚡ JS', '⏱ 10 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:40px; max-width:560px; margin:auto; }
    textarea { width:100%; height:180px; background:#0D1B2E; color:#fff; border:1.5px solid #00C9B1; border-radius:10px; padding:16px; font-size:15px; resize:vertical; box-sizing:border-box; }
    .stats { display:flex; gap:20px; margin-top:14px; flex-wrap:wrap; }
    .stat { background:#0D1B2E; border-radius:10px; padding:14px 20px; flex:1; min-width:120px; text-align:center; }
    .stat-num { font-size:28px; font-weight:800; color:#00C9B1; }
    .stat-label { font-size:12px; color:rgba(255,255,255,.5); margin-top:4px; }
  </style>
</head>
<body>
  <h2>📄 Word Counter</h2>
  <textarea placeholder="Start typing your essay..." oninput="analyse()"></textarea>
  <div class="stats">
    <div class="stat"><div class="stat-num" id="words">0</div><div class="stat-label">Words</div></div>
    <div class="stat"><div class="stat-num" id="chars">0</div><div class="stat-label">Characters</div></div>
    <div class="stat"><div class="stat-num" id="readTime">0s</div><div class="stat-label">Read Time</div></div>
  </div>
  <script>
    function analyse() {
      const text = document.querySelector('textarea').value;
      // TODO: Count words (hint: split on whitespace and filter out empty strings)
      // HINT: text.trim().split(/\s+/).filter(w => w.length > 0)
      // If text is empty, words = 0
      // TODO: Count characters (text.length)
      // TODO: Calculate read time — average reading speed is 200 words per minute
      // Show seconds if under 60s, otherwise show "Xm Ys"
      // TODO: Update the three stat elements
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-025', title: 'Fix the Fetch Error',
      desc: 'This fetch call never shows data — it silently fails. Find and fix both bugs.',
      tags: ['🐛 Debug', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:30px; }
    #output { background:#0D1B2E; padding:16px; border-radius:10px; margin-top:14px; }
    button { background:#00C9B1; color:#0F1F3D; padding:12px 24px; border:none; border-radius:8px; font-weight:700; cursor:pointer; }
  </style>
</head>
<body>
  <h2>🐛 Fix the Fetch</h2>
  <button onclick="loadJoke()">Load a Joke</button>
  <div id="output">Click to load a joke from the API.</div>
  <script>
    async function loadJoke() {
      const output = document.getElementById('output');
      output.textContent = 'Loading...';
      // BUG 1: The URL is missing — fetch needs the actual URL string
      const response = await fetch();
      // BUG 2: We never check if the response is OK before parsing
      const data = response.json();  // also missing await!
      output.textContent = data.setup + ' ... ' + data.punchline;
    }
    // NOTE: Use this joke API: https://official-joke-api.appspot.com/random_joke
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-026', title: 'CSS Grid Dashboard Layout',
      desc: 'Use CSS Grid template areas to build this dashboard layout with header, sidebar, main, and footer.',
      tags: ['🎨 CSS', '⏱ 12 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:sans-serif; height:100vh; background:#0F1F3D; }
    .layout {
      display:grid; height:100vh;
      /* TODO: Define grid-template-areas with:
         "header header"
         "sidebar main"
         "footer footer"
      */
      /* TODO: Set grid-template-columns: 200px 1fr */
      /* TODO: Set grid-template-rows: 60px 1fr 50px */
    }
    .header  { grid-area:header;  background:#0D1B2E; color:#00C9B1; display:flex; align-items:center; padding:0 24px; font-size:18px; font-weight:700; border-bottom:1px solid rgba(0,201,177,.2); }
    .sidebar { grid-area:sidebar; background:#0D1B2E; color:#fff; padding:20px; border-right:1px solid rgba(255,255,255,.08); }
    .main    { grid-area:main;    background:#0F1F3D; color:#fff; padding:24px; }
    .footer  { grid-area:footer;  background:#0D1B2E; color:rgba(255,255,255,.4); display:flex; align-items:center; justify-content:center; font-size:12px; border-top:1px solid rgba(255,255,255,.08); }
    .nav-item { padding:10px 12px; border-radius:8px; margin-bottom:6px; font-size:14px; cursor:pointer; color:rgba(255,255,255,.6); }
    .nav-item:hover { background:rgba(0,201,177,.1); color:#00C9B1; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="header">🚀 TekkieStack Dashboard</div>
    <div class="sidebar">
      <div class="nav-item">📊 Overview</div>
      <div class="nav-item">📚 Lessons</div>
      <div class="nav-item">🏆 Badges</div>
      <div class="nav-item">⚙️ Settings</div>
    </div>
    <div class="main"><h2>Main Content Area</h2><p style="margin-top:12px;color:rgba(255,255,255,.6)">Add the grid-template-areas to make this layout work!</p></div>
    <div class="footer">© 2025 TekkieStack · Aperintel Ltd</div>
  </div>
</body>
</html>`,
    },
    {
      id: 'dc-027', title: 'Build a Simple Accordion',
      desc: 'Make each FAQ item expand and collapse when clicked, with a smooth transition.',
      tags: ['⚡ JS', '⏱ 10 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:40px; max-width:560px; margin:auto; }
    .item { border:1px solid rgba(0,201,177,.25); border-radius:12px; margin-bottom:10px; overflow:hidden; }
    .question { padding:16px 20px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; font-weight:600; font-size:15px; user-select:none; }
    .question:hover { background:rgba(0,201,177,.08); }
    .arrow { transition: transform 0.3s; font-size:12px; }
    .item.open .arrow { transform: rotate(180deg); }
    .answer {
      padding:0 20px; font-size:14px; color:rgba(255,255,255,.7); line-height:1.7;
      max-height:0; overflow:hidden;
      /* TODO: Add transition: max-height 0.3s ease, padding 0.3s ease */
    }
    .item.open .answer {
      /* TODO: Set max-height:200px and padding:0 20px 16px */
    }
  </style>
</head>
<body>
  <h2>❓ FAQ Accordion</h2>
  <div class="item">
    <div class="question" onclick="toggle(this)">What is HTML? <span class="arrow">▼</span></div>
    <div class="answer">HTML stands for HyperText Markup Language. It is the backbone of every webpage, providing the structure and content.</div>
  </div>
  <div class="item">
    <div class="question" onclick="toggle(this)">What is CSS? <span class="arrow">▼</span></div>
    <div class="answer">CSS stands for Cascading Style Sheets. It controls the visual presentation of your HTML — colours, fonts, layouts, and animations.</div>
  </div>
  <div class="item">
    <div class="question" onclick="toggle(this)">What is JavaScript? <span class="arrow">▼</span></div>
    <div class="answer">JavaScript is a programming language that runs in the browser. It makes web pages interactive — responding to clicks, loading data, and updating content without refreshing the page.</div>
  </div>
  <script>
    function toggle(questionEl) {
      const item = questionEl.parentElement;
      // TODO: Toggle the "open" class on the item element
      // The CSS will handle the animation automatically!
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-028', title: 'Fix the Undefined Variable',
      desc: 'The shopping cart crashes with "ReferenceError". There are 2 scoping bugs — can you find them?',
      tags: ['🐛 Debug', '⏱ 6 mins', '+15 XP'], xp: 15, type: 'debug',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:30px; }
    .product { background:#0D1B2E; padding:14px 18px; border-radius:10px; margin:8px 0; display:flex; justify-content:space-between; align-items:center; }
    button { background:#00C9B1; color:#0F1F3D; padding:8px 16px; border:none; border-radius:6px; font-weight:700; cursor:pointer; }
    #total { margin-top:16px; font-size:18px; font-weight:700; color:#00C9B1; }
  </style>
</head>
<body>
  <h2>🐛 Fix the Cart</h2>
  <div class="product">HTML Course — £15 <button onclick="addToCart(15)">Add</button></div>
  <div class="product">CSS Masterclass — £12 <button onclick="addToCart(12)">Add</button></div>
  <div class="product">JS Complete — £25 <button onclick="addToCart(25)">Add</button></div>
  <div id="total">Total: £0</div>
  <script>
    // BUG 1: total is declared with let inside the if block below —
    // move it here so it persists between function calls
    function addToCart(price) {
      // BUG 2: total is declared with let here, shadowing any outer variable
      let total = 0;
      total += price;
      document.getElementById('total').textContent = 'Total: £' + total;
    }
  <\/script>
</body>
</html>`,
    },
    {
      id: 'dc-029', title: 'CSS Pulse Animation',
      desc: 'Add CSS keyframe animations to create a pulsing notification dot and a spinning loader.',
      tags: ['🎨 CSS', '⏱ 8 mins', '+15 XP'], xp: 15, type: 'challenge',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:50px; min-height:100vh; font-family:sans-serif; color:#fff; }
    /* CHALLENGE 1: Pulsing dot */
    .notification {
      position:relative; display:inline-block;
    }
    .bell { font-size:36px; }
    .dot {
      position:absolute; top:2px; right:2px; width:12px; height:12px;
      background:#FF6B6B; border-radius:50%;
      /* TODO: Add an animation called "pulse" that scales from 1 to 1.4 and back, infinite, ease-in-out, 1s duration */
    }
    /* TODO: Define @keyframes pulse */

    /* CHALLENGE 2: Spinning loader */
    .spinner {
      width:48px; height:48px;
      border:4px solid rgba(0,201,177,.2);
      border-top-color:#00C9B1;
      border-radius:50%;
      /* TODO: Add an animation called "spin" that rotates 360deg, infinite, linear, 0.8s */
    }
    /* TODO: Define @keyframes spin */
  </style>
</head>
<body>
  <div>
    <p style="text-align:center;margin-bottom:16px;color:rgba(255,255,255,.6)">Notification Bell</p>
    <div class="notification">
      <span class="bell">🔔</span>
      <div class="dot"></div>
    </div>
  </div>
  <div>
    <p style="text-align:center;margin-bottom:16px;color:rgba(255,255,255,.6)">Loading Spinner</p>
    <div class="spinner"></div>
  </div>
</body>
</html>`,
    },
    {
      id: 'dc-030', title: 'Build a Mini Quiz',
      desc: 'Build a 3-question quiz that shows a score at the end. Use an array of question objects.',
      tags: ['⚡ JS', '⏱ 15 mins', '+15 XP'], xp: 15, type: 'build',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background:#0F1F3D; color:#fff; font-family:sans-serif; padding:40px; max-width:520px; margin:auto; }
    .question-box { background:#0D1B2E; border-radius:14px; padding:24px; margin-bottom:16px; }
    .q-text { font-size:16px; font-weight:600; margin-bottom:14px; }
    .option { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:8px; cursor:pointer; margin-bottom:8px; border:1.5px solid rgba(255,255,255,.12); transition:all .15s; }
    .option:hover { border-color:#00C9B1; background:rgba(0,201,177,.08); }
    .option input { accent-color:#00C9B1; }
    button { background:#00C9B1; color:#0F1F3D; padding:14px 32px; border:none; border-radius:10px; font-size:16px; font-weight:700; cursor:pointer; width:100%; margin-top:8px; }
    #result { background:#0D1B2E; padding:24px; border-radius:14px; text-align:center; display:none; }
    .score-num { font-size:56px; font-weight:900; color:#00C9B1; }
  </style>
</head>
<body>
  <h2>🧠 Quick Quiz</h2>
  <div id="quiz"></div>
  <button onclick="submitQuiz()">Submit Answers</button>
  <div id="result"></div>
  <script>
    const questions = [
      { q: 'What does HTML stand for?', options: ['HyperText Markup Language','High-Tech Modern Language','HyperText Modern Layout','HyperType Markup Language'], answer: 0 },
      { q: 'Which CSS property controls text colour?', options: ['font-color','text-color','color','foreground'], answer: 2 },
      { q: 'What does the console.log() function do?', options: ['Deletes a variable','Prints output to the browser console','Creates a new element','Saves data to localStorage'], answer: 1 },
    ];
    // TODO: Loop through the questions array and build the quiz HTML
    // For each question, create a .question-box with the question text
    // and 4 radio button options (name="q0", "q1", "q2" etc.)

    function submitQuiz() {
      // TODO: Loop through each question and check if the selected radio
      // matches the correct answer index
      // Count correct answers and show the result div with the score
      // e.g. "You scored 2 / 3!"
    }
  <\/script>
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
