/**
 * TekkieStack 2.0 — Support Chat Module (Stage 8)
 * EmailJS primary (200/month free tier) with mailto fallback.
 * Quick reply chips + ticket form.
 *
 * Config needed in .env (injected at build time or set in window.TSA.config):
 *   EMAILJS_SERVICE_ID
 *   EMAILJS_TEMPLATE_ID
 *   EMAILJS_PUBLIC_KEY
 *
 * Author: Aperintel Ltd
 */

const TSASupport = (() => {

  const QUICK_REPLIES = [
    { label: 'Create a profile',           msg: 'How do I create a new profile on TekkieStack?' },
    { label: 'I found a bug',              msg: 'I found a bug I would like to report.' },
    { label: 'How does AI Lab work?',      msg: 'Can you explain how the AI Lab works?' },
    { label: 'Report a technical issue',   msg: 'I am experiencing a technical issue with TekkieStack.' },
    { label: 'About lesson content',       msg: 'I have a question about the lesson content.' },
    { label: 'Account / profile help',     msg: 'I need help with my profile or session PIN.' },
  ];

  let _emailJsLoaded = false;

  // ── Load EmailJS SDK ────────────────────────────────────────────────────
  function _loadEmailJS() {
    return new Promise((resolve) => {
      if (window.emailjs) { _emailJsLoaded = true; return resolve(true); }
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      s.onload = () => {
        const key = window.TSA?.config?.emailjsPublicKey || '';
        if (key && window.emailjs) {
          window.emailjs.init({ publicKey: key });
          _emailJsLoaded = true;
          console.log('[Support] EmailJS loaded and initialised');
        }
        resolve(!!key);
      };
      s.onerror = () => { console.warn('[Support] EmailJS failed to load'); resolve(false); };
      document.head.appendChild(s);
    });
  }

  // ── Send email ──────────────────────────────────────────────────────────
  async function sendReport({ name, subject, message, category }) {
    const serviceId  = window.TSA?.config?.emailjsServiceId  || '';
    const templateId = window.TSA?.config?.emailjsTemplateId || '';

    if (serviceId && templateId && navigator.onLine) {
      await _loadEmailJS();
      if (_emailJsLoaded && window.emailjs) {
        try {
          await window.emailjs.send(serviceId, templateId, {
            from_name:    name    || 'TekkieStack User',
            subject:      subject || 'Support Request',
            message,
            category:     category || 'general',
            app_version:  window.TSA?.config?.version || '2.0.0',
            sent_at:      new Date().toLocaleString('en-GB'),
          });
          return { ok: true, method: 'emailjs' };
        } catch(e) {
          console.warn('[Support] EmailJS send failed, trying mailto fallback:', e);
        }
      }
    }

    // mailto fallback
    const body    = encodeURIComponent(`${message}\n\n---\nSent via TekkieStack v${window.TSA?.config?.version || '2.0.0'}`);
    const subj    = encodeURIComponent(subject || 'TekkieStack Support Request');
    const mailto  = `mailto:aperintel@gmail.com?subject=${subj}&body=${body}`;
    window.location.href = mailto;
    return { ok: true, method: 'mailto' };
  }

  // ── Render support screen ───────────────────────────────────────────────
  function renderSupport() {
    const screen = document.getElementById('s-support');
    if (!screen) return;

    screen.innerHTML = `
      <div style="max-width:800px;margin:0 auto;padding:30px 18px">
        <div style="text-align:center;margin-bottom:26px">
          <h2 style="font-family:'Fredoka One',cursive;font-size:28px;color:var(--navy)">💬 Help & Support</h2>
          <p style="font-size:14px;color:var(--muted);margin-top:5px;font-weight:500">We typically reply within 24 hours</p>
        </div>

        <!-- Quick replies -->
        <div class="card" style="margin-bottom:16px">
          <div class="clabel">Quick Questions</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px" id="quickReplies">
            ${QUICK_REPLIES.map(q => `
              <button class="btn btn-gh" style="font-size:13px;padding:7px 13px" onclick="TSASupport.selectQuick('${q.msg.replace(/'/g,"\\'")}')">
                ${q.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Contact form -->
        <div class="card">
          <div class="clabel">Send a Message</div>
          <div style="display:flex;flex-direction:column;gap:12px" id="supportForm">
            <div>
              <label style="font-size:13px;font-weight:700;color:var(--muted);display:block;margin-bottom:5px">Your name (optional)</label>
              <input id="sName" placeholder="First name..." style="width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none" onfocus="this.style.borderColor='var(--cyan)'" onblur="this.style.borderColor='var(--border)'">
            </div>
            <div>
              <label style="font-size:13px;font-weight:700;color:var(--muted);display:block;margin-bottom:5px">Category</label>
              <select id="sCategory" style="width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;background:#fff;cursor:pointer">
                <option value="bug">🐛 Bug Report</option>
                <option value="lesson">📚 Lesson Content</option>
                <option value="profile">👤 Profile / PIN</option>
                <option value="ai">🤖 AI Lab</option>
                <option value="suggestion">💡 Suggestion</option>
                <option value="general" selected>💬 General Question</option>
              </select>
            </div>
            <div>
              <label style="font-size:13px;font-weight:700;color:var(--muted);display:block;margin-bottom:5px">Message <span style="color:var(--coral)">*</span></label>
              <textarea id="sMessage" placeholder="Describe your question or issue in detail..." rows="5"
                style="width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;resize:vertical"
                onfocus="this.style.borderColor='var(--cyan)'" onblur="this.style.borderColor='var(--border)'"
              ></textarea>
            </div>
            <div id="supportMsg" style="min-height:20px"></div>
            <button class="btn btn-cy btn-full" onclick="TSASupport.submitForm()" id="sSendBtn">
              📧 Send Message
            </button>
            <p style="font-size:12px;color:var(--muted);text-align:center;font-weight:500">
              Your message goes to the Aperintel support team. We aim to reply within 24 hours.
              <br>No account needed · Your data stays on your device
            </p>
          </div>
        </div>

        <!-- FAQ -->
        <div class="card" style="margin-top:16px">
          <div class="clabel">Common Questions</div>
          ${[
            ['I forgot my PIN', 'If you forgot your PIN, a parent or teacher can delete the profile from the profile picker screen (long-press on desktop or use the settings when available) and create a new one. Progress is saved in backups for up to 5 snapshots.'],
            ['Does TekkieStack work offline?', 'Yes! TekkieStack is built offline-first. Once you\'ve loaded it once, everything works without an internet connection — except the online AI Lab feature.'],
            ['My progress disappeared', 'Progress is stored locally on your device. If you cleared your browser data, the progress may be gone. We recommend avoiding clearing browser data for sites you use regularly to preserve your learning progress.'],
            ['Can two children share a device?', 'Yes! TekkieStack supports up to 10 profiles per device. Each profile has its own PIN and separate progress.'],
          ].map(([q, a]) => `
            <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border)">
              <div style="font-size:14px;font-weight:700;color:var(--navy);margin-bottom:5px">❓ ${q}</div>
              <div style="font-size:13px;color:var(--muted);line-height:1.6;font-weight:500">${a}</div>
            </div>
          `).join('')}
          <div style="text-align:center;padding-top:4px">
            <button class="btn btn-cy" style="font-size:13px;padding:8px 16px" onclick="document.getElementById('sMessage').focus()">📬 Send us a message above</button>
          </div>
        </div>
      </div>
    `;
  }

  // ── Quick reply fill ────────────────────────────────────────────────────
  function selectQuick(msg) {
    const el = document.getElementById('sMessage');
    if (el) { el.value = msg; el.focus(); }
  }

  // ── Submit form ─────────────────────────────────────────────────────────
  async function submitForm() {
    const name     = document.getElementById('sName')?.value?.trim() || 'TekkieStack User';
    const category = document.getElementById('sCategory')?.value || 'general';
    const message  = document.getElementById('sMessage')?.value?.trim();
    const msgEl    = document.getElementById('supportMsg');
    const btn      = document.getElementById('sSendBtn');

    if (!message) {
      if (msgEl) { msgEl.innerHTML = '<span style="color:var(--coral);font-size:13px;font-weight:700">⚠ Please write a message before sending.</span>'; }
      return;
    }

    // Rate limit: max 3 support messages per 60 seconds
    if (window.TSASecurity) {
      const rate = TSASecurity.rateCheck('support-form', 3, 60000);
      if (!rate.allowed) {
        if (msgEl) msgEl.innerHTML = `<span style="color:var(--coral);font-size:13px;font-weight:700">⚠ Please wait ${rate.retryAfter} seconds before sending another message.</span>`;
        return;
      }
    }

    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    if (msgEl) msgEl.innerHTML = '';

    try {
      const result = await sendReport({
        name,
        subject: `[TekkieStack] ${category} — ${message.slice(0, 60)}`,
        message,
        category,
      });

      if (result.ok) {
        if (msgEl) {
          msgEl.innerHTML = `<div style="background:#EDFDF8;border:1px solid var(--green);border-radius:9px;padding:12px 15px;font-size:13px;font-weight:700;color:#0A6E56">
            ✅ ${result.method === 'emailjs' ? 'Report sent to the team. We\'ll reply within 24 hours.' : 'Your email app has opened. Please send the pre-filled email.'}
          </div>`;
        }
        document.getElementById('sMessage').value = '';
        document.getElementById('sName').value    = '';
      }
    } catch(e) {
      if (msgEl) { msgEl.innerHTML = '<span style="color:var(--coral);font-size:13px;font-weight:700">⚠ Could not send. Please try again or check your internet connection.</span>'; }
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '📧 Send Message'; }
    }
  }

  // ── Register route ──────────────────────────────────────────────────────
  if (window.TSA) {
    window.TSA.routes['support'] = renderSupport;
  }

  return { renderSupport, selectQuick, submitForm, sendReport };
})();

window.TSASupport = TSASupport;
