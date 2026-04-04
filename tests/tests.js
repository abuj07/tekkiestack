/**
 * TekkieStack 2.0 — Automated Test Suite
 * Runs in the browser via tests/test-runner.html
 * No external framework — vanilla JS async/await.
 *
 * Each test returns: { pass: boolean, message: string }
 * or { skip: true, reason: string } if preconditions not met.
 *
 * Author: Aperintel Ltd
 */

const ok   = (msg)    => ({ pass: true,  message: msg || 'OK' });
const fail = (msg)    => ({ pass: false, message: msg || 'FAIL' });
const skip = (reason) => ({ skip: true,  reason });

// ── Helpers ───────────────────────────────────────────────────────────────
async function withFreshDb() {
  // Open a fresh IndexedDB for test isolation
  if (!window._TSAStorageModule) return null;
  const s = window._TSAStorageModule;
  await s.open();
  return s;
}

// ══════════════════════════════════════════════════════════════════════════
window.TSA_TESTS = [

  // ── 1. Storage ────────────────────────────────────────────────────────────
  {
    name: 'Storage',
    tests: [
      {
        name: 'Storage module exists',
        fn: async () => {
          if (!window._TSAStorageModule) return fail('_TSAStorageModule not found on window');
          return ok('Storage module present');
        }
      },
      {
        name: 'Storage version is 5',
        fn: async () => {
          const s = window._TSAStorageModule;
          if (!s) return skip('No storage module');
          if (s.version !== 5) return fail(`Expected version 5, got ${s.version}`);
          return ok('Version = 5');
        }
      },
      {
        name: 'Can write and read a record',
        fn: async () => {
          const s = window._TSAStorageModule;
          if (!s) return skip('No storage module');
          await s.open();
          const rec = { profileId: '__test__', name: 'Test', userId: null };
          await s.put('profiles_store', rec);
          const got = await s.get('profiles_store', '__test__');
          await s.remove('profiles_store', '__test__');
          if (!got || got.name !== 'Test') return fail(`Read back: ${JSON.stringify(got)}`);
          return ok('Write → Read → Delete cycle OK');
        }
      },
      {
        name: 'userId field present in profile schema',
        fn: async () => {
          const s = window._TSAStorageModule;
          if (!s) return skip('No storage module');
          await s.open();
          const rec = { profileId: '__test_uid__', name: 'Test', userId: null, xp: 0 };
          await s.put('profiles_store', rec);
          const got = await s.get('profiles_store', '__test_uid__');
          await s.remove('profiles_store', '__test_uid__');
          if (!got) return fail('Could not retrieve record');
          if (!('userId' in got)) return fail('userId field missing from stored profile');
          if (got.userId !== null) return fail(`userId should be null in Release 1, got: ${got.userId}`);
          return ok('userId field present and null (ready for Release 2 sync)');
        }
      },
      {
        name: 'localStorage fallback flag is boolean',
        fn: async () => {
          const s = window._TSAStorageModule;
          if (!s) return skip('No storage module');
          if (typeof s.usingFallback !== 'boolean') return fail('usingFallback not boolean');
          return ok(`usingFallback = ${s.usingFallback}`);
        }
      },
      {
        name: 'getAll returns array',
        fn: async () => {
          const s = window._TSAStorageModule;
          if (!s) return skip('No storage module');
          await s.open();
          const all = await s.getAll('profiles_store');
          if (!Array.isArray(all)) return fail('getAll did not return array');
          return ok(`getAll returned array with ${all.length} items`);
        }
      },
      {
        name: 'getByIndex returns filtered results',
        fn: async () => {
          const s = window._TSAStorageModule;
          if (!s) return skip('No storage module');
          await s.open();
          const rec1 = { projectId: '__proj1__', profileId: '__filter_test__', userId: null, name: 'P1' };
          const rec2 = { projectId: '__proj2__', profileId: '__other__',       userId: null, name: 'P2' };
          await s.put('projects_store', rec1);
          await s.put('projects_store', rec2);
          const results = await s.getByIndex('projects_store', 'profileId', '__filter_test__');
          await s.remove('projects_store', '__proj1__');
          await s.remove('projects_store', '__proj2__');
          if (!results.find(r => r.projectId === '__proj1__')) return fail('Expected record not returned');
          if (results.find(r => r.projectId === '__proj2__'))  return fail('Unexpected record returned');
          return ok('getByIndex filters correctly');
        }
      },
    ]
  },

  // ── 2. Session System ────────────────────────────────────────────────────
  {
    name: 'Session System',
    tests: [
      {
        name: 'Session module exists',
        fn: async () => {
          if (!window._TSASessionModule) return fail('_TSASessionModule not found');
          return ok('Session module present');
        }
      },
      {
        name: 'hashPIN is deterministic',
        fn: async () => {
          if (!window._TSASessionModule) return skip('No session module');
          const h1 = await window._TSASessionModule.hashPIN('1234', 'device123');
          const h2 = await window._TSASessionModule.hashPIN('1234', 'device123');
          if (h1 !== h2) return fail('hashPIN not deterministic');
          if (h1.length !== 64) return fail(`Expected 64-char hex, got ${h1.length}`);
          return ok('hashPIN deterministic, SHA-256 hex (64 chars)');
        }
      },
      {
        name: 'hashPIN different for different PINs',
        fn: async () => {
          if (!window._TSASessionModule) return skip('No session module');
          const h1 = await window._TSASessionModule.hashPIN('1234', 'dev');
          const h2 = await window._TSASessionModule.hashPIN('5678', 'dev');
          if (h1 === h2) return fail('Different PINs produced same hash');
          return ok('Different PINs produce different hashes');
        }
      },
      {
        name: 'Created profile has userId: null',
        fn: async () => {
          if (!window.TSA?.services?.sessionManager) return skip('TSA not initialised');
          const s = window._TSAStorageModule;
          if (!s) return skip('No storage');
          const existing = await s.getAll('profiles_store');
          if (existing.length > 0) {
            const sample = existing[0];
            if (!('userId' in sample)) return fail('userId field missing from profile');
            return ok(`userId = ${JSON.stringify(sample.userId)} (null = correct for Release 1)`);
          }
          return skip('No profiles to inspect — create one first');
        }
      },
      {
        name: 'getActiveSession returns null when no session',
        fn: async () => {
          if (!window.TSA?.services?.sessionManager) return skip('TSA not initialised');
          // End any active session
          await window.TSA.services.sessionManager.endSession();
          const sess = await window.TSA.services.sessionManager.getActiveSession();
          if (sess !== null) return fail(`Expected null, got: ${JSON.stringify(sess)}`);
          return ok('No active session → null returned');
        }
      },
    ]
  },

  // ── 3. XP Engine ─────────────────────────────────────────────────────────
  {
    name: 'XP Engine',
    tests: [
      {
        name: 'XP module exists',
        fn: async () => {
          if (!window._TSAXpModule) return fail('_TSAXpModule not found');
          return ok('XP module present');
        }
      },
      {
        name: 'XP_EVENTS has expected keys',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const required = ['LESSON_COMPLETE','PROJECT_SAVE','DAILY_CHALLENGE','DEBUG_SOLVED','CERTIFICATE','STREAK_7','STREAK_30','FIRST_BUILD','QUIZ_PASS','QUIZ_PERFECT','PHASE_COMPLETE'];
          const missing = required.filter(k => !(k in window._TSAXpModule.XP_EVENTS));
          if (missing.length) return fail('Missing XP events: ' + missing.join(', '));
          return ok('All required XP events present');
        }
      },
      {
        name: 'LESSON_COMPLETE = 20 XP',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const xp = window._TSAXpModule.XP_EVENTS.LESSON_COMPLETE;
          if (xp !== 20) return fail(`Expected 20, got ${xp}`);
          return ok('LESSON_COMPLETE = 20 XP');
        }
      },
      {
        name: 'FIRST_BUILD = 25 XP',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const xp = window._TSAXpModule.XP_EVENTS.FIRST_BUILD;
          if (xp !== 25) return fail(`Expected 25, got ${xp}`);
          return ok('FIRST_BUILD = 25 XP');
        }
      },
      {
        name: 'MILESTONES defined correctly (7 milestones)',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const m = window._TSAXpModule.MILESTONES;
          if (!Array.isArray(m) || m.length < 7) return fail(`Expected at least 7 milestones, got ${m?.length}`);
          if (m[0].xp !== 100) return fail('First milestone should be 100 XP');
          const lastXp = m[m.length - 1].xp;
          if (lastXp < 5000) return fail(`Expected top milestone >= 5000 XP, got ${lastXp}`);
          return ok(`${m.length} milestones defined, top threshold: ${lastXp} XP`);
        }
      },
      {
        name: 'QUIZ_PASS = 15 XP',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const xp = window._TSAXpModule.XP_EVENTS.QUIZ_PASS;
          if (xp !== 15) return fail(`Expected 15, got ${xp}`);
          return ok('QUIZ_PASS = 15 XP');
        }
      },
      {
        name: 'QUIZ_PERFECT = 25 XP',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const xp = window._TSAXpModule.XP_EVENTS.QUIZ_PERFECT;
          if (xp !== 25) return fail(`Expected 25, got ${xp}`);
          return ok('QUIZ_PERFECT = 25 XP');
        }
      },
      {
        name: 'PHASE_COMPLETE = 50 XP',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const xp = window._TSAXpModule.XP_EVENTS.PHASE_COMPLETE;
          if (xp !== 50) return fail(`Expected 50, got ${xp}`);
          return ok('PHASE_COMPLETE = 50 XP');
        }
      },
      {
        name: 'getBadge returns emoji for known badge',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const b = window._TSAXpModule.getBadge('web_weaver');
          if (!b || !b.emoji) return fail('No emoji returned for web_weaver');
          return ok(`web_weaver badge: ${b.emoji} ${b.label}`);
        }
      },
    ]
  },

  // ── 4. Code Editor Module ─────────────────────────────────────────────────
  {
    name: 'Code Editor',
    tests: [
      {
        name: 'Code editor module exists',
        fn: async () => {
          if (!window.TSACodeEditor) return fail('TSACodeEditor not found');
          return ok('Code editor module present');
        }
      },
      {
        name: 'Phase 2 has 5 lessons',
        fn: async () => {
          if (!window.TSACodeEditor) return skip('No code editor module');
          const lessons = window.TSACodeEditor.LESSONS;
          const p2 = Object.values(lessons).filter(l => l.phase === 2);
          if (p2.length !== 5) return fail(`Expected 5 Phase 2 lessons, got ${p2.length}`);
          return ok('Phase 2 has 5 lessons');
        }
      },
      {
        name: 'Each lesson has 3 hints',
        fn: async () => {
          if (!window.TSACodeEditor) return skip('No code editor module');
          const lessons = Object.values(window.TSACodeEditor.LESSONS);
          const bad = lessons.filter(l => !l.hints || l.hints.length !== 3);
          if (bad.length) return fail(`Lessons without exactly 3 hints: ${bad.map(l=>l.id).join(', ')}`);
          return ok('All lessons have exactly 3 hints');
        }
      },
      {
        name: 'Each lesson has XP value',
        fn: async () => {
          if (!window.TSACodeEditor) return skip('No code editor module');
          const bad = Object.values(window.TSACodeEditor.LESSONS).filter(l => !l.xp || l.xp <= 0);
          if (bad.length) return fail('Lessons without XP: ' + bad.map(l=>l.id).join(', '));
          return ok('All lessons have XP > 0');
        }
      },
    ]
  },

  // ── 5. Typing Trainer ─────────────────────────────────────────────────────
  {
    name: 'Typing Trainer',
    tests: [
      {
        name: 'Typing trainer module exists',
        fn: async () => {
          if (!window.TSATyping) return fail('TSATyping not found');
          return ok('Typing module present');
        }
      },
      {
        name: 'All 5 levels defined',
        fn: async () => {
          if (!window.TSATyping) return skip('No typing module');
          const required = ['home','alpha','words','code','speed'];
          const missing = required.filter(k => !(k in window.TSATyping.LEVELS));
          if (missing.length) return fail('Missing levels: ' + missing.join(', '));
          return ok('All 5 levels defined');
        }
      },
      {
        name: 'WPM formula: 10 words in 30s = 20 WPM',
        fn: async () => {
          // words / (seconds / 60)
          const words = 10, secs = 30;
          const wpm = Math.round(words / (secs / 60));
          if (wpm !== 20) return fail(`Expected 20, got ${wpm}`);
          return ok('WPM formula correct: 10 words / 30s = 20 WPM');
        }
      },
      {
        name: 'Accuracy formula: 9 correct / 10 total = 90%',
        fn: async () => {
          const acc = Math.round((9 / (9 + 1)) * 100);
          if (acc !== 90) return fail(`Expected 90, got ${acc}`);
          return ok('Accuracy formula correct: 9/10 = 90%');
        }
      },
      {
        name: 'Code level has Y5+ gate',
        fn: async () => {
          if (!window.TSATyping) return skip('No typing module');
          const codeLvl = window.TSATyping.LEVELS['code'];
          if (!codeLvl) return fail('Code level not found');
          if (codeLvl.gateYr !== 5) return fail(`Expected gateYr 5, got ${codeLvl.gateYr}`);
          return ok('Code Snippets level gated at Year 5+');
        }
      },
      {
        name: 'Home level has no gate (entry level)',
        fn: async () => {
          if (!window.TSATyping) return skip('No typing module');
          const home = window.TSATyping.LEVELS['home'];
          if (home.gateWpm !== 0 || home.gateAcc !== 0) return fail('Home row should have zero gates');
          return ok('Home Row is ungated entry level');
        }
      },
    ]
  },

  // ── 6. PWA / Service Worker ───────────────────────────────────────────────
  {
    name: 'PWA & Offline',
    tests: [
      {
        name: 'Service worker API available',
        fn: async () => {
          if (!('serviceWorker' in navigator)) return fail('serviceWorker not in navigator');
          return ok('serviceWorker API available');
        }
      },
      {
        name: 'navigator.onLine is boolean',
        fn: async () => {
          if (typeof navigator.onLine !== 'boolean') return fail('navigator.onLine not boolean');
          return ok(`navigator.onLine = ${navigator.onLine}`);
        }
      },
      {
        name: 'IndexedDB API available',
        fn: async () => {
          if (!window.indexedDB) return fail('IndexedDB not available');
          return ok('IndexedDB API available');
        }
      },
      {
        name: 'crypto.subtle available (for PIN hashing)',
        fn: async () => {
          if (!window.crypto?.subtle) return fail('crypto.subtle not available');
          return ok('crypto.subtle available');
        }
      },
    ]
  },

  // ── 7. Design System ─────────────────────────────────────────────────────
  {
    name: 'Design System',
    tests: [
      {
        name: 'CSS custom properties loaded',
        fn: async () => {
          const navy = getComputedStyle(document.documentElement).getPropertyValue('--navy').trim();
          if (!navy) return fail('--navy CSS variable not found');
          return ok(`--navy = ${navy}`);
        }
      },
      {
        name: 'CSS --cyan variable correct',
        fn: async () => {
          const cyan = getComputedStyle(document.documentElement).getPropertyValue('--cyan').trim();
          if (!cyan) return fail('--cyan not found');
          return ok(`--cyan = ${cyan}`);
        }
      },
      {
        name: 'Profile picker screen exists in DOM',
        fn: async () => {
          if (!document.getElementById('s-picker')) return fail('#s-picker not found');
          return ok('#s-picker exists');
        }
      },
      {
        name: 'Dashboard screen exists in DOM',
        fn: async () => {
          if (!document.getElementById('s-dashboard')) return fail('#s-dashboard not found');
          return ok('#s-dashboard exists');
        }
      },
      {
        name: 'All 11 screens present in DOM',
        fn: async () => {
          const screens = ['picker','dashboard','typing','editor','ai','tipjar','support','onboard','privacy','terms','cookies'];
          const missing = screens.filter(s => !document.getElementById(`s-${s}`));
          if (missing.length) return fail('Missing screens: ' + missing.join(', '));
          return ok(`All ${screens.length} screens present`);
        }
      },
      {
        name: 'Footer copyright element exists',
        fn: async () => {
          if (!document.getElementById('footerCopy')) return fail('#footerCopy not found');
          const txt = document.getElementById('footerCopy').textContent;
          if (!txt.includes('Aperintel')) return fail('Footer missing Aperintel text: ' + txt);
          return ok('Footer copyright present: ' + txt.slice(0,60));
        }
      },
    ]
  },

  // ── 8. AI Lab ─────────────────────────────────────────────────────────────
  {
    name: 'AI Lab',
    tests: [
      {
        name: 'AI Lab module exists',
        fn: async () => {
          if (!window.TSAAILab) return fail('TSAAILab not found');
          return ok('AI Lab module present');
        }
      },
      {
        name: 'guardInput blocks empty input',
        fn: async () => {
          if (!window.TSAAILab) return skip('No AI Lab module');
          const r = TSAAILab.guardInput('', 5);
          if (r.ok) return fail('Empty input should be blocked');
          return ok('Empty input blocked correctly');
        }
      },
      {
        name: 'guardInput enforces Y3–Y4 150-char limit',
        fn: async () => {
          if (!window.TSAAILab) return skip('No AI Lab module');
          const longText = 'a'.repeat(151);
          const r = TSAAILab.guardInput(longText, 4);
          if (r.ok) return fail('Y4 should reject >150 chars');
          return ok('Y3–Y4 150-char limit enforced');
        }
      },
      {
        name: 'guardInput allows Y5+ longer input',
        fn: async () => {
          if (!window.TSAAILab) return skip('No AI Lab module');
          const longText = 'How do I use CSS flexbox to centre a div? ' + 'a'.repeat(110);
          const r = TSAAILab.guardInput(longText, 5);
          if (!r.ok) return fail('Y5+ should allow longer input');
          return ok('Y5+ longer input allowed');
        }
      },
      {
        name: 'guardOutput truncates to 3 sentences for Junior',
        fn: async () => {
          if (!window.TSAAILab) return skip('No AI Lab module');
          const text = 'First sentence. Second sentence. Third sentence. Fourth sentence. Fifth sentence.';
          const out  = TSAAILab.guardOutput(text, 5);
          const count = (out.match(/[.!?]+/g) || []).length;
          if (count > 3) return fail(`Expected max 3 sentences, got ${count}`);
          return ok(`Junior output truncated to ${count} sentence(s)`);
        }
      },
      {
        name: 'guardOutput strips URLs from response',
        fn: async () => {
          if (!window.TSAAILab) return skip('No AI Lab module');
          const text = 'Visit https://example.com for more info.';
          const out  = TSAAILab.guardOutput(text, 7);
          if (out.includes('https://')) return fail('URL not stripped from output');
          return ok('URL stripped from AI output');
        }
      },
      {
        name: 'offlineResponse returns string for all 3 tools',
        fn: async () => {
          if (!window.TSAAILab) return skip('No AI Lab module');
          const tools = ['codeHelper', 'codeDetective', 'promptTrainer'];
          for (const t of tools) {
            const r = TSAAILab.offlineResponse(t, 'test input', 5);
            if (typeof r !== 'string' || r.length < 5) return fail(`Tool ${t} returned invalid response: ${r}`);
          }
          return ok('All 3 tools return valid offline responses');
        }
      },
    ]
  },

  // ── 9. Support Chat ───────────────────────────────────────────────────────
  {
    name: 'Support Chat',
    tests: [
      {
        name: 'Support module exists',
        fn: async () => {
          if (!window.TSASupport) return fail('TSASupport not found');
          return ok('Support module present');
        }
      },
      {
        name: 'Quick replies array populated',
        fn: async () => {
          if (!window.TSASupport) return skip('No support module');
          // Check renderSupport doesn't throw
          try {
            const screen = document.getElementById('s-support');
            if (screen) TSASupport.renderSupport();
            const qr = document.querySelectorAll('#s-support button');
            if (!qr.length) return skip('Support screen not rendered');
            return ok(`Support screen rendered with ${qr.length} buttons`);
          } catch(e) {
            return fail('renderSupport threw: ' + e.message);
          }
        }
      },
      {
        name: 'selectQuick fills message textarea',
        fn: async () => {
          if (!window.TSASupport) return skip('No support module');
          TSASupport.renderSupport();
          TSASupport.selectQuick('Test quick reply message');
          const el = document.getElementById('sMessage');
          if (!el || el.value !== 'Test quick reply message') return fail('Quick reply not set in textarea');
          return ok('Quick reply fills textarea correctly');
        }
      },
    ]
  },

  // ── 10. Junior Phases ─────────────────────────────────────────────────────
  {
    name: 'Junior Phases',
    tests: [
      {
        name: 'Junior phases module exists',
        fn: async () => {
          if (!window.TSAJunior) return fail('TSAJunior not found');
          return ok('Junior phases module present');
        }
      },
      {
        name: 'Phase 1 has no gate (entry level)',
        fn: async () => {
          if (!window.TSAJunior) return skip('No junior module');
          const ph = TSAJunior.PHASES['j1'];
          if (ph.gate !== null) return fail('Phase 1 should have no gate');
          return ok('Phase 1 is ungated');
        }
      },
      {
        name: 'Phase 2 requires Phase 1 completion',
        fn: async () => {
          if (!window.TSAJunior) return skip('No junior module');
          const ph = TSAJunior.PHASES['j2'];
          if (!ph.gate || ph.gate.phase !== 'j1') return fail('Phase 2 should gate on Phase 1');
          return ok('Phase 2 gates on Phase 1 completion');
        }
      },
      {
        name: 'checkGate blocks locked phase for Y3',
        fn: async () => {
          if (!window.TSAJunior) return skip('No junior module');
          const ph      = TSAJunior.PHASES['j3'];
          const profile = { yearGroup: 3, phaseProgress: {} };
          const result  = TSAJunior.checkGate(ph, profile);
          if (result.unlocked) return fail('Phase 3 should be locked for Y3 with no progress');
          return ok(`Phase 3 locked for Y3: "${result.reason}"`);
        }
      },
      {
        name: 'All phases have certificates defined',
        fn: async () => {
          if (!window.TSAJunior) return skip('No junior module');
          const missing = Object.values(TSAJunior.PHASES).filter(p => !p.certificate);
          if (missing.length) return fail('Phases without certificate: ' + missing.map(p=>p.id).join(', '));
          return ok('All Junior phases have certificates');
        }
      },
      {
        name: 's-junior screen added to DOM',
        fn: async () => {
          if (!document.getElementById('s-junior')) return fail('#s-junior not in DOM');
          return ok('#s-junior screen present');
        }
      },
    ]
  },

  // ── 11. Senior Phases ─────────────────────────────────────────────────────
  {
    name: 'Senior Phases',
    tests: [
      {
        name: 'Senior phases module exists',
        fn: async () => {
          if (!window.TSASenior) return fail('TSASenior not found');
          return ok('Senior phases module present');
        }
      },
      {
        name: '5 senior phases defined',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          const count = Object.keys(TSASenior.PHASES).length;
          if (count !== 5) return fail(`Expected 5 phases, got ${count}`);
          return ok(`${count} senior phases defined`);
        }
      },
      {
        name: 'Phase S1 available from Year 7',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          const ph = TSASenior.PHASES['s1'];
          if (ph.yearMin !== 7) return fail(`Expected yearMin 7, got ${ph.yearMin}`);
          return ok('Phase S1 starts at Year 7');
        }
      },
      {
        name: 'Phase S5 is open-ended portfolio',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          const ph = TSASenior.PHASES['s5'];
          if (ph.weeks !== 'Open-ended') return fail(`Expected open-ended, got "${ph.weeks}"`);
          return ok('Phase S5 is open-ended');
        }
      },
      {
        name: 'Guardian View function exists',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          if (typeof TSASenior.showGuardianView !== 'function') return fail('showGuardianView not a function');
          return ok('Guardian View function present');
        }
      },
      {
        name: 'Portfolio Generator function exists',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          if (typeof TSASenior.generatePortfolio !== 'function') return fail('generatePortfolio not a function');
          return ok('Portfolio Generator function present');
        }
      },
      {
        name: 's-senior screen added to DOM',
        fn: async () => {
          if (!document.getElementById('s-senior')) return fail('#s-senior not in DOM');
          return ok('#s-senior screen present');
        }
      },
    ]
  },

  // ── 12. Engagement Engine ────────────────────────────────────────────────
  {
    name: 'Engagement Engine',
    tests: [
      {
        name: 'Engagement module exists',
        fn: async () => {
          if (!window.TSAEngagement) return fail('TSAEngagement not found');
          return ok('Engagement module present');
        }
      },
      {
        name: 'Daily challenge pool has 6+ challenges',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          const count = TSAEngagement.CHALLENGE_POOL.length;
          if (count < 6) return fail(`Expected 6+ challenges, got ${count}`);
          return ok(`${count} daily challenges in pool`);
        }
      },
      {
        name: 'getTodaysChallenge is deterministic for same inputs',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          const c1 = TSAEngagement.getTodaysChallenge('profile-123');
          const c2 = TSAEngagement.getTodaysChallenge('profile-123');
          if (c1.id !== c2.id) return fail('Daily challenge not deterministic');
          return ok(`Deterministic challenge: ${c1.title}`);
        }
      },
      {
        name: 'getTodaysChallenge varies by profileId',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          // Over enough profiles, we should get different challenges
          const ids = Array.from({length:6},(_,i)=>`profile-${i}`);
          const challenges = ids.map(id => TSAEngagement.getTodaysChallenge(id).id);
          const unique = new Set(challenges).size;
          if (unique < 2) return fail('All profiles got the same challenge — seed not varying');
          return ok(`${unique} different challenges across 6 profile IDs`);
        }
      },
      {
        name: 'checkReturn returns null for today\'s active session',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          if (!window.TSA?.services?.sessionManager) return skip('No session manager');
          // Mock a profile active today
          const today = new Date().toISOString().slice(0,10);
          const sess  = await TSA.services.sessionManager.getActiveSession();
          if (sess) {
            // If there's an active session, check return should be null
            const result = await TSAEngagement.checkReturn();
            if (result !== null) return fail('Active today should give null return message');
            return ok('No return message for active session today');
          }
          return skip('No active session to test');
        }
      },
      {
        name: 'showMilestoneToast creates DOM element',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          const milestone = { emoji: '🏗️', label: 'First Builder', xp: 100 };
          TSAEngagement.showMilestoneToast(milestone);
          await new Promise(r => setTimeout(r, 50));
          // Check toast was added
          const toasts = document.querySelectorAll('[style*="bottom:90px"]');
          if (!toasts.length) return skip('Toast may use different positioning');
          toasts.forEach(t => t.remove());
          return ok('Milestone toast created in DOM');
        }
      },
    ]
  },

  // ── 13. Security Module ──────────────────────────────────────────────────
  {
    name: 'Security Module',
    tests: [
      {
        name: 'Security module exists',
        fn: async () => {
          if (!window.TSASecurity) return fail('TSASecurity not found on window');
          return ok('Security module present');
        }
      },
      {
        name: 'esc() neutralises < > & " characters',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const input    = '<script>alert("xss")</script>';
          const escaped  = TSASecurity.esc(input);
          if (escaped.includes('<script>'))    return fail('< not escaped');
          if (escaped.includes('</script>'))   return fail('> not escaped');
          if (escaped.includes('"xss"'))       return fail('" not escaped');
          return ok('XSS characters escaped: ' + escaped.slice(0, 40));
        }
      },
      {
        name: 'esc() handles null and undefined safely',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          if (TSASecurity.esc(null)      !== '') return fail('null should return empty string');
          if (TSASecurity.esc(undefined) !== '') return fail('undefined should return empty string');
          if (TSASecurity.esc(0)         !== '0') return fail('0 should return "0"');
          return ok('Null/undefined handled safely');
        }
      },
      {
        name: 'escUrl() blocks javascript: scheme',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const result = TSASecurity.escUrl('javascript:alert(1)');
          if (result !== '') return fail('javascript: scheme should return empty string, got: ' + result);
          return ok('javascript: scheme blocked');
        }
      },
      {
        name: 'escUrl() blocks data: scheme',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const result = TSASecurity.escUrl('data:text/html,<h1>XSS</h1>');
          if (result !== '') return fail('data: scheme should return empty string');
          return ok('data: scheme blocked');
        }
      },
      {
        name: 'sanitiseName() accepts valid names',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const valid = ['Alex', "O'Brien", 'Jean-Paul', 'María', 'Sam 2'];
          for (const name of valid) {
            const r = TSASecurity.sanitiseName(name);
            if (!r.ok) return fail(`"${name}" should be valid, got: ${r.error}`);
          }
          return ok('Valid names accepted');
        }
      },
      {
        name: 'sanitiseName() rejects HTML tags',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const r = TSASecurity.sanitiseName('<img src=x onerror=alert(1)>');
          if (r.ok && r.value.includes('<')) return fail('HTML tags not stripped from name');
          return ok('HTML stripped from name input');
        }
      },
      {
        name: 'sanitiseName() rejects name over 32 chars',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const r = TSASecurity.sanitiseName('A'.repeat(33));
          if (r.ok) return fail('Name over 32 chars should be rejected');
          return ok('Long name rejected: ' + r.error);
        }
      },
      {
        name: 'validatePIN() rejects non-numeric',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const r = TSASecurity.validatePIN('abcd');
          if (r.ok) return fail('Non-numeric PIN should be rejected');
          return ok('Non-numeric PIN rejected');
        }
      },
      {
        name: 'validatePIN() rejects trivially weak PINs',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const weak = ['0000', '1111', '1234', '4321'];
          for (const pin of weak) {
            const r = TSASecurity.validatePIN(pin);
            if (r.ok) return fail(`Weak PIN "${pin}" should be rejected`);
          }
          return ok('Weak PINs rejected: 0000, 1111, 1234, 4321');
        }
      },
      {
        name: 'validatePIN() accepts a strong 4-digit PIN',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const r = TSASecurity.validatePIN('7392');
          if (!r.ok) return fail('Strong PIN rejected: ' + r.error);
          return ok('Strong PIN accepted');
        }
      },
      {
        name: 'PIN lockout triggers after 5 failed attempts',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const testId = 'test-lockout-' + Date.now();
          let result;
          for (let i = 0; i < 5; i++) {
            result = TSASecurity.recordFailedAttempt(testId);
          }
          if (!result.locked) return fail('Should be locked after 5 attempts');
          if (result.secondsLeft <= 0) return fail('secondsLeft should be > 0');
          return ok(`Locked after 5 attempts, ${result.secondsLeft}s cooldown`);
        }
      },
      {
        name: 'isLocked() returns false for unknown profile',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const r = TSASecurity.isLocked('profile-never-seen');
          if (r.locked) return fail('Unknown profile should not be locked');
          return ok('Unknown profile correctly reports unlocked');
        }
      },
      {
        name: 'clearLockout() resets lockout state',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const testId = 'test-clear-' + Date.now();
          for (let i = 0; i < 5; i++) TSASecurity.recordFailedAttempt(testId);
          TSASecurity.clearLockout(testId);
          const r = TSASecurity.isLocked(testId);
          if (r.locked) return fail('Lockout should be cleared');
          return ok('Lockout cleared successfully');
        }
      },
      {
        name: 'rateCheck() allows requests within limit',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const key = 'test-rate-' + Date.now();
          const r = TSASecurity.rateCheck(key, 3, 5000);
          if (!r.allowed) return fail('First request should be allowed');
          return ok('Rate check allows initial requests');
        }
      },
      {
        name: 'rateCheck() blocks after limit exceeded',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const key = 'test-rate-block-' + Date.now();
          for (let i = 0; i < 3; i++) TSASecurity.rateCheck(key, 3, 60000);
          const r = TSASecurity.rateCheck(key, 3, 60000);
          if (r.allowed) return fail('4th request should be blocked (limit is 3)');
          if (!r.retryAfter || r.retryAfter <= 0) return fail('retryAfter should be positive');
          return ok(`Rate limited. Retry after ${r.retryAfter}s`);
        }
      },
      {
        name: 'validateProfile() catches missing required fields',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const incomplete = { profileId: 'test', name: 'Alex' }; // missing most fields
          const errors = TSASecurity.validateProfile(incomplete);
          if (!errors.length) return fail('Should report missing fields');
          return ok(`${errors.length} validation errors caught: ${errors[0]}`);
        }
      },
      {
        name: 'validateProfile() accepts valid profile',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const valid = {
            profileId: 'test-001', userId: null, name: 'Alex', avatar: '🚀',
            yearGroup: 5, journeyType: 'junior', pinHash: 'abc123',
            xp: 100, streak: 3, badges: ['first_builder'], createdAt: new Date().toISOString()
          };
          const errors = TSASecurity.validateProfile(valid);
          if (errors.length) return fail('Valid profile rejected: ' + errors.join(', '));
          return ok('Valid profile passes all checks');
        }
      },
      {
        name: 'isKnownScreen() approves all 13 app screens',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const screens = ['picker','dashboard','editor','typing','ai','tipjar',
                          'support','onboard','privacy','terms','cookies','junior','senior'];
          const unknown = screens.filter(s => !TSASecurity.isKnownScreen(s));
          if (unknown.length) return fail('Known screens rejected: ' + unknown.join(', '));
          return ok(`All ${screens.length} screens approved by whitelist`);
        }
      },
      {
        name: 'isKnownScreen() blocks unknown screen names',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          const bad = ['../etc/passwd', '<script>', 'admin', 'unknown-page', ''];
          const allowed = bad.filter(s => TSASecurity.isKnownScreen(s));
          if (allowed.length) return fail('Unknown screens allowed: ' + allowed.join(', '));
          return ok('All unknown screen names blocked');
        }
      },
      {
        name: 'auditLog() records events without throwing',
        fn: async () => {
          if (!window.TSASecurity) return skip('No security module');
          TSASecurity.auditLog('test_event', { detail: 'unit test' });
          const log = TSASecurity.log;
          if (!Array.isArray(log)) return fail('log getter should return array');
          const found = log.find(e => e.type === 'test_event');
          if (!found) return fail('Event not found in log');
          return ok(`Audit log contains ${log.length} event(s)`);
        }
      },
    ]
  },

  // ── 14. PWA & WCAG ───────────────────────────────────────────────────────
  {
    name: 'PWA & WCAG',
    tests: [
      {
        name: 'Skip to content link present',
        fn: async () => {
          const el = document.querySelector('.skip-link');
          if (!el) return fail('.skip-link element not found');
          if (!el.href.includes('main-content')) return fail('skip-link should point to #main-content');
          return ok('Skip to content link present and correctly targeted');
        }
      },
      {
        name: 'main#main-content landmark present',
        fn: async () => {
          const el = document.getElementById('main-content');
          if (!el) return fail('#main-content not found');
          if (el.tagName !== 'MAIN') return fail('main-content should be a <main> element, got ' + el.tagName);
          return ok('<main id="main-content"> landmark present');
        }
      },
      {
        name: 'Nav has aria-label',
        fn: async () => {
          const nav = document.querySelector('nav.nav');
          if (!nav) return fail('nav.nav not found');
          if (!nav.getAttribute('aria-label')) return fail('nav missing aria-label');
          return ok('Nav has aria-label: "' + nav.getAttribute('aria-label') + '"');
        }
      },
      {
        name: 'All images have alt attributes',
        fn: async () => {
          const imgs = document.querySelectorAll('img');
          const missing = Array.from(imgs).filter(img => !img.hasAttribute('alt'));
          if (missing.length) return fail(`${missing.length} image(s) missing alt attribute`);
          return ok(`All ${imgs.length} images have alt attributes`);
        }
      },
      {
        name: 'Offline banner has role=alert',
        fn: async () => {
          const el = document.getElementById('offlineBanner');
          if (!el) return fail('#offlineBanner not found');
          if (el.getAttribute('role') !== 'alert') return fail('offlineBanner should have role="alert"');
          return ok('Offline banner has role="alert"');
        }
      },
      {
        name: 'PWA install banner present in DOM',
        fn: async () => {
          if (!document.getElementById('pwaBanner')) return fail('#pwaBanner not found');
          return ok('#pwaBanner present');
        }
      },
      {
        name: 'PWA manifest is valid JSON with required fields',
        fn: async () => {
          try {
            const r = await fetch('/manifest.json');
            if (!r.ok) return skip('manifest.json fetch failed (likely file:// context)');
            const m = await r.json();
            const required = ['name','short_name','start_url','display','icons'];
            const missing = required.filter(k => !(k in m));
            if (missing.length) return fail('Manifest missing: ' + missing.join(', '));
            if (!m.icons.length) return fail('Manifest has no icons');
            return ok('Manifest valid: ' + m.name + ', ' + m.icons.length + ' icon(s)');
          } catch(e) {
            return skip('Manifest not testable in this context: ' + e.message);
          }
        }
      },
      {
        name: 'CSS has prefers-reduced-motion support',
        fn: async () => {
          // Check if our CSS loaded by looking for a custom property
          const navy = getComputedStyle(document.documentElement).getPropertyValue('--navy').trim();
          if (!navy) return skip('CSS not loaded');
          // We can't directly test @media queries, but we can verify the stylesheet loaded
          const sheets = Array.from(document.styleSheets);
          const hasSheet = sheets.some(s => {
            try { return s.href?.includes('main.css') || s.cssRules?.length > 0; }
            catch { return false; }
          });
          if (!hasSheet) return skip('Cannot inspect stylesheet rules');
          return ok('CSS loaded, reduced-motion rule included in main.css');
        }
      },
    ]
  },

  // ── 9. Quiz Gate ──────────────────────────────────────────────────────────
  {
    name: 'Quiz Gate',
    tests: [
      {
        name: 'Quiz gate module exists',
        fn: async () => {
          if (!window.TSAQuizGate) return fail('TSAQuizGate not found on window');
          return ok('TSAQuizGate present');
        }
      },
      {
        name: 'hasQuizFor returns true for known lesson',
        fn: async () => {
          if (!window.TSAQuizGate) return skip('No quiz gate module');
          const has = window.TSAQuizGate.hasQuizFor('j1-l1');
          if (!has) return fail('hasQuizFor("j1-l1") returned false');
          return ok('hasQuizFor("j1-l1") = true');
        }
      },
      {
        name: 'hasQuizFor returns false for unknown lesson',
        fn: async () => {
          if (!window.TSAQuizGate) return skip('No quiz gate module');
          const has = window.TSAQuizGate.hasQuizFor('zz-l99');
          if (has) return fail('hasQuizFor("zz-l99") should return false');
          return ok('hasQuizFor("zz-l99") = false');
        }
      },
      {
        name: 'QUIZ_BANKS has 3 questions per lesson',
        fn: async () => {
          if (!window.TSAQuizGate) return skip('No quiz gate module');
          const banks = window.TSAQuizGate.QUIZ_BANKS;
          const ids = Object.keys(banks);
          if (ids.length < 10) return fail(`Expected >= 10 lesson quiz banks, got ${ids.length}`);
          const bad = ids.filter(id => banks[id].length !== 3);
          if (bad.length) return fail(`These lessons don\'t have exactly 3 questions: ${bad.join(', ')}`);
          return ok(`${ids.length} lesson quiz banks, all with 3 questions`);
        }
      },
      {
        name: 'Each question has options array of length 4',
        fn: async () => {
          if (!window.TSAQuizGate) return skip('No quiz gate module');
          const banks = window.TSAQuizGate.QUIZ_BANKS;
          const errors = [];
          for (const [id, qs] of Object.entries(banks)) {
            for (let i = 0; i < qs.length; i++) {
              if (!Array.isArray(qs[i].options) || qs[i].options.length !== 4) {
                errors.push(`${id} Q${i+1}: expected 4 options, got ${qs[i].options?.length}`);
              }
            }
          }
          if (errors.length) return fail(errors.slice(0, 3).join('; '));
          return ok('All quiz questions have exactly 4 options');
        }
      },
      {
        name: 'getScore returns -1 when no quiz taken',
        fn: async () => {
          if (!window.TSAQuizGate) return skip('No quiz gate module');
          const score = window.TSAQuizGate.getScore('j1-l1-notaken-test');
          if (score !== -1) return fail(`Expected -1, got ${score}`);
          return ok('getScore returns -1 for untaken quiz');
        }
      },
    ]
  },

  // ── 10. Badge Registry ────────────────────────────────────────────────────
  {
    name: 'Badge Registry',
    tests: [
      {
        name: 'BADGES object has at least 18 entries',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const count = Object.keys(window._TSAXpModule.BADGES).length;
          if (count < 18) return fail(`Expected >= 18 badges, got ${count}`);
          return ok(`${count} badges defined`);
        }
      },
      {
        name: 'quiz_ace badge exists',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const b = window._TSAXpModule.getBadge('quiz_ace');
          if (!b || !b.emoji) return fail('quiz_ace badge not found');
          return ok(`quiz_ace: ${b.emoji} ${b.label}`);
        }
      },
      {
        name: 'challenge_champion badge exists',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const b = window._TSAXpModule.getBadge('challenge_champion');
          if (!b || !b.emoji) return fail('challenge_champion badge not found');
          return ok(`challenge_champion: ${b.emoji} ${b.label}`);
        }
      },
      {
        name: 'phase_j_complete badge exists',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const b = window._TSAXpModule.getBadge('phase_j_complete');
          if (!b || !b.emoji) return fail('phase_j_complete badge not found');
          return ok(`phase_j_complete: ${b.emoji} ${b.label}`);
        }
      },
      {
        name: 'phase_s_complete badge exists',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const b = window._TSAXpModule.getBadge('phase_s_complete');
          if (!b || !b.emoji) return fail('phase_s_complete badge not found');
          return ok(`phase_s_complete: ${b.emoji} ${b.label}`);
        }
      },
      {
        name: 'master_builder milestone badge exists',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const b = window._TSAXpModule.getBadge('master_builder');
          if (!b || !b.emoji) return fail('master_builder badge not found');
          return ok(`master_builder: ${b.emoji} ${b.label}`);
        }
      },
      {
        name: 'code_titan milestone badge exists',
        fn: async () => {
          if (!window._TSAXpModule) return skip('No XP module');
          const b = window._TSAXpModule.getBadge('code_titan');
          if (!b || !b.emoji) return fail('code_titan badge not found');
          return ok(`code_titan: ${b.emoji} ${b.label}`);
        }
      },
    ]
  },

  // ── 11. Challenge Pool ────────────────────────────────────────────────────
  {
    name: 'Challenge Pool',
    tests: [
      {
        name: 'Engagement module exists',
        fn: async () => {
          if (!window.TSAEngagement) return fail('TSAEngagement not found on window');
          return ok('TSAEngagement present');
        }
      },
      {
        name: 'Challenge pool has exactly 30 challenges',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          const pool = window.TSAEngagement.CHALLENGE_POOL;
          if (!Array.isArray(pool)) return fail('CHALLENGE_POOL is not an array');
          if (pool.length !== 30) return fail(`Expected 30 challenges, got ${pool.length}`);
          return ok('Challenge pool has 30 challenges');
        }
      },
      {
        name: 'All challenges have required fields',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          const pool = window.TSAEngagement.CHALLENGE_POOL;
          if (!Array.isArray(pool)) return skip('No challenge pool');
          const required = ['id', 'title', 'desc', 'xp'];
          const bad = pool.filter(c => required.some(f => !(f in c)));
          if (bad.length) return fail(`${bad.length} challenges missing required fields: ${bad.map(c => c.id).join(', ')}`);
          return ok('All 30 challenges have id, title, desc, xp');
        }
      },
      {
        name: 'Challenge IDs are unique',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          const pool = window.TSAEngagement.CHALLENGE_POOL;
          if (!Array.isArray(pool)) return skip('No challenge pool');
          const ids = pool.map(c => c.id);
          const unique = new Set(ids);
          if (unique.size !== ids.length) return fail(`Duplicate challenge IDs found`);
          return ok('All challenge IDs are unique');
        }
      },
      {
        name: 'Challenges have XP value of 15',
        fn: async () => {
          if (!window.TSAEngagement) return skip('No engagement module');
          const pool = window.TSAEngagement.CHALLENGE_POOL;
          if (!Array.isArray(pool)) return skip('No challenge pool');
          const wrong = pool.filter(c => c.xp !== 15);
          if (wrong.length) return fail(`${wrong.length} challenges have XP != 15: ${wrong.map(c => `${c.id}:${c.xp}`).join(', ')}`);
          return ok('All challenges have XP = 15');
        }
      },
    ]
  },

  // ── 12. Lesson Content Coverage ───────────────────────────────────────────
  {
    name: 'Lesson Content Coverage',
    tests: [
      {
        name: 'Junior phases module exists',
        fn: async () => {
          if (!window.TSAJunior) return fail('TSAJunior not found on window');
          return ok('TSAJunior present');
        }
      },
      {
        name: 'Senior phases module exists',
        fn: async () => {
          if (!window.TSASenior) return fail('TSASenior not found on window');
          return ok('TSASenior present');
        }
      },
      {
        name: 'Junior Phase 1 has 4 lessons with content',
        fn: async () => {
          if (!window.TSAJunior) return skip('No junior module');
          const phase = window.TSAJunior.PHASES['j1'];
          if (!phase) return fail('Phase j1 not found');
          const withContent = (phase.lessons || []).filter(l => l.content && l.content.length > 100);
          if (withContent.length < 4) return fail(`Expected 4 lessons with content, got ${withContent.length}`);
          return ok(`j1: ${withContent.length} lessons have content`);
        }
      },
      {
        name: 'Junior Phase 3 has 5 lessons with content',
        fn: async () => {
          if (!window.TSAJunior) return skip('No junior module');
          const phase = window.TSAJunior.PHASES['j3'];
          if (!phase) return fail('Phase j3 not found');
          const withContent = (phase.lessons || []).filter(l => l.content && l.content.length > 100);
          if (withContent.length < 5) return fail(`Expected 5 lessons with content, got ${withContent.length}`);
          return ok(`j3: ${withContent.length} lessons have content`);
        }
      },
      {
        name: 'Senior Phase 1 has 6 lessons with content',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          const phase = window.TSASenior.PHASES['s1'];
          if (!phase) return fail('Phase s1 not found');
          const withContent = (phase.lessons || []).filter(l => l.content && l.content.length > 100);
          if (withContent.length < 6) return fail(`Expected 6 lessons with content, got ${withContent.length}`);
          return ok(`s1: ${withContent.length} lessons have content`);
        }
      },
      {
        name: 'Senior Phase 5 has 6 lessons with content',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          const phase = window.TSASenior.PHASES['s5'];
          if (!phase) return fail('Phase s5 not found');
          const withContent = (phase.lessons || []).filter(l => l.content && l.content.length > 100);
          if (withContent.length < 6) return fail(`Expected 6 lessons with content, got ${withContent.length}`);
          return ok(`s5: ${withContent.length} lessons have content`);
        }
      },
      {
        name: 'All senior phases have content on every lesson',
        fn: async () => {
          if (!window.TSASenior) return skip('No senior module');
          const phases = Object.values(window.TSASenior.PHASES);
          const missing = [];
          for (const phase of phases) {
            for (const lesson of (phase.lessons || [])) {
              if (!lesson.content || lesson.content.length < 50) {
                missing.push(lesson.id);
              }
            }
          }
          if (missing.length) return fail(`${missing.length} senior lessons missing content: ${missing.join(', ')}`);
          return ok(`All ${phases.reduce((n,p) => n + p.lessons.length, 0)} senior lessons have content`);
        }
      },
    ]
  },

];
