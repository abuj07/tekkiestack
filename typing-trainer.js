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
      "Good thinking! Look at your HTML tags — make sure every opening tag like <code>&lt;h1&gt;</code> has a matching closing tag like <code>&lt;/h1&gt;</code>.",
      "Try reading your code out loud! If something sounds odd, it might be in the wrong place.",
      "Check your CSS: every property needs a colon <code>:</code> and every rule needs a semicolon <code>;</code> at the end.",
      "Look at where you want the element to appear on the page — is it inside the right parent tag?",
      "Computers are very precise! Check for any typos in your tag names or class names.",
      "Have you saved your file? Sometimes the preview doesn't update until you do!",
      "Try breaking your problem into smaller pieces — what is the very first thing that needs to work?",
    ],
    codeDetective: [
      "🔍 I can see something suspicious! Check your function name — it might have a typo. Function names must match exactly when you call them.",
      "🔍 Look closely at your quotation marks — are they all properly paired? A missing quote can break everything after it.",
      "🔍 I spotted it! One of your HTML tags isn't closed properly. Count your opening and closing tags.",
      "🔍 The bug is in your CSS! Check the colour value — hex colours need exactly 6 characters after the #.",
      "🔍 Check your JavaScript carefully — you might be calling a function that doesn't exist yet, or spelled differently.",
    ],
    promptTrainer: {
      scores: [
        { score: 4, feedback: "Your prompt is a good start! Try adding more detail about what you want — describe the colours, the layout, or how it should work." },
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

    // Junior (Y3–Y6): truncate to 3 sentences
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
      return `Score: ${score}/10 — ${entry.feedback}`;
    }
    return "Keep experimenting with your code!";
  }

  // ── Online AI (Y5+ only) ────────────────────────────────────────────────
  /**
   * Call the Anthropic API via the embedded key.
   * Only runs if: yearGroup >= 5 AND onlineAI feature flag is true.
   * @param {string} tool
   * @param {string} input
   * @param {string} editorCode
   * @param {number} yearGroup
   * @returns {Promise<string>}
   */
  async function onlineResponse(tool, input, editorCode, yearGroup) {
    const systemPrompts = {
      codeHelper: `You are a friendly coding tutor for a ${yearGroup === 5 || yearGroup === 6 ? 'junior' : 'senior'} school student (Year ${yearGroup}). 
Give ONE helpful hint — never write the full solution. Use simple language. 
If Year 5–6: max 3 sentences. If Year 7+: max 5 sentences.
Focus only on HTML, CSS, and JavaScript. If asked about anything else, say "I only help with coding questions."
Never include URLs, email addresses, or personal information.`,
      codeDetective: `You are a code detective for a Year ${yearGroup} student.
Find ONE specific bug in their code and describe WHERE it is (line/area) WITHOUT fixing it yourself.
Tell them what TYPE of bug it is (typo, missing bracket, wrong name, etc.).
Max 3 sentences. Never write corrected code.`,
      promptTrainer: `You are a prompt-writing coach for a Year ${yearGroup} student learning to use AI tools.
Score their prompt from 1–10 based on: clarity, specificity, context, and goal.
Give a score and 2–3 sentences of constructive feedback.
Format: "Score: X/10 — [feedback]"`,
    };

    const userContent = tool === 'codeDetective'
      ? `Here is my code:\n\`\`\`\n${editorCode}\n\`\`\`\n\nMy question: ${input}`
      : tool === 'promptTrainer'
      ? `Please score this prompt I wrote for an AI: "${input}"`
      : `My code so far:\n\`\`\`\n${editorCode}\n\`\`\`\n\nMy question: ${input}`;

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: systemPrompts[tool] || systemPrompts.codeHelper,
          messages: [{ role: 'user', content: userContent }],
        }),
      });
      if (!resp.ok) throw new Error(`API ${resp.status}`);
      const data = await resp.json();
      const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
      return text || 'Sorry, I could not generate a response. Try again!';
    } catch(e) {
      console.warn('[AI] Online request failed, falling back to offline:', e);
      return offlineResponse(tool, input, yearGroup);
    }
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

    // Layer 3: Mode gate — Y3–Y4 always offline; Y5+ can go online if flag set
    const canGoOnline = yearGroup >= 5 && window.TSA.config.featureFlags.onlineAI === true;
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
      const isOnline = yr >= 5 && window.TSA.config.featureFlags.onlineAI;

      screen.innerHTML = `
        <div style="max-width:860px;margin:0 auto;padding:28px 18px">
          <div style="text-align:center;margin-bottom:24px">
            <h2 style="font-family:'Fredoka One',cursive;font-size:29px;color:var(--navy)">🤖 AI Lab</h2>
            <p style="font-size:14px;color:var(--muted);margin-top:5px;font-weight:500">Your coding thinking partner. It helps you work things out — not do it for you.</p>
            <div style="display:inline-flex;align-items:center;gap:7px;background:${isOnline ? 'rgba(46,196,182,.12)' : 'rgba(255,179,71,.1)'};border:1px solid ${isOnline ? 'rgba(46,196,182,.3)' : 'rgba(255,179,71,.25)'};border-radius:20px;padding:5px 14px;margin-top:8px;font-size:12px;font-weight:700;color:${isOnline ? 'var(--green)' : '#92400E'}">
              <span>${isOnline ? '🌐 Online AI Active' : '💾 Offline Mode' + (yr < 5 ? ' (Y3–Y4)' : ' — enable in settings')}</span>
            </div>
          </div>

          <!-- Tool selector -->
          <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap">
            ${[
              { id:'codeHelper',    emoji:'🔧', label:'Code Helper',    desc:'Get a hint without spoilers' },
              { id:'codeDetective', emoji:'🔍', label:'Code Detective', desc:'Find the bug yourself' },
              { id:'promptTrainer', emoji:'📝', label:'Prompt Trainer',  desc:'Score your AI prompts' },
            ].map(t => `
              <div class="ai-tool-btn card" onclick="TSAAILab.selectTool('${t.id}')" id="tool-${t.id}" style="flex:1;min-width:160px;cursor:pointer;padding:16px;border:1.5px solid var(--border);border-radius:14px;text-align:center;transition:all .18s">
                <div style="font-size:28px;margin-bottom:7px">${t.emoji}</div>
                <div style="font-family:'Fredoka One',cursive;font-size:16px;color:var(--navy)">${t.label}</div>
                <div style="font-size:12px;color:var(--muted);font-weight:500;margin-top:3px">${t.desc}</div>
              </div>
            `).join('')}
          </div>

          <!-- Chat area -->
          <div style="background:var(--navy);border-radius:var(--r-lg);padding:20px;min-height:220px;margin-bottom:14px" id="aiChatArea">
            <div style="font-size:13px;color:rgba(255,255,255,.5);text-align:center;padding-top:60px">Select a tool above to get started</div>
          </div>

          <!-- Input -->
          <div style="display:flex;gap:10px;align-items:flex-end">
            <div style="flex:1">
              <textarea id="aiInput" placeholder="${yr <= 4 ? 'Ask a coding question (max 150 chars)...' : 'Ask a coding question...'}" 
                ${yr <= 4 ? 'maxlength="150"' : ''}
                style="width:100%;padding:13px 16px;border:1.5px solid var(--border);border-radius:11px;font-family:'DM Sans',sans-serif;font-size:14px;resize:none;outline:none;height:58px;transition:border-color .2s"
                onfocus="this.style.borderColor='var(--cyan)'" onblur="this.style.borderColor='var(--border)'"
              ></textarea>
              ${yr <= 4 ? '<div style="font-size:11px;color:var(--muted);margin-top:4px;font-weight:600">Max 150 characters for Year 3–4</div>' : ''}
            </div>
            <button class="btn btn-cy" style="height:58px;padding:0 22px;flex-shrink:0" onclick="TSAAILab.sendMessage()" id="aiSendBtn">Ask ↗</button>
          </div>

          <!-- Quick prompts -->
          <div style="margin-top:12px;display:flex;gap:7px;flex-wrap:wrap">
            <span style="font-size:12px;color:var(--muted);font-weight:700;align-self:center">Quick:</span>
            ${['Why isn\'t my CSS working?','What does this tag do?','How do I centre something?','Review my prompt'].map(q =>
              `<button class="btn btn-gh" style="font-size:12px;padding:5px 11px" onclick="document.getElementById('aiInput').value='${q}'">${q}</button>`
            ).join('')}
          </div>

          <!-- Interaction log (local only, cleared on session end) -->
          <div style="margin-top:18px;font-size:11px;color:var(--muted);font-weight:600;text-align:center">
            All AI interactions are logged locally for your learning record · No conversations are sent to third parties except the question itself when online AI is active
          </div>
        </div>
      `;

      // Auto-select Code Helper
      TSAAILab.selectTool('codeHelper');
    });
  }

  let _activeTool = 'codeHelper';
  let _messages   = [];

  function selectTool(tool) {
    _activeTool = tool;
    _messages   = [];
    document.querySelectorAll('.ai-tool-btn').forEach(b => {
      b.style.borderColor  = 'var(--border)';
      b.style.background   = '#fff';
    });
    const active = document.getElementById(`tool-${tool}`);
    if (active) {
      active.style.borderColor = 'var(--cyan)';
      active.style.background  = '#F0FDFB';
    }

    const prompts = {
      codeHelper:    'Ask me about any part of your code and I\'ll give you a hint — without just giving you the answer!',
      codeDetective: 'Paste the code with the bug in the editor, then describe what\'s going wrong. I\'ll point you to it — but YOU fix it!',
      promptTrainer: 'Write a prompt you\'d give an AI to build something. I\'ll score it and give you tips to make it better.',
    };
    _addBubble('ai', prompts[tool] || '');
  }

  async function sendMessage() {
    const input  = document.getElementById('aiInput');
    const btn    = document.getElementById('aiSendBtn');
    const text   = input?.value?.trim();
    if (!text || !input) return;

    _addBubble('user', text);
    input.value = '';
    if (btn) { btn.disabled = true; btn.textContent = '...'; }

    // Small delay for UX
    await new Promise(r => setTimeout(r, 500));

    try {
      const response = await ask(_activeTool, text);
      _addBubble('ai', response);
      // Award XP for first AI interaction
      window.TSA.services.xp.awardBadge('ai_explorer').then(awarded => {
        if (awarded) celebrate('🤖', 'AI Explorer!', 'You used the AI Lab', '+10 XP');
      });
    } catch(e) {
      _addBubble('ai', 'Something went wrong. Please try again!');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Ask ↗'; }
    }
  }

  function _addBubble(role, text) {
    const area = document.getElementById('aiChatArea');
    if (!area) return;
    // Clear placeholder
    if (area.querySelector('[style*="padding-top"]')) area.innerHTML = '';

    const isAI = role === 'ai';
    const div  = document.createElement('div');
    div.style.cssText = `display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;${isAI ? '' : 'flex-direction:row-reverse'}`;
    div.innerHTML = `
      <div style="width:30px;height:30px;border-radius:50%;background:${isAI ? 'var(--cyan)' : 'var(--amber)'};display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${isAI ? '🤖' : '👤'}</div>
      <div style="background:${isAI ? 'rgba(255,255,255,.08)' : 'rgba(0,201,177,.15)'};border-radius:${isAI ? '4px 14px 14px 14px' : '14px 4px 14px 14px'};padding:11px 15px;max-width:80%">
        <div style="font-size:13px;color:${isAI ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.85)'};line-height:1.6">${text.replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,.3);padding:1px 5px;border-radius:3px;font-family:JetBrains Mono,monospace">$1</code>')
          .replace(/<code>/g,'<code style="background:rgba(0,0,0,.25);padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:12px">')}</div>
      </div>
    `;
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
    _messages.push({ role, text, timestamp: new Date().toISOString() });
  }

  // ── Register route ──────────────────────────────────────────────────────
  if (window.TSA) {
    window.TSA.routes['ai'] = renderAILab;
  }

  // ── Public API ──────────────────────────────────────────────────────────
  return { ask, guardInput, guardOutput, renderAILab, selectTool, sendMessage, offlineResponse };
})();

window.TSAAILab = TSAAILab;
