/**
 * TekkieStack 2.0 — Code Editor Module
 * Handles lesson content, hint system, live preview, and lesson progress.
 * Built in Stage 5. Full lesson library added in Stage 9.
 *
 * Author: Aperintel Ltd
 */

const TSACodeEditor = (() => {

  // ── Phase 2 Lessons ──────────────────────────────────────────────────────
  const LESSONS = {
    'p2-l1': {
      id: 'p2-l1', phase: 2, num: 1,
      title: 'Phase 2 · Lesson 1 — HTML Structure',
      desc: 'Learn the anatomy of a web page',
      xp: 20,
      gateYr: 4,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is my first web page.</p>
</body>
</html>`,
      hints: [
        'Hint 1: Every web page starts with <code>&lt;!DOCTYPE html&gt;</code> — this tells the browser what kind of file it is.',
        'Hint 2: The <code>&lt;head&gt;</code> section holds information <em>about</em> the page. The <code>&lt;body&gt;</code> holds everything you actually <em>see</em>.',
        'Answer: Try changing the text inside <code>&lt;h1&gt;</code> and <code>&lt;p&gt;</code> to something about yourself!',
      ],
    },
    'p2-l2': {
      id: 'p2-l2', phase: 2, num: 2,
      title: 'Phase 2 · Lesson 2 — Headings & Paragraphs',
      desc: 'Use h1–h6 and p tags to structure content',
      xp: 20,
      gateYr: 4,
      starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>My Favourite Things</h1>
  <h2>Food</h2>
  <p>I love pizza and ice cream.</p>
  <h2>Games</h2>
  <p>My favourite game is Minecraft.</p>
</body>
</html>`,
      hints: [
        'Hint 1: Headings go from h1 (biggest) to h6 (smallest). Use them like chapters in a book.',
        'Hint 2: Each <code>&lt;p&gt;</code> tag creates a paragraph. The browser adds space above and below automatically.',
        'Answer: Try adding a third <code>&lt;h2&gt;</code> section with your own topic and a <code>&lt;p&gt;</code> underneath.',
      ],
    },
    'p2-l3': {
      id: 'p2-l3', phase: 2, num: 3,
      title: 'Phase 2 · Lesson 3 — CSS Styling',
      desc: 'Make your page look amazing with colours and fonts',
      xp: 20,
      gateYr: 4,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: #0F1F3D;
      color: white;
      font-family: 'Segoe UI', sans-serif;
      padding: 36px;
    }
    h1 { color: #00C9B1; font-size: 34px; }
    p  { font-size: 17px; line-height: 1.6; opacity: 0.8; }
    .card {
      background: rgba(255,255,255,0.08);
      padding: 20px;
      border-radius: 14px;
      margin-top: 20px;
      border: 1px solid rgba(255,255,255,0.12);
    }
  </style>
</head>
<body>
  <h1>Hello, I'm learning to code! 👋</h1>
  <p>I'm building my first web page with TekkieStack.</p>
  <div class="card">
    <p>My favourite colour is teal. 🩵</p>
  </div>
</body>
</html>`,
      hints: [
        'Hint 1: CSS lives inside <code>&lt;style&gt;</code> tags. Each rule says: "for THIS element, do THIS".',
        'Hint 2: Try changing <code>background: #0F1F3D;</code> to a different hex colour like <code>#2D1B69</code>.',
        'Answer: Change <code>color: #00C9B1;</code> on the h1 to a colour you like, such as <code>#FFB347</code> (orange).',
      ],
    },
    'p2-l4': {
      id: 'p2-l4', phase: 2, num: 4,
      title: 'Phase 2 · Lesson 4 — CSS Flexbox',
      desc: 'Control layout with flexbox — the most powerful CSS tool',
      xp: 20,
      gateYr: 4,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #F8F5F0; font-family: sans-serif; padding: 30px; }
    .row {
      display: flex;
      gap: 16px;
    }
    .box {
      background: #0F1F3D;
      color: white;
      padding: 24px;
      border-radius: 12px;
      flex: 1;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>My Cards</h1>
  <div class="row">
    <div class="box">Card One</div>
    <div class="box">Card Two</div>
    <div class="box">Card Three</div>
  </div>
</body>
</html>`,
      hints: [
        'Hint 1: <code>display: flex;</code> on a parent makes its children line up in a row automatically.',
        'Hint 2: <code>gap: 16px;</code> adds space between the flex children. Try changing the number.',
        'Answer: Try adding <code>justify-content: center;</code> to the <code>.row</code> to centre the cards.',
      ],
    },
    'p2-l5': {
      id: 'p2-l5', phase: 2, num: 5,
      title: 'Phase 2 · Lesson 5 — Links & Images',
      desc: 'Connect pages and add images with anchor and img tags',
      xp: 20,
      gateYr: 4,
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 30px; background: #F8F5F0; }
    a { color: #00A896; font-weight: bold; }
    img { border-radius: 12px; max-width: 300px; margin-top: 16px; }
  </style>
</head>
<body>
  <h1>My Links & Images</h1>
  <p>Visit <a href="https://www.bbc.co.uk" target="_blank">BBC News</a> for the latest news.</p>
  <br>
  <img src="https://picsum.photos/300/200" alt="A random photo">
  <p>Image from Picsum Photos</p>
</body>
</html>`,
      hints: [
        'Hint 1: <code>&lt;a href="URL"&gt;text&lt;/a&gt;</code> creates a link. <code>target="_blank"</code> opens it in a new tab.',
        'Hint 2: <code>&lt;img src="URL" alt="description"&gt;</code> embeds an image. The <code>alt</code> is important for accessibility.',
        'Answer: Try changing the <code>href</code> to your favourite website, and the <code>src</code> to <code>https://picsum.photos/400/200</code>.',
      ],
    },
  };

  // ── Debug challenge ──────────────────────────────────────────────────────
  const DEBUG_CHALLENGE = {
    id: 'debug-1', title: 'Daily Challenge — Fix the Broken Button',
    code: `<!-- 🐛 Debug Challenge — Fix the broken button! -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 28px; background: #0F1F3D; color: #fff; }
    button { background: #00C9B1; color: #0F1F3D; padding: 12px 22px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 700; }
    #msg { margin-top: 14px; font-size: 18px; }
  </style>
</head>
<body>
  <h2>Debug Challenge 🐛</h2>
  <p>The button does nothing. Find the typo and fix it!</p>
  <button onclick="showMsg()">Click me!</button>
  <p id="msg"></p>
  <script>
    // BUG: The function name has a typo!
    function showMssg() {
      document.getElementById("msg").textContent = "Fixed! 🎉";
    }
  <\/script>
</body>
</html>`
  };

  // ── Load a lesson into the editor ────────────────────────────────────────
  /**
   * @param {string} lessonId
   */
  function loadLesson(lessonId) {
    const lesson = LESSONS[lessonId];
    if (!lesson) return;

    const title  = document.getElementById('lessonTitle');
    const desc   = document.getElementById('lessonDesc');
    const code   = document.getElementById('codeInput');
    if (title) title.textContent = lesson.title;
    if (desc)  desc.textContent  = lesson.desc;
    if (code)  code.value        = lesson.starterCode;

    // Reset hints
    window._currentHints   = lesson.hints;
    window._currentHintTier = 0;
    window._currentLessonId = lessonId;
    window._currentLessonXp = lesson.xp;

    const bar = document.getElementById('hintBar');
    if (bar) bar.style.display = 'none';

    // Render step dots
    if (typeof _renderStepDots === 'function') {
      _renderStepDots(lesson.num - 1, 5);
    }

    runCode();
  }

  function loadDebugChallenge() {
    const code = document.getElementById('codeInput');
    if (code) code.value = DEBUG_CHALLENGE.code;
    const title = document.getElementById('lessonTitle');
    const desc  = document.getElementById('lessonDesc');
    if (title) title.textContent = DEBUG_CHALLENGE.title;
    if (desc)  desc.textContent  = 'Find the bug in the JavaScript and fix it';
    runCode();
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return { LESSONS, loadLesson, loadDebugChallenge };
})();

if (typeof window !== 'undefined') {
  window.TSACodeEditor = TSACodeEditor;
  // Register the editor route. This runs after app.js has created window.TSA,
  // but BEFORE the inline <script> at the bottom of index.html sets its own
  // TSA.routes['editor']. The inline script will overwrite this — which is fine
  // because the inline route calls TSACodeEditor.loadLesson() directly.
  // If TSA.routes['editor'] is already set (e.g. hot-reload), preserve it.
  if (window.TSA && !window.TSA.routes['editor']) {
    window.TSA.routes['editor'] = () => {
      setTimeout(() => {
        TSACodeEditor.loadLesson('p2-l3');
      }, 50);
    };
  }
}
