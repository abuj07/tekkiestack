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
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">🌐 HTML Structure — The Skeleton of Every Webpage</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Every website you've ever visited — YouTube, BBC, Roblox — is built on HTML. This is where it all starts.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">HTML (HyperText Markup Language) is the structure of a webpage — like the skeleton of a body. Without HTML, browsers would have no idea what to display. Every heading, paragraph, image, and button you've ever clicked is written in HTML.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;!DOCTYPE html&gt;</code> — Tells the browser this is a modern HTML5 document</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;html&gt;</code> — Everything on the page lives inside this tag</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;head&gt;</code> — Holds info <em>about</em> the page (title, stylesheets) — not visible to users</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;title&gt;</code> — The text shown on the browser tab</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;body&gt;</code> — Everything the user actually sees goes here</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h1&gt;</code> — The main heading (there should only be one per page)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;p&gt;</code> — A paragraph of text</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change the &lt;title&gt; text to your own name — check the browser tab updates</li>
            <li>Change the &lt;h1&gt; text to say hello with your real name</li>
            <li>Change the &lt;p&gt; text to describe something you're learning</li>
            <li>Add a second &lt;p&gt; tag underneath with your favourite hobby</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">The first ever webpage was published by Tim Berners-Lee on 6 August 1991. It had no CSS, no images — just HTML text. It's still live at <em>info.cern.ch</em>!</p>
        </div>
      </div>`,
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
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">📝 Headings & Paragraphs — Giving Your Page Structure</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Think of headings like the chapter titles in a book, and paragraphs like the text on each page. Every great webpage uses both.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">BBC News uses &lt;h1&gt; for the main story headline, &lt;h2&gt; for section headings, and &lt;p&gt; for every article paragraph. Roblox's website uses the same pattern. Good heading structure also helps people with screen readers navigate your page — and it helps Google rank it.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h1&gt;</code> — Biggest heading — the page title. Use only once.</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h2&gt;</code> — Section headings. You can use several on a page.</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;h3&gt; to &lt;h6&gt;</code> — Smaller sub-headings, used for nesting.</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;p&gt;</code> — Paragraph. Browsers add spacing above and below automatically.</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change the &lt;h1&gt; to your favourite topic (e.g. "My Favourite Things")</li>
            <li>Add a third &lt;h2&gt; section with a new category and &lt;p&gt; description</li>
            <li>Add an &lt;h3&gt; inside one section to create a sub-heading</li>
            <li>Try adding &lt;strong&gt;bold text&lt;/strong&gt; inside a paragraph</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">Google's search algorithm partially judges page quality by how well you use heading levels. A page with a clear h1, logical h2 sections, and descriptive paragraphs ranks higher than "div soup" with no structure.</p>
        </div>
      </div>`,
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
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">🎨 CSS Styling — Making It Beautiful</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">If HTML is the skeleton, CSS is the skin, clothes, and makeup. It controls every colour, font, and layout you see.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">Spotify's green, YouTube's red, Roblox's blue — all defined in CSS. Without CSS, every website would look like a plain Word document. CSS lets you control backgrounds, text colour, font sizes, spacing, and borders. It's what makes websites feel like brands.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">background: #0F1F3D;</code> — Sets the background colour using a hex code (6-digit colour code)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">color: white;</code> — Sets the text colour (this one uses a named colour)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">font-family: 'Segoe UI';</code> — Sets the font. The backup (sans-serif) is used if the font isn't found</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">padding: 36px;</code> — Adds 36px of inner space on all 4 sides inside the element</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">border-radius: 14px;</code> — Rounds the corners of the .card box</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">opacity: 0.8;</code> — Makes the text 80% opaque (slightly see-through)</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Change <code>background: #0F1F3D</code> in body to <code>#2D1B69</code> (deep purple)</li>
            <li>Change <code>color: #00C9B1</code> in h1 to <code>#FFB347</code> (orange)</li>
            <li>Change <code>font-size: 34px</code> to a larger or smaller value</li>
            <li>Try adding <code>border: 2px solid #00C9B1;</code> to the .card rule</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">CSS was invented in 1996 by Håkon Wium Lie. Before CSS, developers had to use messy HTML attributes to style everything. CSS separated "what it says" (HTML) from "how it looks" (CSS) — a game-changing idea that still drives the web today.</p>
        </div>
      </div>`,
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
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">📐 CSS Flexbox — Layouts That Actually Work</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Flexbox is how most professional websites line things up in rows and columns. Netflix's movie grid? Flexbox. YouTube's nav bar? Flexbox.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">Before Flexbox, laying out elements side by side required complicated hacks with floats and positioning that often broke. Flexbox (introduced in 2009, widely supported from 2015) made layouts simple: apply one property to the parent, and child elements line up automatically.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">display: flex;</code> — Turns the .row div into a flex container. Its children now line up in a row</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">gap: 16px;</code> — Adds 16px of space BETWEEN each child (no need for margins!)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">flex: 1;</code> — On each .box, this means "grow equally to fill available space" — so all cards are the same width</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes</h3>
          <ol style="font-size:14px;line-height:2.2;padding-left:18px">
            <li>Add <code>justify-content: center;</code> to .row and see the cards centre</li>
            <li>Add <code>flex-direction: column;</code> to .row and see them stack vertically</li>
            <li>Change <code>flex: 1</code> on the first .box to <code>flex: 2</code> — it grows twice as wide</li>
            <li>Add a fourth &lt;div class="box"&gt; — Flexbox automatically fits it in</li>
          </ol>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">CSS Flexbox was officially added to the CSS specification in 2012 after years of debate. Before it, developers used float:left hacks that required "clearfix" tricks. Flexbox made those obsolete overnight — it's now one of the most-used CSS features on the web.</p>
        </div>
      </div>`,
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
      explanation: `<div style="padding:20px;max-width:680px;font-family:'DM Sans',sans-serif">
        <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px">🔗 Links & Images — Connecting the Web</h2>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">Links are literally what make the World Wide Web a "web" — and images make it beautiful. These two tags are used on every single webpage ever made.</p>
        <div style="margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:8px">What this lesson teaches and why it matters</h3>
          <p style="font-size:14px;line-height:1.75">The &lt;a&gt; tag (anchor) creates links — between your own pages, or to other websites. The &lt;img&gt; tag embeds images. Together, they transform a plain text document into an interactive, visual experience. Your portfolio page needs both.</p>
        </div>
        <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🔍 Line-by-line explanation</h3>
          <div style="font-size:13px;line-height:2">
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;a href="URL"&gt;</code> — href = "hypertext reference" — the destination URL to link to</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">target="_blank"</code> — Opens the link in a new tab (without this, the current tab navigates away)</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">&lt;img src="URL" alt="..."&gt;</code> — src = the image source URL; alt = text shown if the image fails to load</div>
            <div><code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">max-width: 300px;</code> — Prevents the image being wider than 300px (important for responsive design)</div>
          </div>
        </div>
        <div style="background:var(--slate);border-radius:11px;padding:16px;margin-bottom:18px">
          <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">✏️ Try These Changes — Your Portfolio Page Checklist</h3>
          <p style="font-size:13px;color:var(--muted);margin-bottom:10px">Before you can call your portfolio page done, make sure it includes ALL of these:</p>
          <div style="font-size:14px;line-height:2.4">
            <div>☐  A &lt;h1&gt; with your name</div>
            <div>☐  A short paragraph describing who you are</div>
            <div>☐  At least one &lt;h2&gt; section (e.g. "My Projects" or "Skills")</div>
            <div>☐  At least one image (use picsum.photos for a placeholder)</div>
            <div>☐  At least one link to a website you like</div>
            <div>☐  CSS styling (background colour, font, at least one card/box)</div>
          </div>
        </div>
        <div style="background:#EFF6FF;border:1.5px solid #3B82F6;border-radius:11px;padding:14px">
          <div style="font-weight:700;color:#1E40AF;margin-bottom:6px;font-size:13px">💡 Did You Know?</div>
          <p style="font-size:13px;line-height:1.7">The alt attribute on images is legally required on some websites for accessibility. Screen readers for blind users read out the alt text instead of showing the image. Writing good alt text (descriptive, not just "image1") is a professional skill that many developers skip.</p>
        </div>
      </div>`,
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

    // Show explanation panel if the lesson has one
    const explPanel = document.getElementById('lessonExplanation');
    if (explPanel) {
      if (lesson.explanation) {
        explPanel.innerHTML = lesson.explanation + `
          <div style="padding:0 20px 20px">
            <button onclick="document.getElementById('lessonExplanation').style.display='none'"
              style="background:var(--cyan);color:var(--navy);border:none;padding:10px 24px;border-radius:9px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif">
              Got it — start coding ▶
            </button>
          </div>`;
        explPanel.style.display = 'block';
      } else {
        explPanel.style.display = 'none';
      }
    }

    // Clear the preview — show placeholder until user clicks Run
    const frame = document.getElementById('previewFrame');
    if (frame) {
      const fd = frame.contentDocument || frame.contentWindow?.document;
      if (fd) {
        fd.open();
        fd.write(`<html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#F8FAFC;font-family:'DM Sans',sans-serif;color:#8899AA;text-align:center">
          <div><div style="font-size:32px;margin-bottom:12px">▶</div><div style="font-size:14px;font-weight:600">Press <strong style="color:#0F1F3D">▶ Run</strong> to preview your code</div></div>
        </body></html>`);
        fd.close();
      }
    }

    // Render step dots
    if (typeof _renderStepDots === 'function') {
      _renderStepDots(lesson.num - 1, 5);
    }
  }

  function loadDebugChallenge() {
    const code = document.getElementById('codeInput');
    if (code) code.value = DEBUG_CHALLENGE.code;
    const title = document.getElementById('lessonTitle');
    const desc  = document.getElementById('lessonDesc');
    if (title) title.textContent = DEBUG_CHALLENGE.title;
    if (desc)  desc.textContent  = 'Find the bug in the JavaScript and fix it';

    // Hide explanation panel for debug challenges
    const explPanel = document.getElementById('lessonExplanation');
    if (explPanel) explPanel.style.display = 'none';

    // Clear preview — show placeholder
    const frame = document.getElementById('previewFrame');
    if (frame) {
      const fd = frame.contentDocument || frame.contentWindow?.document;
      if (fd) {
        fd.open();
        fd.write(`<html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#F8FAFC;font-family:'DM Sans',sans-serif;color:#8899AA;text-align:center">
          <div><div style="font-size:32px;margin-bottom:12px">🐛</div><div style="font-size:14px;font-weight:600">Fix the bug, then press <strong style="color:#0F1F3D">▶ Run</strong></div></div>
        </body></html>`);
        fd.close();
      }
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────
  // Note: mark-done is handled by markLessonDone() in index.html which uses
  // window.TSAQuizGate to gate completion. See modules/quiz-gate.js.
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
