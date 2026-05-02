/**
 * TekkieStack 2.0 — AI Lab Module (Stage 7)
 * 3-layer safety system, 3 tools, offline simulated AI for Y3–Y4.
 * Online AI (claude-haiku) enabled for Y5+ when feature flag is on.
 *
 * Layer 1 (Input):  Strip PII, block off-topic, Y3–Y4 max 150 chars (offline only)
 * Layer 2 (Output): Junior max 3 sentences, strip URLs/emails
 * Layer 3 (Mode):   Online AI disabled by default; Y3–Y4 always offline
 *
 * Tools:
 *   Code Helper    — hints only, never rewrites code
 *   Code Detective — finds one bug, user must fix it themselves
 *   Prompt Trainer — scores a prompt 1–10 with feedback
 *
 * Author: Aperintel Ltd
 */

const TSAAILab = (() => {

  // ── Offline AI responses (Y3–Y4 + offline mode) ────────────────────────
  const OFFLINE_HINTS = {
    codeHelper: [
      "Good thinking! Look at your HTML tags, make sure every opening tag like <code>&lt;h1&gt;</code> has a matching closing tag like <code>&lt;/h1&gt;</code>.",
      "Try reading your code out loud! If something sounds odd, it might be in the wrong place.",
      "Check your CSS: every property needs a colon <code>:</code> and every rule needs a semicolon <code>;</code> at the end.",
      "Look at where you want the element to appear on the page, is it inside the right parent tag?",
      "Computers are very precise! Check for any typos in your tag names or class names.",
      "Have you saved your file? Sometimes the preview doesn't update until you do!",
      "Try breaking your problem into smaller pieces, what is the very first thing that needs to work?",
    ],
    codeDetective: [
      "🔍 I can see something suspicious! Check your function name, it might have a typo. Function names must match exactly when you call them.",
      "🔍 Look closely at your quotation marks, are they all properly paired? A missing quote can break everything after it.",
      "🔍 I spotted it! One of your HTML tags isn't closed properly. Count your opening and closing tags.",
      "🔍 The bug is in your CSS! Check the colour value, hex colours need exactly 6 characters after the #.",
      "🔍 Check your JavaScript carefully, you might be calling a function that doesn't exist yet, or spelled differently.",
    ],
    promptTrainer: {
      scores: [
        { score: 4, feedback: "Your prompt is a good start! Try adding more detail about what you want, describe the colours, the layout, or how it should work." },
        { score: 6, feedback: "Nice prompt! You've given me some context. To get an 8 or 9, try explaining *why* you need this and what success looks like." },
        { score: 7, feedback: "Good specific detail! To reach a 9, add: who will use this, what device they're on, and what should happen when it works perfectly." },
        { score: 8, feedback: "Really strong prompt! You've got context, specifics, and a clear goal. For a perfect 10, add examples of what you like or don't like." },
        { score: 9, feedback: "Excellent prompt! Clear, specific, and well-structured. You're thinking like a professional developer!" },
      ]
    }
  };

  // ── Safety Layer 1: Input guard ─────────────────────────────────────────
  /**
   * Sanitise and validate a user input.
   * @param {string} text
   * @param {number} yearGroup
   * @returns {{ ok: boolean, clean: string, reason: string }}
   */
  function guardInput(text, yearGroup) {
    if (!text || !text.trim()) return { ok: false, clean: '', reason: 'empty' };

    // Y3–Y4: hard char limit
    if (yearGroup <= 4 && text.length > 150) {
      return { ok: false, clean: '', reason: 'Y3–Y4 inputs must be under 150 characters. Try asking a shorter question.' };
    }

    // Strip potential PII patterns
    let clean = text
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email removed]')
      .replace(/\b\d{5,}\b/g, '[number removed]')         // phone-like numbers
      .replace(/https?:\/\/\S+/gi, '[link removed]');     // URLs

    // Block clearly off-topic inputs
    const offTopicPatterns = [
      /\b(homework|essay|story|poem|song|recipe|cook)\b/i,
      /\b(political|religion|war|weapon|drug|violence)\b/i,
      /\b(personal|address|password|secret|private)\b/i,
    ];
    for (const pattern of offTopicPatterns) {
      if (pattern.test(clean)) {
        return { ok: false, clean: '', reason: "I'm here to help with coding questions only! Try asking about HTML, CSS, or JavaScript." };
      }
    }

    return { ok: true, clean: clean.trim(), reason: '' };
  }

  // ── Safety Layer 2: Output guard ────────────────────────────────────────
  /**
   * Sanitise AI output before showing to user.
   * @param {string} text
   * @param {number} yearGroup
   * @returns {string}
   */
  function guardOutput(text, yearGroup) {
    if (!text) return '';

    // Strip URLs and emails from output
    let clean = text
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '');

    // Strip em-dashes — every AI response must use proper punctuation,
    // never the AI-shorthand em-dash. Backed by the system prompt rules
    // but this guarantees it even if a model ignores the instruction.
    clean = clean
      .replace(/ — /g, ', ')
      .replace(/\s—(?=\S)/g, ', ')
      .replace(/(?<=\w)—(?=\w)/g, '-')
      .replace(/—\s*/g, ', ');

    // Junior (Y3 to Y6): truncate to 3 sentences
    if (yearGroup <= 6) {
      const sentences = clean.match(/[^.!?]+[.!?]+/g) || [clean];
      clean = sentences.slice(0, 3).join(' ').trim();
    }

    return clean.trim();
  }

  // ── Offline AI ──────────────────────────────────────────────────────────
  /**
   * Generate an offline (simulated) AI response.
   * @param {string} tool
   * @param {string} input
   * @param {number} yearGroup
   * @returns {string}
   */
  function offlineResponse(tool, input, yearGroup) {
    const responses = OFFLINE_HINTS[tool];
    if (!responses) return "I'm not sure how to help with that. Try asking a coding question!";

    // Friendly greeting detector — kids will often say "hi" / "hello" first.
    // Without this, they'd get a random debugging hint that feels like a
    // non-sequitur. Match short greeting-only inputs.
    const trimmed = (input || '').trim().toLowerCase();
    const isGreeting =
      trimmed.length <= 20 &&
      /^(hi|hello|hey|hiya|yo|sup|howdy|good (morning|afternoon|evening))[\s!.?]*$/i.test(trimmed);
    if (isGreeting) {
      const greetings = {
        codeHelper:    "Hi! Ask me about a part of your code that's confusing you, or paste in something you're stuck on. I'll give you a hint to figure it out yourself.",
        codeDetective: "Hi there! Paste your buggy code in the editor and tell me what's going wrong. I'll point you to the bug, but you fix it.",
        promptTrainer: "Hello! Type a prompt you'd give an AI to build something. I'll score it from 1 to 10 and tell you how to make it better.",
      };
      return greetings[tool] || greetings.codeHelper;
    }

    // Very short inputs that aren't greetings: ask for more context.
    if (trimmed.length > 0 && trimmed.length < 6) {
      return "Could you tell me a bit more? Try asking a fuller question, like 'why isn't my button working?' or 'how do I centre an element?'.";
    }

    if (tool === 'codeHelper') {
      const idx = Math.floor(Math.random() * responses.length);
      return responses[idx];
    }
    if (tool === 'codeDetective') {
      const idx = Math.floor(Math.random() * responses.length);
      return responses[idx];
    }
    if (tool === 'promptTrainer') {
      // Score based on input length / quality signals
      const len   = input.length;
      const hasWho = /\bI\b|user|child|student/i.test(input);
      const hasWhat = /\bwant|need|create|build|make\b/i.test(input);
      const hasWhy  = /\bbecause|so that|in order|for\b/i.test(input);
      let score = 3;
      if (len > 30)  score++;
      if (len > 60)  score++;
      if (hasWho)    score++;
      if (hasWhat)   score++;
      if (hasWhy)    score++;
      score = Math.min(score, 9);
      const entry = responses.scores.find(s => s.score >= score) || responses.scores[responses.scores.length - 1];
      return `Score: ${score}/10, ${entry.feedback}`;
    }
    return "Keep experimenting with your code!";
  }

  // ── Online AI (Y5+ only) ────────────────────────────────────────────────
  /**
   * Call the AI via the /api/ai serverless function (key stays server-side).
   * Only runs if: yearGroup >= 5 AND onlineAI feature flag is true.
   * @param {string} tool
   * @param {string} input
   * @param {string} editorCode
   * @param {number} yearGroup
   * @returns {Promise<string>}
   */
  // Shared style rules appended to every AI Lab system prompt.
  // The em-dash rule prevents AI-shorthand "—" from leaking into user-facing text.
  const STYLE_RULES = `
STYLE RULES (mandatory, follow exactly):
- Never use em-dashes (—) in your response. Use commas, full stops, colons, parentheses, or split into separate sentences instead.
- Never use en-dashes (–) except for numeric ranges like "1–10".
- Use proper British English punctuation. Plain hyphens are fine for compound words ("real-time", "step-by-step").
- Do not write in an "AI-shorthand" style: avoid sentences that join clauses with " — " breaks.`;

  async function onlineResponse(tool, input, editorCode, yearGroup) {
    const systemPrompts = {
      codeHelper: `You are a friendly coding tutor for a ${yearGroup === 5 || yearGroup === 6 ? 'junior' : 'senior'} school student (Year ${yearGroup}).
Give ONE helpful hint, never write the full solution. Use simple language.
If Year 5 to 6: max 3 sentences. If Year 7 and above: max 5 sentences.
Focus only on HTML, CSS, and JavaScript. If asked about anything else, say "I only help with coding questions."
Never include URLs, email addresses, or personal information.${STYLE_RULES}`,
      codeDetective: `You are a code detective for a Year ${yearGroup} student.
Find ONE specific bug in their code and describe WHERE it is (line or area) WITHOUT fixing it yourself.
Tell them what TYPE of bug it is (typo, missing bracket, wrong name, and so on).
Max 3 sentences. Never write corrected code.${STYLE_RULES}`,
      promptTrainer: `You are a prompt-writing coach for a Year ${yearGroup} student learning to use AI tools.
Score their prompt from 1 to 10 based on: clarity, specificity, context, and goal.
Give a score and 2 to 3 sentences of constructive feedback.
Format: "Score: X/10, [feedback]"${STYLE_RULES}`,
    };

    const userContent = tool === 'codeDetective'
      ? `Here is my code:\n\`\`\`\n${editorCode}\n\`\`\`\n\nMy question: ${input}`
      : tool === 'promptTrainer'
      ? `Please score this prompt I wrote for an AI: "${input}"`
      : `My code so far:\n\`\`\`\n${editorCode}\n\`\`\`\n\nMy question: ${input}`;

    try {
      const resp = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userContent,
          system: systemPrompts[tool] || systemPrompts.codeHelper,
        }),
      });
      if (!resp.ok) throw new Error(`API ${resp.status}`);
      const data = await resp.json();
      return _scrubStyle(data.text) || 'Sorry, I could not generate a response. Try again!';
    } catch(e) {
      console.warn('[AI] Online request failed, falling back to offline:', e);
      return _scrubStyle(offlineResponse(tool, input, yearGroup));
    }
  }

  // Defence-in-depth: scrub em-dashes from any AI response before showing it.
  // The system prompt asks the model to avoid em-dashes, but this catches the
  // edge cases where a model ignores or partially-follows the instruction.
  function _scrubStyle(text) {
    if (!text || typeof text !== 'string') return text;
    return text
      .replace(/ — /g, ', ')           // " — "  (space em-dash space) -> ", "
      .replace(/\s—(?=\S)/g, ', ')     // " —word"                     -> ", word"
      .replace(/(?<=\w)—(?=\w)/g, '-') // "word—word"                  -> "word-word"
      .replace(/—\s*/g, ', ');         // any remaining lonely em-dash -> ", "
  }

  // ── Main ask function ───────────────────────────────────────────────────
  /**
   * Main entry point — routes to online or offline AI based on safety layer.
   * @param {string} tool   — 'codeHelper' | 'codeDetective' | 'promptTrainer'
   * @param {string} input  — user's question
   * @returns {Promise<string>} — response text
   */
  async function ask(tool, input) {
    // Rate limiting — max 8 AI requests per 20 seconds
    if (window.TSASecurity) {
      const rate = TSASecurity.rateCheck('ai-lab', 8, 20000);
      if (!rate.allowed) {
        TSASecurity.auditLog('rate_limit_hit', { tool, retryAfter: rate.retryAfter });
        return `Slow down a little! Wait ${rate.retryAfter} second${rate.retryAfter === 1 ? '' : 's'} before asking again.`;
      }
    }

    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    const yearGroup = profile?.yearGroup || 3;

    // Layer 1: Input guard
    const { ok, clean, reason } = guardInput(input, yearGroup);
    if (!ok) return reason || "Please ask a coding question!";

    // Layer 3: Mode gate — go online if flag is enabled (all year groups)
    const canGoOnline = window.TSA.config.featureFlags.onlineAI === true;
    const editorCode  = document.getElementById('codeInput')?.value || '';

    let response;
    if (canGoOnline) {
      response = await onlineResponse(tool, clean, editorCode, yearGroup);
    } else {
      response = offlineResponse(tool, clean, yearGroup);
    }

    // Layer 2: Output guard
    return guardOutput(response, yearGroup);
  }

  // ── UI render ───────────────────────────────────────────────────────────
  function renderAILab() {
    const screen = document.getElementById('s-ai');
    if (!screen) return;

    window.TSA.services.sessionManager.getActiveProfile().then(profile => {
      const yr = profile?.yearGroup || 3;
      const isOnline = window.TSA.config.featureFlags.onlineAI;
      const TOOLS = [
        { id:'codeHelper',    icon:'hint',     label:'Code Helper',    desc:'Get a hint without spoilers',
          quick:["Why isn't my CSS working?","What does this tag do?","How do I centre something?","My button doesn't click"] },
        { id:'codeDetective', icon:'bug',      label:'Code Detective', desc:'Find the bug yourself',
          quick:["What's wrong with my code?","I get a syntax error","My loop runs forever","Something prints undefined"] },
        { id:'promptTrainer', icon:'pencil',   label:'Prompt Trainer', desc:'Score your AI prompts',
          quick:["Build me a quiz game","Explain HTML to a 7 year old","Make a portfolio page","Write a fun bedtime story"] },
      ];

      screen.innerHTML = `
        <div class="ai-screen">
          <!-- Hero -->
          <div class="ai-hero">
            <div class="ai-hero-mascot" aria-hidden="true">
              <span class="ts-i ts-i-ai"></span>
              <span class="ai-hero-mascot-glow"></span>
            </div>
            <div class="ai-hero-text">
              <h2 class="ai-hero-title">AI Lab</h2>
              <p class="ai-hero-sub">Your coding thinking partner. I help you work things out, never just hand you the answer.</p>
              <div class="ai-hero-status ${isOnline ? 'online' : 'offline'}">
                <span class="ai-status-dot"></span>
                <span>${isOnline ? 'Online AI active' : 'Offline mode'}</span>
              </div>
            </div>
          </div>

          <!-- Tool tabs -->
          <div class="ai-tabs" role="tablist">
            ${TOOLS.map(t => `
              <button class="ai-tab ai-tool-btn" id="tool-${t.id}" role="tab"
                onclick="TSAAILab.selectTool('${t.id}')">
                <span class="ai-tab-icon"><span class="ts-i ts-i-${t.icon}" aria-hidden="true"></span></span>
                <div class="ai-tab-text">
                  <div class="ai-tab-label">${t.label}</div>
                  <div class="ai-tab-desc">${t.desc}</div>
                </div>
              </button>
            `).join('')}
          </div>

          <!-- Chat area -->
          <div class="ai-chat" id="aiChatArea">
            <div class="ai-chat-empty">
              <div class="ai-chat-empty-icon"><span class="ts-i ts-i-ai"></span></div>
              <div class="ai-chat-empty-text">Pick a tool above to get started.</div>
            </div>
          </div>

          <!-- Compose -->
          <div class="ai-compose">
            <textarea id="aiInput" rows="1"
              placeholder="${yr <= 4 ? 'Ask a coding question (max 150 chars)' : 'Ask a coding question, or paste a prompt to score'}"
              ${yr <= 4 ? 'maxlength="150"' : ''}
              onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();TSAAILab.sendMessage();}"></textarea>
            <button class="ai-send" id="aiSendBtn" onclick="TSAAILab.sendMessage()" aria-label="Send">
              <span class="ts-i ts-i-send" aria-hidden="true"></span>
            </button>
          </div>
          ${yr <= 4 ? '<div class="ai-compose-hint">Max 150 characters for Year 3 to 4</div>' : ''}

          <!-- Quick prompts (per tool) -->
          <div class="ai-quick" id="aiQuick"></div>

          <!-- Footer note -->
          <div class="ai-foot">
            <span class="ts-i ts-i-shield" aria-hidden="true"></span>
            All AI chats are logged locally on your device. Only your question is sent online when AI is active.
          </div>
        </div>
      `;

      // Auto-select Code Helper
      TSAAILab.selectTool('codeHelper');
    });
  }

  // Update the quick-prompt chips when a tool is selected
  function _renderQuickPrompts(tool) {
    const QUICK = {
      codeHelper:    ["Why isn't my CSS working?","What does this tag do?","How do I centre something?","My button doesn't click"],
      codeDetective: ["What's wrong with my code?","I get a syntax error","My loop runs forever","Something prints undefined"],
      promptTrainer: ["Build me a quiz game","Explain HTML to a 7 year old","Make a portfolio page","Write a fun bedtime story"],
    };
    const host = document.getElementById('aiQuick');
    if (!host) return;
    const prompts = QUICK[tool] || QUICK.codeHelper;
    host.innerHTML = `
      <span class="ai-quick-label">Try one:</span>
      ${prompts.map(q => `<button class="ai-quick-chip" onclick="document.getElementById('aiInput').value=this.dataset.q;document.getElementById('aiInput').focus();" data-q="${q.replace(/"/g,'&quot;')}">${q}</button>`).join('')}
    `;
  }

  let _activeTool = 'codeHelper';
  let _messages   = [];

  function selectTool(tool) {
    _activeTool = tool;
    _messages   = [];
    document.querySelectorAll('.ai-tab').forEach(b => b.classList.remove('active'));
    const active = document.getElementById(`tool-${tool}`);
    if (active) active.classList.add('active');

    // Reset chat area to a friendly opening message for the chosen tool
    const chat = document.getElementById('aiChatArea');
    if (chat) chat.innerHTML = '';

    const prompts = {
      codeHelper:    "Ask me about any part of your code. I'll give you a hint, never the full answer.",
      codeDetective: "Paste your buggy code in the editor, then describe what's going wrong. I'll point you to the bug, but you fix it!",
      promptTrainer: "Write a prompt you'd give an AI. I'll score it from 1 to 10 and tell you how to make it better.",
    };
    _addBubble('ai', prompts[tool] || '');
    _renderQuickPrompts(tool);
  }

  async function sendMessage() {
    const input  = document.getElementById('aiInput');
    const btn    = document.getElementById('aiSendBtn');
    const text   = input?.value?.trim();
    if (!text || !input) return;

    _addBubble('user', text);
    input.value = '';
    input.style.height = '';                   // reset auto-grow
    if (btn) btn.disabled = true;

    // Show typing indicator while waiting
    const typing = _addTypingIndicator();

    try {
      const response = await ask(_activeTool, text);
      typing?.remove();
      _addBubble('ai', response);
      // Award AI Explorer badge once
      window.TSA.services.xp.awardBadge('ai_explorer').then(awarded => {
        if (awarded) celebrate('ai', 'AI Explorer!', 'You used the AI Lab', '+10 XP');
      });
    } catch(e) {
      typing?.remove();
      _addBubble('ai', 'Something went wrong. Please try again!');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function _formatMessage(text) {
    if (!text) return '';
    // Escape HTML, then re-apply minimal markdown: `code` and **bold**
    const esc = String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return esc
      .replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function _addBubble(role, text) {
    const area = document.getElementById('aiChatArea');
    if (!area) return;
    // Clear placeholder if present
    const empty = area.querySelector('.ai-chat-empty');
    if (empty) empty.remove();

    const isAI = role === 'ai';
    const div  = document.createElement('div');
    div.className = `ai-msg ${isAI ? 'ai-msg-bot' : 'ai-msg-user'}`;
    div.innerHTML = `
      <div class="ai-msg-avatar">
        <span class="ts-i ts-i-${isAI ? 'ai' : 'profile'}" aria-hidden="true"></span>
      </div>
      <div class="ai-msg-bubble">${_formatMessage(text)}</div>
    `;
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
    _messages.push({ role, text, timestamp: new Date().toISOString() });
  }

  function _addTypingIndicator() {
    const area = document.getElementById('aiChatArea');
    if (!area) return null;
    const div = document.createElement('div');
    div.className = 'ai-msg ai-msg-bot ai-msg-typing';
    div.innerHTML = `
      <div class="ai-msg-avatar"><span class="ts-i ts-i-ai" aria-hidden="true"></span></div>
      <div class="ai-msg-bubble"><span class="ai-typing"><span></span><span></span><span></span></span></div>
    `;
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
    return div;
  }

  // ── Register route ──────────────────────────────────────────────────────
  if (window.TSA) {
    window.TSA.routes['ai'] = renderAILab;
  }

  // ── Public API ──────────────────────────────────────────────────────────
  return { ask, guardInput, guardOutput, renderAILab, selectTool, sendMessage, offlineResponse };
})();

window.TSAAILab = TSAAILab;
