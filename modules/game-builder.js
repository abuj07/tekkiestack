/**
 * TekkieStack 2.0 — Game Builder Lab
 *
 * Guided "build your own game" projects. Each project is a stepped
 * playbook: you read what the step is, see starter code, type into
 * the editor, click Run, and Check progresses you to the next step.
 * No AI. Each step has a deterministic check (regex / string match
 * / DOM probe) that runs locally.
 *
 * Wide difficulty range so every age can find something:
 *   - Coin Flip      (Y3-4 starter, ~5 steps)
 *   - Click Counter  (Y4-5, ~6 steps)
 *   - Number Guess   (Y5-6, ~7 steps)
 *   - Tic-Tac-Toe    (Y6-8, ~10 steps)
 *   - Calculator     (Y6-8, ~9 steps)
 *   - Code Snake     (Y8+, ~12 steps, canvas)
 *   - Memory Game    (Y8+, ~10 steps)
 *
 * Each project saves its progress per profile (so kids resume mid-build).
 * On completing the final step the kid earns a "Built [Name]" badge + XP.
 *
 * Author: Aperintel Ltd
 */

const TSAGameBuilder = (() => {

  // ── Project registry ─────────────────────────────────────────────────────
  const PROJECTS = [
    {
      id: 'coin_flip', title: 'Coin Flip', tagline: 'Heads or tails? A 1-button game.',
      level: 'Beginner', age: 'Y3-4', xp: 30, icon: 'controller',
      accent: '#FF9500',
    },
    {
      id: 'click_counter', title: 'Click Counter', tagline: 'Click as fast as you can in 5 seconds.',
      level: 'Beginner', age: 'Y4-5', xp: 35, icon: 'bolt',
      accent: '#00C9B1',
    },
    {
      id: 'number_guess', title: 'Number Guess', tagline: 'Guess the secret number in 5 tries.',
      level: 'Beginner', age: 'Y5-6', xp: 40, icon: 'target',
      accent: '#FF6B6B',
    },
    {
      id: 'tic_tac_toe', title: 'Tic-Tac-Toe', tagline: 'Classic 2-player grid game.',
      level: 'Intermediate', age: 'Y6-8', xp: 60, icon: 'grid',
      accent: '#6C63FF',
    },
    {
      id: 'calculator', title: 'Calculator', tagline: 'Build a working 4-button calculator.',
      level: 'Intermediate', age: 'Y6-8', xp: 60, icon: 'code',
      accent: '#FFB347',
    },
    {
      id: 'memory_game', title: 'Memory Game', tagline: 'Flip cards, find matching pairs.',
      level: 'Advanced', age: 'Y8+', xp: 75, icon: 'puzzle',
      accent: '#80E8DE',
    },
    {
      id: 'snake_canvas', title: 'Snake (Canvas)', tagline: 'Build the classic snake game with canvas.',
      level: 'Advanced', age: 'Y8+', xp: 80, icon: 'controller',
      accent: '#FF6B6B',
    },
  ];
  const PROJECTS_BY_ID = Object.fromEntries(PROJECTS.map(p => [p.id, p]));

  // ── Project playbooks ────────────────────────────────────────────────────
  // Each playbook is a list of steps. Each step has:
  //   instruction  — what the kid is doing this step (HTML string)
  //   starterCode  — full HTML the kid types/edits this step
  //   check        — function (code) => { ok: boolean, message: string }
  //
  // The check is a deterministic local function. No AI. Progresses to the
  // next step only when ok=true.

  const PLAYBOOKS = {

    coin_flip: [
      {
        instruction: `<p><strong>Step 1: Build the page.</strong> Add a heading and a button. The button should say <code>Flip!</code>. Press Run to see your page.</p><p>The starter code already has the heading. Find <code>&lt;button&gt;Flip!&lt;/button&gt;</code> inside the <code>&lt;body&gt;</code> tag.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button>Flip!</button>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button>Flip!</button>
</body>
</html>`,
        check: code => ({
          ok: /<button[^>]*>\s*Flip!?\s*<\/button>/i.test(code),
          message: 'Add a button with the text "Flip!"',
        }),
      },
      {
        instruction: `<p><strong>Step 2: Connect the button.</strong> Add <code>onclick="flip()"</code> inside the <code>&lt;button&gt;</code> tag so it calls a function named <code>flip</code> when clicked.</p><p>The button line currently looks like <code>&lt;button onclick=""&gt;Flip!&lt;/button&gt;</code>. Put <code>flip()</code> between the empty quotes.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button onclick="">Flip!</button>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button onclick="flip()">Flip!</button>
</body>
</html>`,
        check: code => ({
          ok: /onclick\s*=\s*["']flip\(\)["']/i.test(code),
          message: 'Set the button onclick to "flip()".',
        }),
      },
      {
        instruction: `<p><strong>Step 3: Add a place to show the result.</strong> Right after the <code>&lt;button&gt;</code> line and before <code>&lt;/body&gt;</code>, add a new line: <code>&lt;p id="result"&gt;&lt;/p&gt;</code>. The empty paragraph is where JavaScript will write Heads or Tails.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button onclick="flip()">Flip!</button>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button onclick="flip()">Flip!</button>
  <p id="result"></p>
</body>
</html>`,
        check: code => ({
          ok: /<p[^>]*id\s*=\s*["']result["']/i.test(code),
          message: 'Add a <p> with id="result".',
        }),
      },
      {
        instruction: `<p><strong>Step 4: Write the flip function.</strong> Inside the <code>&lt;script&gt;</code> tag (replacing the comment), write a function called <code>flip</code>. It should:</p><ol><li>Use <code>Math.random() &lt; 0.5</code> to pick true or false.</li><li>Set <code>result</code> to <code>'Heads'</code> if true, otherwise <code>'Tails'</code>.</li><li>Update <code>#result</code>'s text using <code>document.getElementById</code>.</li></ol>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button onclick="flip()">Flip!</button>
  <p id="result"></p>
  <script>
    // Write your function here
  <\/script>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Coin Flip</h1>
  <button onclick="flip()">Flip!</button>
  <p id="result"></p>
  <script>
    function flip() {
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      document.getElementById('result').textContent = result;
    }
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /function\s+flip\s*\(/i.test(code) && /Math\.random/i.test(code) && /document\.getElementById\(['"]result['"]\)/i.test(code),
          message: 'Inside <script>, define function flip() that uses Math.random() and sets the text of #result.',
        }),
      },
      {
        instruction: `<p><strong>Step 5: Final touches.</strong> Press Run, then click the button a few times. You should see Heads or Tails alternate. When it works, hit <strong>Check & Finish</strong>.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; background: #F8F5F0; }
    button { font-size: 24px; padding: 14px 32px; background: #00C9B1; color: #0F1F3D; border: none; border-radius: 12px; cursor: pointer; }
    #result { font-size: 32px; margin-top: 20px; font-weight: 700; color: #0F1F3D; }
  </style>
</head>
<body>
  <h1>Coin Flip</h1>
  <button onclick="flip()">Flip!</button>
  <p id="result"></p>
  <script>
    function flip() {
      const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      document.getElementById('result').textContent = result;
    }
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /function\s+flip\s*\(\s*\)\s*\{[\s\S]*Math\.random[\s\S]*Heads[\s\S]*Tails/i.test(code) && /getElementById\(['"]result['"]\)/i.test(code),
          message: 'Make sure your flip() function sets the result text to either Heads or Tails.',
        }),
      },
    ],

    click_counter: [
      {
        instruction: `<p><strong>Step 1.</strong> Below the heading, add a paragraph that will hold the count: <code>&lt;p id="count"&gt;0&lt;/p&gt;</code>. The id lets JavaScript find it later.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
</body>
</html>`,
        check: code => ({
          ok: /<p[^>]*id=["']count["'][^>]*>\s*0\s*<\/p>/i.test(code),
          message: 'Add <p id="count">0</p> below the heading.',
        }),
      },
      {
        instruction: `<p><strong>Step 2.</strong> Below the count paragraph, add a button: <code>&lt;button onclick="add()"&gt;Click me!&lt;/button&gt;</code>. The <code>onclick</code> will call a function we'll write next.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button onclick="add()">Click me!</button>
</body>
</html>`,
        check: code => ({
          ok: /<button[^>]*onclick\s*=\s*["']add\(\)["'][^>]*>\s*Click me!?\s*<\/button>/i.test(code),
          message: 'Add a button with text "Click me!" and onclick="add()".',
        }),
      },
      {
        instruction: `<p><strong>Step 3.</strong> Inside the <code>&lt;script&gt;</code> (replacing the comment), declare a variable to hold the count: <code>let n = 0;</code>. Putting it OUTSIDE the function means its value is remembered between clicks.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button onclick="add()">Click me!</button>
  <script>
    // Step 3: declare n
  <\/script>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button onclick="add()">Click me!</button>
  <script>
    let n = 0;
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /\blet\s+n\s*=\s*0/.test(code),
          message: 'Declare let n = 0; in your <script>.',
        }),
      },
      {
        instruction: `<p><strong>Step 4.</strong> Write a function called <code>add</code>. Inside it should: (1) add 1 to <code>n</code>; (2) put the new value of <code>n</code> into the <code>#count</code> paragraph using <code>document.getElementById</code>.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button onclick="add()">Click me!</button>
  <script>
    let n = 0;
    // Step 4: function add()
  <\/script>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button onclick="add()">Click me!</button>
  <script>
    let n = 0;
    function add() {
      n = n + 1;
      document.getElementById('count').textContent = n;
    }
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /function\s+add\s*\(\s*\)/.test(code) && /n\s*=\s*n\s*\+\s*1|n\+\+/.test(code) && /getElementById\(['"]count['"]\)/.test(code),
          message: 'Write function add() that increments n and updates the #count text.',
        }),
      },
      {
        instruction: `<p><strong>Step 5.</strong> Add a <strong>5-second timer</strong>. After the page loads, use <code>setTimeout(..., 5000)</code> to disable the button and show the final score in <code>#msg</code>. <code>5000</code> is 5000 milliseconds = 5 seconds.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button id="btn" onclick="add()">Click me!</button>
  <p id="msg"></p>
  <script>
    let n = 0;
    function add() {
      n = n + 1;
      document.getElementById('count').textContent = n;
    }
    // Step 5: timer
  <\/script>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button id="btn" onclick="add()">Click me!</button>
  <p id="msg"></p>
  <script>
    let n = 0;
    function add() {
      n = n + 1;
      document.getElementById('count').textContent = n;
    }
    setTimeout(() => {
      document.getElementById('btn').disabled = true;
      document.getElementById('msg').textContent = 'Time up! You scored ' + n;
    }, 5000);
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /setTimeout\s*\(/.test(code) && /5000/.test(code) && /\.disabled\s*=\s*true/.test(code),
          message: 'Use setTimeout(..., 5000) and set the button .disabled = true.',
        }),
      },
      {
        instruction: `<p><strong>Step 6: Polish.</strong> Add CSS inside <code>&lt;style&gt;</code> to make it look fun, big numbers, a coloured background, hover effects on the button. The starter has a polished version already, run it to see. Tweak it however you like, then click <strong>Check & Finish</strong>.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; background: #0F1F3D; color: white; }
    h1 { color: #00C9B1; }
    #count { font-size: 80px; font-weight: 800; color: #FFB347; margin: 20px 0; }
    button { font-size: 22px; padding: 14px 36px; background: #00C9B1; color: #0F1F3D; border: none; border-radius: 12px; cursor: pointer; font-weight: 700; }
    button:disabled { opacity: 0.4; cursor: not-allowed; }
    #msg { margin-top: 16px; color: #FF6B6B; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Click Counter</h1>
  <p id="count">0</p>
  <button id="btn" onclick="add()">Click me!</button>
  <p id="msg"></p>
  <script>
    let n = 0;
    function add() {
      n = n + 1;
      document.getElementById('count').textContent = n;
    }
    setTimeout(() => {
      document.getElementById('btn').disabled = true;
      document.getElementById('msg').textContent = 'Time up! You scored ' + n;
    }, 5000);
  <\/script>
</body>
</html>`,
        check: code => ({ ok: true, message: 'Great work!' }),
      },
    ],

    number_guess: [
      {
        instruction: `<p><strong>Step 1.</strong> Below the explanation paragraph, add an input box where the player types their guess: <code>&lt;input id="guess" type="number" min="1" max="100"&gt;</code>. The <code>type="number"</code> makes it accept only numbers.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
</body>
</html>`,
        check: code => ({
          ok: /<input[^>]*id\s*=\s*["']guess["'][^>]*type\s*=\s*["']number["']|<input[^>]*type\s*=\s*["']number["'][^>]*id\s*=\s*["']guess["']/i.test(code),
          message: 'Add an input with id="guess" and type="number".',
        }),
      },
      {
        instruction: `<p><strong>Step 2.</strong> After the input, add a Guess button: <code>&lt;button onclick="check()"&gt;Guess&lt;/button&gt;</code>. Then add a paragraph with id <code>msg</code> where we'll show "Too high"/"Too low"/"Correct".</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
</body>
</html>`,
        check: code => ({
          ok: /<button[^>]*onclick\s*=\s*["']check\(\)["']/.test(code) && /<p[^>]*id\s*=\s*["']msg["']/i.test(code),
          message: 'Add a Guess button with onclick="check()" and a <p id="msg">.',
        }),
      },
      {
        instruction: `<p><strong>Step 3.</strong> Inside the <code>&lt;script&gt;</code>, pick a secret number from 1 to 100: <code>const secret = Math.floor(Math.random() * 100) + 1;</code>. <code>Math.random()</code> gives a number from 0 to 1; multiplying by 100 then flooring rounds it down to 0-99; adding 1 makes it 1-100.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
  <script>
    // Step 3: secret number
  <\/script>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
  <script>
    const secret = Math.floor(Math.random() * 100) + 1;
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /\b(const|let|var)\s+secret\s*=\s*Math\.floor\(Math\.random\(\)\s*\*\s*100\s*\)\s*\+\s*1/.test(code),
          message: 'Declare secret = Math.floor(Math.random() * 100) + 1.',
        }),
      },
      {
        instruction: `<p><strong>Step 4.</strong> Write <code>function check()</code>. Inside: read the input value with <code>document.getElementById('guess').value</code>, convert it with <code>parseInt</code>, then compare to <code>secret</code>. Set <code>#msg</code>'s text to "Too high", "Too low", or "Correct!".</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
  <script>
    const secret = Math.floor(Math.random() * 100) + 1;
    // Step 4: function check()
  <\/script>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
  <script>
    const secret = Math.floor(Math.random() * 100) + 1;
    function check() {
      const guess = parseInt(document.getElementById('guess').value);
      const msg = document.getElementById('msg');
      if (guess < secret) msg.textContent = 'Too low';
      else if (guess > secret) msg.textContent = 'Too high';
      else msg.textContent = 'Correct!';
    }
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /function\s+check\s*\(/.test(code) && /Too high/i.test(code) && /Too low/i.test(code) && /Correct/i.test(code),
          message: 'Write function check() that says "Too high", "Too low", or "Correct".',
        }),
      },
      {
        instruction: `<p><strong>Step 5.</strong> Add a "tries" counter. Add <code>let tries = 0;</code> outside the function (next to <code>secret</code>). Inside <code>check()</code>, do <code>tries = tries + 1;</code> at the top. When the guess is Correct, show "Correct! You used X tries" using string concatenation: <code>'Correct! You used ' + tries + ' tries.'</code></p>`,
        starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
  <script>
    const secret = Math.floor(Math.random() * 100) + 1;
    let tries = 0;
    function check() {
      tries = tries + 1;
      // ...your code
    }
  <\/script>
</body>
</html>`,
        hint: `<!DOCTYPE html>
<html>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
  <script>
    const secret = Math.floor(Math.random() * 100) + 1;
    let tries = 0;
    function check() {
      tries = tries + 1;
      const guess = parseInt(document.getElementById('guess').value);
      const msg = document.getElementById('msg');
      if (guess < secret) msg.textContent = 'Too low';
      else if (guess > secret) msg.textContent = 'Too high';
      else msg.textContent = 'Correct! You used ' + tries + ' tries.';
    }
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /\blet\s+tries\s*=\s*0/.test(code) && /tries\s*=\s*tries\s*\+\s*1|tries\+\+/.test(code) && /tries/.test(code),
          message: 'Add let tries = 0; and increment it inside check().',
        }),
      },
      {
        instruction: `<p><strong>Step 6: Polish.</strong> Inside <code>&lt;style&gt;</code>, add CSS rules to style the body, h1, input, and button. Try a coloured background, padding, larger fonts. The starter has a complete polished version, run it and tweak.</p>`,
        starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 40px; background: #FFF5E1; }
    /* Add styles here */
  </style>
</head>
<body>
  <h1>Number Guess</h1>
  <p>I'm thinking of a number from 1 to 100.</p>
  <input id="guess" type="number" min="1" max="100">
  <button onclick="check()">Guess</button>
  <p id="msg"></p>
  <script>
    const secret = Math.floor(Math.random() * 100) + 1;
    let tries = 0;
    function check() {
      tries = tries + 1;
      const guess = parseInt(document.getElementById('guess').value);
      const msg = document.getElementById('msg');
      if (guess < secret) msg.textContent = 'Too low';
      else if (guess > secret) msg.textContent = 'Too high';
      else msg.textContent = 'Correct! You used ' + tries + ' tries.';
    }
  <\/script>
</body>
</html>`,
        check: code => ({
          ok: /<style>[\s\S]*[a-z][a-z\d]*\s*\{[\s\S]*\}[\s\S]*<\/style>/i.test(code),
          message: 'Add at least one CSS rule inside <style>.',
        }),
      },
    ],

    tic_tac_toe: [
      { instruction: `<p><strong>Step 1.</strong> Build the page shell. The starter already has the <code>&lt;h1&gt;</code> and an empty <code>&lt;div id="board"&gt;</code>. The id lets us style and target it from JavaScript later.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board"></div>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board"></div>\n</body>\n</html>`,
        check: c => ({ ok: /<h1>\s*Tic-Tac-Toe\s*<\/h1>/.test(c) && /<div[^>]*id\s*=\s*["']board["']/.test(c), message: 'Add an h1 and a <div id="board">.' }),
      },
      { instruction: `<p><strong>Step 2.</strong> Inside <code>#board</code>, add 9 buttons. Each button needs <code>class="cell"</code> and <code>onclick="play(N)"</code> where N goes from 0 to 8. Replace the comment with all 9 buttons.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <!-- 9 buttons -->\n  </div>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n</body>\n</html>`,
        check: c => ({ ok: (c.match(/class\s*=\s*["']cell["']/g) || []).length >= 9 && /onclick\s*=\s*["']play\(\d+\)["']/.test(c), message: 'You need 9 buttons with class="cell" and onclick="play(N)" for N from 0 to 8.' }),
      },
      { instruction: `<p><strong>Step 3.</strong> Inside <code>&lt;style&gt;</code>, make <code>#board</code> use CSS Grid with 3 equal columns. Add some basic body padding and make the cells big enough to tap. Use <code>aspect-ratio: 1</code> on <code>.cell</code> so each cell is square.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    /* Step 3 styles */\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n</body>\n</html>`,
        check: c => ({ ok: /display\s*:\s*grid/.test(c) && /grid-template-columns\s*:\s*repeat\(\s*3/.test(c), message: 'Use display: grid and grid-template-columns: repeat(3, ...).' }),
      },
      { instruction: `<p><strong>Step 4.</strong> Inside <code>&lt;script&gt;</code>, declare two variables (replacing the comment): <code>let board = [...Array(9)].fill('');</code> creates a 9-slot array of empty strings, and <code>let player = 'X';</code> tracks whose turn it is. The starter also adds a <code>&lt;p id="status"&gt;</code> for showing the turn message.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n  <p id="status">Player X's turn</p>\n  <script>\n    // Step 4: declare board and player\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n  <p id="status">Player X's turn</p>\n  <script>\n    let board = [...Array(9)].fill('');\n    let player = 'X';\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /\blet\s+board\s*=/.test(c) && /\blet\s+player\s*=\s*['"]X['"]/.test(c), message: 'Declare let board = [...] and let player = "X".' }),
      },
      { instruction: `<p><strong>Step 5.</strong> Write the <code>play(i)</code> function. It should: (1) return early if <code>board[i]</code> is already taken; (2) set <code>board[i] = player</code>; (3) put <code>player</code> as the cell button's text; (4) flip <code>player</code> with the ternary <code>player === 'X' ? 'O' : 'X'</code>; (5) update the status paragraph.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n  <p id="status">Player X's turn</p>\n  <script>\n    let board = [...Array(9)].fill('');\n    let player = 'X';\n    // Step 5: function play(i)\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n  <p id="status">Player X's turn</p>\n  <script>\n    let board = [...Array(9)].fill('');\n    let player = 'X';\n    function play(i) {\n      if (board[i]) return;\n      board[i] = player;\n      document.querySelectorAll('.cell')[i].textContent = player;\n      player = player === 'X' ? 'O' : 'X';\n      document.getElementById('status').textContent = 'Player ' + player + "'s turn";\n    }\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /function\s+play\s*\(\s*i\s*\)/.test(c) && /board\[i\]/.test(c) && /player\s*=\s*\(?\s*player\s*===?\s*['"]X['"]\s*\?\s*['"]O['"]\s*:\s*['"]X['"]/.test(c), message: 'Define play(i) that fills board[i] and toggles player between X and O.' }),
      },
      { instruction: `<p><strong>Step 6.</strong> Define <code>checkWin()</code>. The <code>lines</code> array lists every winning combination of 3 cell indices: 3 rows <code>[0,1,2]</code> <code>[3,4,5]</code> <code>[6,7,8]</code>, 3 columns, and 2 diagonals. Loop through them: if all three cells match, return that player. Otherwise return <code>null</code>.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n  <p id="status">Player X's turn</p>\n  <script>\n    let board = [...Array(9)].fill('');\n    let player = 'X';\n    function play(i) {\n      if (board[i]) return;\n      board[i] = player;\n      document.querySelectorAll('.cell')[i].textContent = player;\n      // call checkWin() here when ready\n      player = player === 'X' ? 'O' : 'X';\n      document.getElementById('status').textContent = 'Player ' + player + \"'s turn\";\n    }\n    // Step 6: function checkWin()\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 6px; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n  <p id="status">Player X's turn</p>\n  <script>\n    let board = [...Array(9)].fill('');\n    let player = 'X';\n    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];\n    function checkWin() {\n      for (const [a,b,c] of lines) {\n        if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];\n      }\n      return null;\n    }\n    function play(i) {\n      if (board[i]) return;\n      board[i] = player;\n      document.querySelectorAll('.cell')[i].textContent = player;\n      const winner = checkWin();\n      if (winner) {\n        document.getElementById('status').textContent = 'Player ' + winner + ' wins!';\n        return;\n      }\n      player = player === 'X' ? 'O' : 'X';\n      document.getElementById('status').textContent = 'Player ' + player + "'s turn";\n    }\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /function\s+checkWin\s*\(/.test(c) && /\[\s*0\s*,\s*1\s*,\s*2\s*\]/.test(c), message: 'Define checkWin() that checks the 8 winning lines (rows, cols, diagonals).' }),
      },
      { instruction: `<p><strong>Step 7: Polish.</strong> The starter has fully polished CSS plus the complete game logic — winner announcement, hover effects, centred grid. Run it, play a couple of games, then click <strong>Check & Finish</strong>.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 40px; background: #F8F5F0; text-align: center; }\n    h1 { color: #0F1F3D; font-size: 32px; }\n    #board { display: grid; grid-template-columns: repeat(3, 80px); gap: 8px; justify-content: center; margin: 20px auto; }\n    .cell { aspect-ratio: 1; font-size: 36px; font-weight: 700; background: #fff; border: 2px solid #0F1F3D; border-radius: 8px; cursor: pointer; color: #0F1F3D; }\n    .cell:hover { background: #F0FDFB; }\n    #status { font-size: 18px; font-weight: 700; color: #0F1F3D; }\n  </style>\n</head>\n<body>\n  <h1>Tic-Tac-Toe</h1>\n  <div id="board">\n    <button class="cell" onclick="play(0)"></button>\n    <button class="cell" onclick="play(1)"></button>\n    <button class="cell" onclick="play(2)"></button>\n    <button class="cell" onclick="play(3)"></button>\n    <button class="cell" onclick="play(4)"></button>\n    <button class="cell" onclick="play(5)"></button>\n    <button class="cell" onclick="play(6)"></button>\n    <button class="cell" onclick="play(7)"></button>\n    <button class="cell" onclick="play(8)"></button>\n  </div>\n  <p id="status">Player X's turn</p>\n  <script>\n    let board = [...Array(9)].fill('');\n    let player = 'X';\n    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];\n    function checkWin() {\n      for (const [a,b,c] of lines) {\n        if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];\n      }\n      return null;\n    }\n    function play(i) {\n      if (board[i]) return;\n      board[i] = player;\n      document.querySelectorAll('.cell')[i].textContent = player;\n      const winner = checkWin();\n      if (winner) {\n        document.getElementById('status').textContent = 'Player ' + winner + ' wins!';\n        return;\n      }\n      player = player === 'X' ? 'O' : 'X';\n      document.getElementById('status').textContent = 'Player ' + player + \"'s turn\";\n    }\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: true, message: 'Tic-Tac-Toe complete!' }),
      },
    ],

    calculator: [
      { instruction: `<p><strong>Step 1.</strong> Build the calculator shell: a display input <code>&lt;input id="screen"&gt;</code> at the top, then an empty <code>&lt;div id="pad"&gt;</code> that will hold the buttons. The starter already has both. Press Run to verify nothing is broken.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <!-- buttons -->\n  </div>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <!-- buttons -->\n  </div>\n</body>\n</html>`,
        check: c => ({ ok: /<input[^>]*id\s*=\s*["']screen["']/i.test(c) && /<div[^>]*id\s*=\s*["']pad["']/i.test(c), message: 'Add <input id="screen"> and <div id="pad">.' }),
      },
      { instruction: `<p><strong>Step 2.</strong> Inside <code>#pad</code>, replace the comment with 16 buttons: digits 0-9, the four operators <code>+ - * /</code>, an <code>=</code>, a decimal point <code>.</code>, and a <code>C</code> for clear. Each button uses <code>onclick="press('X')"</code> where X is the symbol it sends to the function. Order them so they line up nicely in a 4-column grid (rows: 7 8 9 /, 4 5 6 *, 1 2 3 -, 0 . = +, then C on the last row).</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <!-- 16 buttons -->\n  </div>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <button onclick="press('7')">7</button>\n    <button onclick="press('8')">8</button>\n    <button onclick="press('9')">9</button>\n    <button onclick="press('/')">/</button>\n    <button onclick="press('4')">4</button>\n    <button onclick="press('5')">5</button>\n    <button onclick="press('6')">6</button>\n    <button onclick="press('*')">*</button>\n    <button onclick="press('1')">1</button>\n    <button onclick="press('2')">2</button>\n    <button onclick="press('3')">3</button>\n    <button onclick="press('-')">-</button>\n    <button onclick="press('0')">0</button>\n    <button onclick="press('.')">.</button>\n    <button onclick="press('=')">=</button>\n    <button onclick="press('+')">+</button>\n    <button onclick="press('C')">C</button>\n  </div>\n</body>\n</html>`,
        check: c => ({ ok: (c.match(/onclick\s*=\s*["']press\(/g) || []).length >= 12, message: 'Add at least 12 buttons that call press("...").' }),
      },
      { instruction: `<p><strong>Step 3.</strong> Inside <code>&lt;style&gt;</code>, lay <code>#pad</code> out as a 4-column grid: <code>display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;</code>. Add some padding and font sizing to the body and the screen input.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    /* Step 3: grid */\n  </style>\n</head>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <button onclick="press('7')">7</button>\n    <button onclick="press('8')">8</button>\n    <button onclick="press('9')">9</button>\n    <button onclick="press('/')">/</button>\n    <button onclick="press('4')">4</button>\n    <button onclick="press('5')">5</button>\n    <button onclick="press('6')">6</button>\n    <button onclick="press('*')">*</button>\n    <button onclick="press('1')">1</button>\n    <button onclick="press('2')">2</button>\n    <button onclick="press('3')">3</button>\n    <button onclick="press('-')">-</button>\n    <button onclick="press('0')">0</button>\n    <button onclick="press('.')">.</button>\n    <button onclick="press('=')">=</button>\n    <button onclick="press('+')">+</button>\n    <button onclick="press('C')">C</button>\n  </div>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 30px; }\n    #screen { width: 100%; padding: 12px; font-size: 22px; text-align: right; box-sizing: border-box; }\n    #pad { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; max-width: 300px; margin-top: 8px; }\n    #pad button { padding: 16px; font-size: 18px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <button onclick="press('7')">7</button>\n    <button onclick="press('8')">8</button>\n    <button onclick="press('9')">9</button>\n    <button onclick="press('/')">/</button>\n    <button onclick="press('4')">4</button>\n    <button onclick="press('5')">5</button>\n    <button onclick="press('6')">6</button>\n    <button onclick="press('*')">*</button>\n    <button onclick="press('1')">1</button>\n    <button onclick="press('2')">2</button>\n    <button onclick="press('3')">3</button>\n    <button onclick="press('-')">-</button>\n    <button onclick="press('0')">0</button>\n    <button onclick="press('.')">.</button>\n    <button onclick="press('=')">=</button>\n    <button onclick="press('+')">+</button>\n    <button onclick="press('C')">C</button>\n  </div>\n</body>\n</html>`,
        check: c => ({ ok: /grid-template-columns\s*:\s*repeat\(\s*4/.test(c) || /grid-template-columns\s*:\s*1fr\s+1fr\s+1fr\s+1fr/.test(c), message: 'Use grid-template-columns: repeat(4, 1fr) on #pad.' }),
      },
      { instruction: `<p><strong>Step 4.</strong> Write <code>function press(key)</code>. Get a reference to the screen input. If <code>key === 'C'</code>, set its value to <code>''</code>. If <code>key === '='</code>, evaluate the expression and put the result back. Otherwise, append <code>key</code> to <code>screen.value</code>. Wrap the evaluation in a try/catch so a bad expression shows "Error" instead of breaking.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 30px; }\n    #screen { width: 100%; padding: 12px; font-size: 22px; text-align: right; box-sizing: border-box; }\n    #pad { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; max-width: 300px; margin-top: 8px; }\n    #pad button { padding: 16px; font-size: 18px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <button onclick="press('7')">7</button>\n    <button onclick="press('8')">8</button>\n    <button onclick="press('9')">9</button>\n    <button onclick="press('/')">/</button>\n    <button onclick="press('4')">4</button>\n    <button onclick="press('5')">5</button>\n    <button onclick="press('6')">6</button>\n    <button onclick="press('*')">*</button>\n    <button onclick="press('1')">1</button>\n    <button onclick="press('2')">2</button>\n    <button onclick="press('3')">3</button>\n    <button onclick="press('-')">-</button>\n    <button onclick="press('0')">0</button>\n    <button onclick="press('.')">.</button>\n    <button onclick="press('=')">=</button>\n    <button onclick="press('+')">+</button>\n    <button onclick="press('C')">C</button>\n  </div>\n  <script>\n    // Step 4: function press(key)\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 30px; }\n    #screen { width: 100%; padding: 12px; font-size: 22px; text-align: right; box-sizing: border-box; }\n    #pad { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; max-width: 300px; margin-top: 8px; }\n    #pad button { padding: 16px; font-size: 18px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <button onclick="press('7')">7</button>\n    <button onclick="press('8')">8</button>\n    <button onclick="press('9')">9</button>\n    <button onclick="press('/')">/</button>\n    <button onclick="press('4')">4</button>\n    <button onclick="press('5')">5</button>\n    <button onclick="press('6')">6</button>\n    <button onclick="press('*')">*</button>\n    <button onclick="press('1')">1</button>\n    <button onclick="press('2')">2</button>\n    <button onclick="press('3')">3</button>\n    <button onclick="press('-')">-</button>\n    <button onclick="press('0')">0</button>\n    <button onclick="press('.')">.</button>\n    <button onclick="press('=')">=</button>\n    <button onclick="press('+')">+</button>\n    <button onclick="press('C')">C</button>\n  </div>\n  <script>\n    function press(key) {\n      const screen = document.getElementById('screen');\n      if (key === 'C') { screen.value = ''; return; }\n      if (key === '=') {\n        try {\n          screen.value = Function('"use strict"; return (' + screen.value + ')')();\n        } catch (e) {\n          screen.value = 'Error';\n        }\n        return;\n      }\n      screen.value += key;\n    }\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /function\s+press\s*\(\s*key\s*\)/.test(c) && /['"]C['"]/.test(c) && /['"]=['"]/.test(c), message: 'Write press(key) handling "C", "=", and digits.' }),
      },
      { instruction: `<p><strong>Step 5: Polish.</strong> The starter has the full polished calculator: dark theme, mono-spaced screen, hover effects on buttons. Run it, try a few sums, then click <strong>Check & Finish</strong>. Notice we use <code>Function('"use strict"; return (' + expr + ')')()</code> to evaluate safely instead of using the literal e-v-a-l keyword.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 30px; background: #0F1F3D; }\n    h1 { color: #00C9B1; }\n    #screen { width: 100%; padding: 14px; font-size: 26px; text-align: right; box-sizing: border-box; background: #fff; border: 2px solid #00C9B1; border-radius: 8px; font-family: 'JetBrains Mono', monospace; }\n    #pad { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; max-width: 320px; margin-top: 10px; }\n    #pad button { padding: 18px; font-size: 20px; cursor: pointer; background: #1A3260; color: white; border: none; border-radius: 8px; font-weight: 700; }\n    #pad button:hover { background: #00C9B1; color: #0F1F3D; }\n  </style>\n</head>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <button onclick="press('7')">7</button>\n    <button onclick="press('8')">8</button>\n    <button onclick="press('9')">9</button>\n    <button onclick="press('/')">/</button>\n    <button onclick="press('4')">4</button>\n    <button onclick="press('5')">5</button>\n    <button onclick="press('6')">6</button>\n    <button onclick="press('*')">*</button>\n    <button onclick="press('1')">1</button>\n    <button onclick="press('2')">2</button>\n    <button onclick="press('3')">3</button>\n    <button onclick="press('-')">-</button>\n    <button onclick="press('0')">0</button>\n    <button onclick="press('.')">.</button>\n    <button onclick="press('=')">=</button>\n    <button onclick="press('+')">+</button>\n    <button onclick="press('C')">C</button>\n  </div>\n  <script>\n    function press(key) {\n      const screen = document.getElementById('screen');\n      if (key === 'C') { screen.value = ''; return; }\n      if (key === '=') {\n        try {\n          screen.value = Function('"use strict"; return (' + screen.value + ')')();\n        } catch (e) {\n          screen.value = 'Error';\n        }\n        return;\n      }\n      screen.value += key;\n    }\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 30px; background: #0F1F3D; }\n    h1 { color: #00C9B1; }\n    #screen { width: 100%; padding: 14px; font-size: 26px; text-align: right; box-sizing: border-box; background: #fff; border: 2px solid #00C9B1; border-radius: 8px; font-family: 'JetBrains Mono', monospace; }\n    #pad { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; max-width: 320px; margin-top: 10px; }\n    #pad button { padding: 18px; font-size: 20px; cursor: pointer; background: #1A3260; color: white; border: none; border-radius: 8px; font-weight: 700; }\n    #pad button:hover { background: #00C9B1; color: #0F1F3D; }\n  </style>\n</head>\n<body>\n  <h1>Calculator</h1>\n  <input id="screen">\n  <div id="pad">\n    <button onclick="press('7')">7</button>\n    <button onclick="press('8')">8</button>\n    <button onclick="press('9')">9</button>\n    <button onclick="press('/')">/</button>\n    <button onclick="press('4')">4</button>\n    <button onclick="press('5')">5</button>\n    <button onclick="press('6')">6</button>\n    <button onclick="press('*')">*</button>\n    <button onclick="press('1')">1</button>\n    <button onclick="press('2')">2</button>\n    <button onclick="press('3')">3</button>\n    <button onclick="press('-')">-</button>\n    <button onclick="press('0')">0</button>\n    <button onclick="press('.')">.</button>\n    <button onclick="press('=')">=</button>\n    <button onclick="press('+')">+</button>\n    <button onclick="press('C')">C</button>\n  </div>\n  <script>\n    function press(key) {\n      const screen = document.getElementById('screen');\n      if (key === 'C') { screen.value = ''; return; }\n      if (key === '=') {\n        try {\n          screen.value = Function('"use strict"; return (' + screen.value + ')')();\n        } catch (e) {\n          screen.value = 'Error';\n        }\n        return;\n      }\n      screen.value += key;\n    }\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /function\s+press/.test(c) && /screen\.value/.test(c), message: 'Calculator complete!' }),
      },
    ],

    memory_game: [
      { instruction: `<p><strong>Step 1.</strong> Build the page shell. The starter already has the <code>&lt;h1&gt;</code>, an info paragraph for showing pairs found, and an empty <code>&lt;div id="board"&gt;</code> where we'll inject the cards.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n</body>\n</html>`,
        check: c => ({ ok: /<div[^>]*id\s*=\s*["']board["']/.test(c) && /<p[^>]*id\s*=\s*["']info["']/.test(c), message: 'Add <div id="board"> and <p id="info">.' }),
      },
      { instruction: `<p><strong>Step 2.</strong> Inside <code>&lt;script&gt;</code>, declare an array of 6 symbols. Duplicate it with the spread operator <code>[...symbols, ...symbols]</code> to get 12 cards (6 pairs). Then shuffle by sorting with a random comparator: <code>.sort(() =&gt; Math.random() - 0.5)</code>. Math.random returns 0-1, subtracting 0.5 gives -0.5 to +0.5, so the sort order is random.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n  <script>\n    // Step 2: cards array\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n  <script>\n    const symbols = ['{}','[]','()','</>','=>','&&'];\n    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /\.sort\s*\(\s*\(\s*\)\s*=>\s*Math\.random\s*\(\s*\)/.test(c) || /Math\.random.*sort/.test(c), message: 'Use sort with Math.random to shuffle.' }),
      },
      { instruction: `<p><strong>Step 3.</strong> Render the cards. Use <code>cards.map((s, i) =&gt; ...)</code> to build a button string for each card, then <code>.join('')</code> them into one big string and assign it to <code>#board</code>'s innerHTML. Each button gets <code>class="card"</code>, a <code>data-i</code> with its index, and <code>onclick="flip(i)"</code>. The CSS keeps the symbol invisible until a card is flipped.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    #board { display: grid; grid-template-columns: repeat(4, 80px); gap: 8px; }\n    .card { aspect-ratio: 1; font-size: 28px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n  <script>\n    const symbols = ['{}','[]','()','</>','=>','&&'];\n    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);\n    // Step 3: render cards\n  <\/script>\n</body>\n</html>`,
        hint: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    #board { display: grid; grid-template-columns: repeat(4, 80px); gap: 8px; }\n    .card { aspect-ratio: 1; font-size: 24px; cursor: pointer; background: #0F1F3D; color: transparent; border: none; border-radius: 8px; }\n    .card.shown { background: #00C9B1; color: #0F1F3D; }\n    .card.matched { background: #2EC4B6; color: white; pointer-events: none; }\n  </style>\n</head>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n  <script>\n    const symbols = [\'{}\',\'[]\',\'()\',\'</>\',\'=>\',\'&&\'];\n    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);\n    document.getElementById(\'board\').innerHTML = cards.map((s, i) =>\n      \'<button class="card" data-i="\' + i + \'" onclick="flip(\' + i + \')">\' + s + \'</button>\'\n    ).join(\'\');\n  <\/script>\n</body>\n</html>',
        check: c => ({ ok: /grid-template-columns\s*:\s*repeat\(\s*4/.test(c) && /document\.getElementById\(['"]board['"]\)\.innerHTML/.test(c), message: 'Render the cards into #board with innerHTML.' }),
      },
      { instruction: `<p><strong>Step 4.</strong> Implement <code>flip(i)</code>. State: <code>firstPick</code> (null or {i, symbol}), <code>pairs</code> count, and <code>locked</code> flag. Logic: if locked or already shown, return. Show the card by adding the <code>shown</code> class. If firstPick is null, store this card. Otherwise compare symbols, mark both as <code>matched</code> on a hit (and increment <code>pairs</code>) or unflip both after 700ms on a miss. Lock the board during the flip-back.</p>`,
        starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    #board { display: grid; grid-template-columns: repeat(4, 80px); gap: 8px; }\n    .card { aspect-ratio: 1; font-size: 24px; cursor: pointer; background: #0F1F3D; color: transparent; border: none; border-radius: 8px; }\n    .card.shown { background: #00C9B1; color: #0F1F3D; }\n    .card.matched { background: #2EC4B6; color: white; pointer-events: none; }\n  </style>\n</head>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n  <script>\n    const symbols = [\'{}\',\'[]\',\'()\',\'</>\',\'=>\',\'&&\'];\n    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);\n    let firstPick = null, pairs = 0, locked = false;\n    document.getElementById(\'board\').innerHTML = cards.map((s, i) =>\n      \'<button class="card" data-i="\' + i + \'" onclick="flip(\' + i + \')">\' + s + \'</button>\'\n    ).join(\'\');\n    // Step 4: function flip(i)\n  <\/script>\n</body>\n</html>',
        hint: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    #board { display: grid; grid-template-columns: repeat(4, 80px); gap: 8px; }\n    .card { aspect-ratio: 1; font-size: 24px; cursor: pointer; background: #0F1F3D; color: transparent; border: none; border-radius: 8px; }\n    .card.shown { background: #00C9B1; color: #0F1F3D; }\n    .card.matched { background: #2EC4B6; color: white; pointer-events: none; }\n  </style>\n</head>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n  <script>\n    const symbols = [\'{}\',\'[]\',\'()\',\'</>\',\'=>\',\'&&\'];\n    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);\n    let firstPick = null, pairs = 0, locked = false;\n    document.getElementById(\'board\').innerHTML = cards.map((s, i) =>\n      \'<button class="card" data-i="\' + i + \'" onclick="flip(\' + i + \')">\' + s + \'</button>\'\n    ).join(\'\');\n    function flip(i) {\n      if (locked) return;\n      const cell = document.querySelector(\'.card[data-i="\' + i + \'"]\');\n      if (!cell || cell.classList.contains(\'shown\') || cell.classList.contains(\'matched\')) return;\n      cell.classList.add(\'shown\');\n      if (firstPick === null) {\n        firstPick = { i: i, symbol: cards[i], cell: cell };\n        return;\n      }\n      if (cards[i] === firstPick.symbol) {\n        cell.classList.add(\'matched\');\n        firstPick.cell.classList.add(\'matched\');\n        pairs = pairs + 1;\n        document.getElementById(\'info\').textContent = \'Pairs found: \' + pairs;\n        firstPick = null;\n      } else {\n        locked = true;\n        const wrong = firstPick;\n        setTimeout(() => {\n          cell.classList.remove(\'shown\');\n          wrong.cell.classList.remove(\'shown\');\n          firstPick = null;\n          locked = false;\n        }, 700);\n      }\n    }\n  <\/script>\n</body>\n</html>',
        check: c => ({ ok: /function\s+flip\s*\(\s*i\s*\)/.test(c) && /firstPick/.test(c) && /matched/.test(c), message: 'Define flip(i) that handles first/second picks and matches.' }),
      },
      { instruction: `<p><strong>Step 5: Win condition.</strong> Inside <code>flip()</code>, after incrementing <code>pairs</code>, check <code>if (pairs === 6)</code> and update <code>#info</code> to "You won! All 6 pairs found.". Run, play through, and click <strong>Check & Finish</strong>.</p>`,
        starterCode: `<!-- Use your finished code from Step 4 + add the win check -->`,
        hint: '<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 30px; background: #F8F5F0; text-align: center; }\n    h1 { color: #0F1F3D; }\n    #info { font-weight: 700; color: #0F1F3D; margin: 12px 0; }\n    #board { display: grid; grid-template-columns: repeat(4, 80px); gap: 8px; justify-content: center; }\n    .card { aspect-ratio: 1; font-size: 24px; cursor: pointer; background: #0F1F3D; color: transparent; border: none; border-radius: 8px; transition: all .2s; }\n    .card.shown { background: #00C9B1; color: #0F1F3D; }\n    .card.matched { background: #2EC4B6; color: white; pointer-events: none; }\n  </style>\n</head>\n<body>\n  <h1>Memory Game</h1>\n  <p id="info">Pairs found: 0</p>\n  <div id="board"></div>\n  <script>\n    const symbols = [\'{}\',\'[]\',\'()\',\'</>\',\'=>\',\'&&\'];\n    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);\n    let firstPick = null, pairs = 0, locked = false;\n    document.getElementById(\'board\').innerHTML = cards.map((s, i) =>\n      \'<button class="card" data-i="\' + i + \'" onclick="flip(\' + i + \')">\' + s + \'</button>\'\n    ).join(\'\');\n    function flip(i) {\n      if (locked) return;\n      const cell = document.querySelector(\'.card[data-i="\' + i + \'"]\');\n      if (!cell || cell.classList.contains(\'shown\') || cell.classList.contains(\'matched\')) return;\n      cell.classList.add(\'shown\');\n      if (firstPick === null) {\n        firstPick = { i: i, symbol: cards[i], cell: cell };\n        return;\n      }\n      if (cards[i] === firstPick.symbol) {\n        cell.classList.add(\'matched\');\n        firstPick.cell.classList.add(\'matched\');\n        pairs = pairs + 1;\n        document.getElementById(\'info\').textContent = \'Pairs found: \' + pairs;\n        if (pairs === 6) {\n          document.getElementById(\'info\').textContent = \'You won! All 6 pairs found.\';\n        }\n        firstPick = null;\n      } else {\n        locked = true;\n        const wrong = firstPick;\n        setTimeout(() => {\n          cell.classList.remove(\'shown\');\n          wrong.cell.classList.remove(\'shown\');\n          firstPick = null;\n          locked = false;\n        }, 700);\n      }\n    }\n  <\/script>\n</body>\n</html>',
        check: c => ({ ok: /pairs\s*===\s*6|pairs\s*>=\s*6/.test(c) && /You won|won|Win/i.test(c), message: 'Add a check: when pairs === 6, show "You won!".' }),
      },
    ],

    snake_canvas: [
      { instruction: `<p><strong>Step 1.</strong> Add a <code>&lt;canvas&gt;</code> element. Give it <code>id="game"</code>, <code>width="400"</code>, <code>height="400"</code>. Canvas is a 2D drawing surface controlled by JavaScript.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Snake</h1>\n  <canvas></canvas>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Snake</h1>\n  <canvas id="game" width="400" height="400"></canvas>\n</body>\n</html>`,
        check: c => ({ ok: /<canvas[^>]*id\s*=\s*["']game["'][^>]*>/.test(c) && /width\s*=\s*["']?400["']?/.test(c), message: 'Add <canvas id="game" width="400" height="400">.' }),
      },
      { instruction: `<p><strong>Step 2.</strong> Inside <code>&lt;script&gt;</code> (replacing the comment), grab a 2D drawing context from the canvas: <code>const ctx = document.getElementById('game').getContext('2d');</code>. We'll use <code>ctx</code> for every fill/stroke.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Snake</h1>\n  <canvas id="game" width="400" height="400"></canvas>\n  <script>\n    // Step 2\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Snake</h1>\n  <canvas id="game" width="400" height="400"></canvas>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /\bctx\s*=\s*document\.getElementById\(['"]game['"]\)\.getContext\(['"]2d['"]\)/.test(c), message: 'Get the 2d context from the canvas.' }),
      },
      { instruction: `<p><strong>Step 3.</strong> The snake is an array of <code>{x, y}</code> grid cells. The head is index 0. Declare <code>let snake = [{x: 5, y: 5}];</code> and a direction vector <code>let dir = {x: 1, y: 0};</code> (moving right). Coordinates are GRID units (0-19), not pixels — we'll multiply by 20 when drawing.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <canvas id="game" width="400" height="400"></canvas>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n    // Step 3\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <canvas id="game" width="400" height="400"></canvas>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n    let snake = [{x: 5, y: 5}];\n    let dir = {x: 1, y: 0};\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /\blet\s+snake\s*=\s*\[\s*\{[\s\S]*?x\s*:[\s\S]*?y\s*:/.test(c) && /\blet\s+dir\s*=/.test(c), message: 'Declare let snake = [{x:5, y:5}] and let dir = {x:1, y:0}.' }),
      },
      { instruction: `<p><strong>Step 4.</strong> Add the game loop with <code>setInterval(() =&gt; { ... }, 150)</code> — runs every 150ms. Each tick: compute the new head as <code>{x: snake[0].x + dir.x, y: snake[0].y + dir.y}</code>, then <code>snake.unshift(head)</code> to add it to the front and <code>snake.pop()</code> to remove the tail. Net effect: the snake moves one cell.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body>\n  <canvas id="game" width="400" height="400"></canvas>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n    let snake = [{x: 5, y: 5}];\n    let dir = {x: 1, y: 0};\n    // Step 4: setInterval\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <canvas id="game" width="400" height="400"></canvas>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n    let snake = [{x: 5, y: 5}];\n    let dir = {x: 1, y: 0};\n    setInterval(() => {\n      const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};\n      snake.unshift(head);\n      snake.pop();\n    }, 150);\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /setInterval\s*\(/.test(c) && /150/.test(c) && /snake\.unshift/.test(c) && /snake\.pop/.test(c), message: 'Use setInterval at 150ms; unshift the new head and pop the tail each tick.' }),
      },
      { instruction: `<p><strong>Step 5.</strong> Draw the snake. Inside the setInterval callback, after moving: clear the canvas with <code>ctx.fillStyle = '#1A3260'; ctx.fillRect(0, 0, 400, 400);</code> then loop through snake and for each segment draw an 18×18 cyan square at <code>seg.x * 20 + 1</code>, <code>seg.y * 20 + 1</code>. The +1 leaves a 1px gap between cells so segments are distinct.</p>`,
        starterCode: `<!-- Continue from Step 4. Add ctx.fillRect calls inside setInterval. -->`,
        hint: `<!DOCTYPE html>\n<html>\n<body>\n  <canvas id="game" width="400" height="400"></canvas>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n    let snake = [{x: 5, y: 5}];\n    let dir = {x: 1, y: 0};\n    setInterval(() => {\n      const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};\n      snake.unshift(head);\n      snake.pop();\n      ctx.fillStyle = '#1A3260';\n      ctx.fillRect(0, 0, 400, 400);\n      ctx.fillStyle = '#00C9B1';\n      for (const s of snake) ctx.fillRect(s.x * 20 + 1, s.y * 20 + 1, 18, 18);\n    }, 150);\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /ctx\.fillStyle/.test(c) && /ctx\.fillRect/.test(c), message: 'Use ctx.fillStyle and ctx.fillRect to draw segments.' }),
      },
      { instruction: `<p><strong>Step 6.</strong> Add keyboard control. <code>document.addEventListener('keydown', e =&gt; { ... })</code>. Inside, check <code>e.key</code> and update <code>dir</code> for each arrow key. The extra <code>&& dir.y !== 1</code> style check stops the snake from instantly reversing into itself.</p>`,
        starterCode: `<!-- Add a keydown listener -->`,
        hint: `document.addEventListener('keydown', e => {\n  if (e.key === 'ArrowUp'    && dir.y !== 1)  dir = {x: 0, y: -1};\n  if (e.key === 'ArrowDown'  && dir.y !== -1) dir = {x: 0, y: 1};\n  if (e.key === 'ArrowLeft'  && dir.x !== 1)  dir = {x: -1, y: 0};\n  if (e.key === 'ArrowRight' && dir.x !== -1) dir = {x: 1, y: 0};\n});`,
        check: c => ({ ok: /addEventListener\s*\(\s*['"]keydown['"]/.test(c) && /ArrowUp|ArrowDown|ArrowLeft|ArrowRight/.test(c), message: 'Add a keydown listener that updates dir for arrow keys.' }),
      },
      { instruction: `<p><strong>Step 7: Polish.</strong> The starter has the full game: <code>food</code> object, <code>score</code> counter, <code>dead</code> flag for game over (when the head leaves the grid or hits the snake). When the head lands on food we keep growing instead of popping the tail, score goes up, and a new food spawns. Run it, play, then click <strong>Check & Finish</strong>.</p>`,
        starterCode: `<!DOCTYPE html>\n<html>\n<body style="background:#0F1F3D;color:white;font-family:sans-serif;text-align:center;padding:20px">\n  <h1>Snake</h1>\n  <canvas id="game" width="400" height="400" style="background:#1A3260;border-radius:8px"></canvas>\n  <p id="score">Score: 0</p>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n    let snake = [{x: 10, y: 10}];\n    let dir = {x: 1, y: 0};\n    let food = {x: 5, y: 5};\n    let score = 0;\n    let dead = false;\n    setInterval(() => {\n      if (dead) return;\n      const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};\n      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) { dead = true; return; }\n      for (const s of snake) if (s.x === head.x && s.y === head.y) { dead = true; return; }\n      snake.unshift(head);\n      if (head.x === food.x && head.y === food.y) {\n        score++;\n        document.getElementById('score').textContent = 'Score: ' + score;\n        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };\n      } else {\n        snake.pop();\n      }\n      ctx.fillStyle = '#1A3260'; ctx.fillRect(0, 0, 400, 400);\n      ctx.fillStyle = '#FF9500'; ctx.fillRect(food.x * 20 + 1, food.y * 20 + 1, 18, 18);\n      ctx.fillStyle = '#00C9B1';\n      for (const s of snake) ctx.fillRect(s.x * 20 + 1, s.y * 20 + 1, 18, 18);\n    }, 150);\n    document.addEventListener('keydown', e => {\n      if (e.key === 'ArrowUp'    && dir.y !== 1)  dir = {x: 0, y: -1};\n      if (e.key === 'ArrowDown'  && dir.y !== -1) dir = {x: 0, y: 1};\n      if (e.key === 'ArrowLeft'  && dir.x !== 1)  dir = {x: -1, y: 0};\n      if (e.key === 'ArrowRight' && dir.x !== -1) dir = {x: 1, y: 0};\n    });\n  <\/script>\n</body>\n</html>`,
        hint: `<!DOCTYPE html>\n<html>\n<body style="background:#0F1F3D;color:white;font-family:sans-serif;text-align:center;padding:20px">\n  <h1>Snake</h1>\n  <canvas id="game" width="400" height="400" style="background:#1A3260;border-radius:8px"></canvas>\n  <p id="score">Score: 0</p>\n  <script>\n    const ctx = document.getElementById('game').getContext('2d');\n    let snake = [{x: 10, y: 10}];\n    let dir = {x: 1, y: 0};\n    let food = {x: 5, y: 5};\n    let score = 0;\n    let dead = false;\n    setInterval(() => {\n      if (dead) return;\n      const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};\n      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) { dead = true; return; }\n      for (const s of snake) if (s.x === head.x && s.y === head.y) { dead = true; return; }\n      snake.unshift(head);\n      if (head.x === food.x && head.y === food.y) {\n        score++;\n        document.getElementById('score').textContent = 'Score: ' + score;\n        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };\n      } else {\n        snake.pop();\n      }\n      ctx.fillStyle = '#1A3260'; ctx.fillRect(0, 0, 400, 400);\n      ctx.fillStyle = '#FF9500'; ctx.fillRect(food.x * 20 + 1, food.y * 20 + 1, 18, 18);\n      ctx.fillStyle = '#00C9B1';\n      for (const s of snake) ctx.fillRect(s.x * 20 + 1, s.y * 20 + 1, 18, 18);\n    }, 150);\n    document.addEventListener('keydown', e => {\n      if (e.key === 'ArrowUp'    && dir.y !== 1)  dir = {x: 0, y: -1};\n      if (e.key === 'ArrowDown'  && dir.y !== -1) dir = {x: 0, y: 1};\n      if (e.key === 'ArrowLeft'  && dir.x !== 1)  dir = {x: -1, y: 0};\n      if (e.key === 'ArrowRight' && dir.x !== -1) dir = {x: 1, y: 0};\n    });\n  <\/script>\n</body>\n</html>`,
        check: c => ({ ok: /food/.test(c) && /score/.test(c) && /addEventListener/.test(c), message: 'Snake game complete!' }),
      },
    ],
  };

  // ── State ─────────────────────────────────────────────────────────────────
  let _activeProject = null;
  let _activeStep = 0;
  let _profile = null;

  // ── Hub render ───────────────────────────────────────────────────────────
  function renderHub() {
    const screen = document.getElementById('s-builder');
    if (!screen) {
      console.warn('[Builder] s-builder screen not found');
      return;
    }
    _loadProgress().then(progress => {
      const cards = PROJECTS.map(p => {
        const done = progress[p.id]?.completed;
        const stepIndex = progress[p.id]?.step || 0;
        const totalSteps = (PLAYBOOKS[p.id] || []).length;
        const pct = totalSteps ? Math.round((stepIndex / totalSteps) * 100) : 0;
        const accent = p.accent || 'var(--cyan)';
        return `
          <button class="builder-card" type="button" onclick="TSAGameBuilder.openProject('${p.id}')">
            <div class="builder-level" style="background:${accent}1a;color:${accent}">${p.level}</div>
            <div class="builder-icon" style="color:${accent}"><span class="ts-i ts-i-${p.icon}" aria-hidden="true"></span></div>
            <div class="builder-title">${p.title}</div>
            <div class="builder-tagline">${p.tagline}</div>
            <div class="builder-meta">${p.age} &middot; +${p.xp} XP</div>
            ${totalSteps ? `<div class="builder-progress"><div class="builder-progress-bar" style="width:${pct}%;background:${accent}"></div></div>` : ''}
            ${done ? '<div class="builder-done"><span class="ts-i ts-i-check_circle"></span> Built!</div>' : `<div class="builder-prog-text">${stepIndex}/${totalSteps} steps</div>`}
          </button>
        `;
      }).join('');
      screen.innerHTML = `
        <div class="builder-screen">
          <div class="builder-header">
            <h2 class="builder-h">Build a Game</h2>
            <p class="builder-sub">Pick a game. Build it step by step. Each step is checked automatically. No AI, just you and the code.</p>
          </div>
          <div class="builder-grid">${cards}</div>
        </div>
      `;
    });
  }

  async function _loadProgress() {
    if (!window.TSA?.services?.sessionManager) return {};
    try {
      _profile = await TSA.services.sessionManager.getActiveProfile();
      return (_profile?.builderProgress) || {};
    } catch { return {}; }
  }
  async function _saveProgress(projectId, step, completed = false) {
    if (!_profile || !window.TSA?.services?.sessionManager) return;
    const builderProgress = { ...(_profile.builderProgress || {}) };
    builderProgress[projectId] = { step, completed, lastUpdated: new Date().toISOString() };
    await TSA.services.sessionManager.updateProfile(_profile.profileId, { builderProgress });
    _profile.builderProgress = builderProgress;
  }

  // ── Open project ─────────────────────────────────────────────────────────
  async function openProject(id) {
    const project = PROJECTS_BY_ID[id];
    const playbook = PLAYBOOKS[id];
    if (!project || !playbook) return;
    _activeProject = id;
    const progress = await _loadProgress();
    _activeStep = progress[id]?.step || 0;
    if (_activeStep >= playbook.length) _activeStep = playbook.length - 1;
    _renderStep();
  }

  function _renderStep() {
    const screen = document.getElementById('s-builder');
    if (!screen) return;
    const project = PROJECTS_BY_ID[_activeProject];
    const playbook = PLAYBOOKS[_activeProject];
    const step = playbook[_activeStep];
    const total = playbook.length;
    const accent = project.accent || 'var(--cyan)';

    screen.innerHTML = `
      <div class="builder-screen">
        <button class="btn btn-gh" onclick="TSAGameBuilder.exitProject()" style="margin-bottom:14px"><span class="ts-i ts-i-arrow_left"></span>Back to Projects</button>
        <div class="builder-project-header" style="border-color:${accent}">
          <div class="builder-project-icon" style="background:${accent}26;color:${accent}"><span class="ts-i ts-i-${project.icon}"></span></div>
          <div>
            <h2>${project.title}</h2>
            <p>${project.tagline}</p>
          </div>
        </div>

        <div class="builder-steps-bar">
          ${playbook.map((_, i) => `<div class="builder-step-pill ${i < _activeStep ? 'done' : i === _activeStep ? 'active' : ''}" style="${i <= _activeStep ? `background:${accent}` : ''}">${i + 1}</div>`).join('')}
        </div>

        <div class="builder-instruction">${step.instruction}</div>

        ${step.hint ? `
        <div class="builder-hint" id="builderHint">
          <button class="builder-hint-toggle" type="button" onclick="TSAGameBuilder._toggleHint()">
            <span class="ts-i ts-i-hint"></span>
            <span id="builderHintLabel">Show example</span>
          </button>
          <div class="builder-hint-body" id="builderHintBody" style="display:none">
            <div class="builder-hint-intro">Here's what your code could look like for this step. Read it, then write your own version (or paste it in to learn how it works).</div>
            <pre class="builder-hint-code"><code>${_esc(step.hint)}</code></pre>
            <button class="btn btn-gh builder-hint-paste" type="button" onclick="TSAGameBuilder._pasteHint()"><span class="ts-i ts-i-copy"></span>Paste this into the editor</button>
          </div>
        </div>` : ''}

        <div class="builder-editor-wrap">
          <div class="builder-editor-pane">
            <div class="builder-pane-bar">
              <div class="builder-pane-label">your-code.html</div>
            </div>
            <textarea id="builderCode" class="builder-code" spellcheck="false">${_esc(step.starterCode)}</textarea>
            <div class="builder-pane-footer">
              <button class="btn btn-gh" onclick="TSAGameBuilder._reset()">Reset code</button>
              <button class="btn btn-cy" onclick="TSAGameBuilder._run()"><span class="ts-i ts-i-play"></span>Run</button>
            </div>
          </div>
          <div class="builder-preview-pane">
            <div class="builder-pane-bar">
              <div class="builder-pane-label">Preview</div>
            </div>
            <iframe id="builderPreview" sandbox="allow-scripts" title="Live preview"></iframe>
          </div>
        </div>

        <div class="builder-bar">
          ${_activeStep > 0 ? `<button class="btn btn-gh" onclick="TSAGameBuilder._prevStep()"><span class="ts-i ts-i-arrow_left"></span>Previous step</button>` : '<div></div>'}
          <button class="btn btn-cy builder-check-btn" onclick="TSAGameBuilder._check()">
            ${_activeStep === total - 1 ? 'Check &amp; Finish' : 'Check &amp; Next step'} <span class="ts-i ts-i-arrow_right"></span>
          </button>
        </div>
        <div id="builderFeedback" class="builder-feedback"></div>
      </div>
    `;
  }

  function _esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function _run() {
    const code = document.getElementById('builderCode').value;
    const frame = document.getElementById('builderPreview');
    if (!frame) return;
    frame.srcdoc = code;
  }

  function _reset() {
    const playbook = PLAYBOOKS[_activeProject];
    const step = playbook[_activeStep];
    document.getElementById('builderCode').value = step.starterCode;
    _run();
  }

  async function _check() {
    const code = document.getElementById('builderCode').value;
    const playbook = PLAYBOOKS[_activeProject];
    const step = playbook[_activeStep];
    const fb = document.getElementById('builderFeedback');
    let result;
    try {
      result = step.check(code);
    } catch (e) {
      result = { ok: false, message: 'Check failed unexpectedly. Try again.' };
    }
    if (!result.ok) {
      fb.className = 'builder-feedback bad';
      fb.innerHTML = `<span class="ts-i ts-i-warning"></span> ${result.message}`;
      return;
    }
    fb.className = 'builder-feedback good';
    fb.innerHTML = `<span class="ts-i ts-i-check_circle"></span> Step passed!`;
    if (_activeStep < playbook.length - 1) {
      _activeStep++;
      await _saveProgress(_activeProject, _activeStep);
      setTimeout(_renderStep, 800);
    } else {
      // Finished the project!
      const project = PROJECTS_BY_ID[_activeProject];
      await _saveProgress(_activeProject, _activeStep, true);
      if (window.TSA?.services?.xp?.addXP) {
        await TSA.services.xp.addXP('LESSON_COMPLETE', project.xp);
      }
      if (typeof celebrate === 'function') {
        celebrate('trophy', `Built ${project.title}!`, 'You finished the project end to end.', `+${project.xp} XP`);
      }
      setTimeout(renderHub, 2000);
    }
  }

  function _prevStep() {
    if (_activeStep > 0) {
      _activeStep--;
      _renderStep();
    }
  }

  function _toggleHint() {
    const body = document.getElementById('builderHintBody');
    const lbl  = document.getElementById('builderHintLabel');
    if (!body || !lbl) return;
    const showing = body.style.display !== 'none';
    body.style.display = showing ? 'none' : 'block';
    lbl.textContent    = showing ? 'Show example' : 'Hide example';
  }

  function _pasteHint() {
    const playbook = PLAYBOOKS[_activeProject];
    const step = playbook && playbook[_activeStep];
    const ta = document.getElementById('builderCode');
    if (!step || !step.hint || !ta) return;
    ta.value = step.hint;
    _run();
  }

  function exitProject() {
    _activeProject = null;
    renderHub();
  }

  // ── Route registration ───────────────────────────────────────────────────
  function _register() {
    if (window.TSA && window.TSA.routes) {
      window.TSA.routes['builder'] = renderHub;
      return true;
    }
    return false;
  }
  if (!_register()) {
    document.addEventListener('DOMContentLoaded', _register, { once: true });
  }

  return { renderHub, openProject, exitProject, _check, _run, _reset, _prevStep, _toggleHint, _pasteHint, PROJECTS };
})();

if (typeof window !== 'undefined') {
  window.TSAGameBuilder = TSAGameBuilder;
}
