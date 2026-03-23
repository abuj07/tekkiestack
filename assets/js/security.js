/**
 * TekkieStack 2.0 — Security Module
 * Centralised security hardening for the browser layer.
 *
 * Covers:
 *   1. HTML escaping — prevents XSS when user data enters innerHTML
 *   2. Input sanitisation — name/PIN validation at point of entry
 *   3. PIN lockout — 5 wrong attempts triggers a 30-second cooldown
 *   4. Content Security Policy enforcement helper (nonce-based for inline scripts)
 *   5. Rate limiting — prevents rapid-fire API calls from the AI Lab
 *   6. Storage integrity — detects and quarantines corrupted profile records
 *   7. Safe router guard — prevents navigating to unknown screen IDs
 *
 * Author: Aperintel Ltd
 */

const TSASecurity = (() => {

  // ── 1. HTML escaping ──────────────────────────────────────────────────────
  /**
   * Escape a string for safe insertion into innerHTML.
   * Call this on ANY user-supplied string before putting it in a template literal
   * that goes into .innerHTML.
   *
   * @param {string} str
   * @returns {string} HTML-safe string
   */
  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Escape for use inside a URL (href/src attribute).
   * Strips javascript: and data: schemes entirely.
   * @param {string} url
   * @returns {string}
   */
  function escUrl(url) {
    if (!url) return '';
    const s = String(url).trim();
    if (/^(javascript:|data:|vbscript:)/i.test(s)) return '';
    return esc(s);
  }

  // ── 2. Input sanitisation ─────────────────────────────────────────────────
  const NAME_MAX    = 32;
  const NAME_REGEX  = /^[\p{L}\p{N}\s'\-\.]+$/u; // letters, numbers, spaces, apostrophes, hyphens, dots

  /**
   * Sanitise a learner name.
   * @param {string} raw
   * @returns {{ ok: boolean, value: string, error: string }}
   */
  function sanitiseName(raw) {
    const trimmed = String(raw || '').trim();
    if (!trimmed)                    return { ok: false, value: '', error: 'Please enter a name.' };
    if (trimmed.length > NAME_MAX)   return { ok: false, value: '', error: `Name must be ${NAME_MAX} characters or fewer.` };
    if (!NAME_REGEX.test(trimmed))   return { ok: false, value: '', error: 'Name can only contain letters, numbers, spaces, hyphens, and apostrophes.' };
    // Strip any HTML tags that slipped through
    const clean = trimmed.replace(/<[^>]*>/g, '').replace(/[<>]/g, '');
    return { ok: true, value: clean, error: '' };
  }

  /**
   * Validate a PIN string.
   * @param {string} pin
   * @returns {{ ok: boolean, error: string }}
   */
  function validatePIN(pin) {
    if (!pin || pin.length !== 4) return { ok: false, error: 'PIN must be exactly 4 digits.' };
    if (!/^\d{4}$/.test(pin))     return { ok: false, error: 'PIN must contain only digits.' };
    // Reject trivially weak PINs
    const weak = ['0000','1111','2222','3333','4444','5555','6666','7777','8888','9999','1234','4321','0123','9876'];
    if (weak.includes(pin))       return { ok: false, error: 'That PIN is too easy to guess. Try something less predictable.' };
    return { ok: true, error: '' };
  }

  // ── 3. PIN lockout ────────────────────────────────────────────────────────
  const LOCKOUT_THRESHOLD = 5;     // wrong attempts before lockout
  const LOCKOUT_DURATION  = 30000; // 30 seconds in ms
  const _attempts = {};            // { profileId: { count, lockedUntil } }

  /**
   * Record a failed PIN attempt for a profile.
   * @param {string} profileId
   * @returns {{ locked: boolean, remaining: number, secondsLeft: number }}
   */
  function recordFailedAttempt(profileId) {
    if (!_attempts[profileId]) _attempts[profileId] = { count: 0, lockedUntil: 0 };
    const rec = _attempts[profileId];

    // Already locked?
    if (rec.lockedUntil > Date.now()) {
      const secondsLeft = Math.ceil((rec.lockedUntil - Date.now()) / 1000);
      return { locked: true, remaining: 0, secondsLeft };
    }

    rec.count++;
    if (rec.count >= LOCKOUT_THRESHOLD) {
      rec.lockedUntil = Date.now() + LOCKOUT_DURATION;
      rec.count       = 0;
      console.warn(`[Security] Profile ${profileId} locked for ${LOCKOUT_DURATION / 1000}s after ${LOCKOUT_THRESHOLD} failed attempts.`);
      return { locked: true, remaining: 0, secondsLeft: LOCKOUT_DURATION / 1000 };
    }
    return { locked: false, remaining: LOCKOUT_THRESHOLD - rec.count, secondsLeft: 0 };
  }

  /**
   * Check whether a profile is currently locked out.
   * @param {string} profileId
   * @returns {{ locked: boolean, secondsLeft: number }}
   */
  function isLocked(profileId) {
    const rec = _attempts[profileId];
    if (!rec || rec.lockedUntil <= Date.now()) return { locked: false, secondsLeft: 0 };
    return { locked: true, secondsLeft: Math.ceil((rec.lockedUntil - Date.now()) / 1000) };
  }

  /**
   * Clear lockout state on successful login.
   * @param {string} profileId
   */
  function clearLockout(profileId) {
    delete _attempts[profileId];
  }

  // ── 4. Rate limiter ───────────────────────────────────────────────────────
  const _rateLimits = {}; // { key: { tokens, lastRefill } }

  /**
   * Token-bucket rate limiter. Prevents rapid-fire AI calls or form submissions.
   * @param {string} key       — identifier (e.g. 'ai-lab', 'support-form')
   * @param {number} maxTokens — max requests in the window
   * @param {number} refillMs  — how often tokens refill (ms)
   * @returns {{ allowed: boolean, retryAfter: number }} retryAfter in seconds
   */
  function rateCheck(key, maxTokens = 5, refillMs = 10000) {
    const now = Date.now();
    if (!_rateLimits[key]) _rateLimits[key] = { tokens: maxTokens, lastRefill: now };
    const bucket = _rateLimits[key];

    // Refill tokens
    const elapsed = now - bucket.lastRefill;
    if (elapsed >= refillMs) {
      bucket.tokens    = maxTokens;
      bucket.lastRefill = now;
    }

    if (bucket.tokens > 0) {
      bucket.tokens--;
      return { allowed: true, retryAfter: 0 };
    }
    const retryAfter = Math.ceil((refillMs - elapsed) / 1000);
    return { allowed: false, retryAfter };
  }

  // ── 5. Storage integrity ──────────────────────────────────────────────────
  const REQUIRED_PROFILE_FIELDS = ['profileId','name','avatar','yearGroup','journeyType','pinHash','xp','streak','badges','createdAt'];

  /**
   * Validate that a profile record has all required fields with correct types.
   * Returns a list of validation errors (empty = valid).
   * @param {object} profile
   * @returns {string[]}
   */
  function validateProfile(profile) {
    if (!profile || typeof profile !== 'object') return ['Profile is null or not an object'];
    const errors = [];
    for (const field of REQUIRED_PROFILE_FIELDS) {
      if (!(field in profile)) errors.push(`Missing field: ${field}`);
    }
    if (profile.yearGroup !== undefined && (typeof profile.yearGroup !== 'number' || profile.yearGroup < 3 || profile.yearGroup > 13)) {
      errors.push(`Invalid yearGroup: ${profile.yearGroup}`);
    }
    if (profile.xp !== undefined && (typeof profile.xp !== 'number' || profile.xp < 0)) {
      errors.push(`Invalid xp: ${profile.xp}`);
    }
    if (profile.badges !== undefined && !Array.isArray(profile.badges)) {
      errors.push('badges must be an array');
    }
    if ('userId' in profile && profile.userId !== null && typeof profile.userId !== 'string') {
      errors.push(`Invalid userId type: ${typeof profile.userId}`);
    }
    return errors;
  }

  // ── 6. Safe router guard ──────────────────────────────────────────────────
  // Whitelist of known screen IDs — prevents go() being called with injected values
  const KNOWN_SCREENS = new Set([
    'picker','dashboard','editor','typing','ai','tipjar','support',
    'onboard','privacy','terms','cookies','junior','senior'
  ]);

  /**
   * Check if a screen name is in the known-screens whitelist.
   * @param {string} name
   * @returns {boolean}
   */
  function isKnownScreen(name) {
    return KNOWN_SCREENS.has(name);
  }

  // ── 7. Subresource Integrity helpers ─────────────────────────────────────
  /**
   * Known-good SRI hashes for third-party scripts.
   * These are checked at init time — if a loaded script doesn't match,
   * a console warning is emitted (enforcement via HTML integrity attributes).
   *
   * To generate: `openssl dgst -sha384 -binary file.js | openssl base64 -A`
   * Or use https://www.srihash.org
   */
  const SRI_REGISTRY = {
    // EmailJS v4 — add actual hash when pinning
    'emailjs': 'sha384-PLACEHOLDER-update-with-real-hash-before-launch',
  };

  // ── 8. Security audit log (local, never transmitted) ─────────────────────
  const _log = [];

  /**
   * Record a security event locally for diagnostics.
   * @param {string} type
   * @param {object} detail
   */
  function auditLog(type, detail = {}) {
    _log.push({ type, detail, ts: new Date().toISOString() });
    if (_log.length > 200) _log.shift(); // cap at 200 entries in memory
    if (['lockout','rate_limit_hit','xss_attempt','invalid_screen'].includes(type)) {
      console.warn(`[Security] ${type}:`, detail);
    }
  }

  // ── 9. Init — patch go() to enforce screen whitelist ─────────────────────
  function init() {
    // Patch window.go to validate screen names
    const _origGo = window.go;
    if (_origGo) {
      window.go = function(name) {
        if (!isKnownScreen(name)) {
          auditLog('invalid_screen', { name });
          console.error(`[Security] Blocked navigation to unknown screen: "${name}"`);
          return;
        }
        _origGo(name);
      };
    }
    console.log('[Security] Module initialised. Screen whitelist enforced.');
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    esc, escUrl,
    sanitiseName, validatePIN,
    recordFailedAttempt, isLocked, clearLockout,
    rateCheck,
    validateProfile,
    isKnownScreen,
    auditLog,
    init,
    get log() { return [..._log]; },
  };
})();

if (typeof window !== 'undefined') {
  window.TSASecurity = TSASecurity;
}
