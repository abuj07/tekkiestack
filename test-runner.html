/**
 * TekkieStack 2.0 — Senior Phases Module (Stage 10)
 * Senior Journey: Year 7–11+, Phases S1–S5.
 *
 * S1: Accelerated Foundations    (Y7–8,  4–6 wks)
 * S2: Software Engineering       (Y8–9,  6–8 wks)
 * S3: Real Development           (Y9–10, 6–8 wks)
 * S4: AI Engineering             (Y10–11,6–8 wks)
 * S5: Portfolio Projects         (Y11+,  open-ended)
 *
 * Features:
 *   - Junior history (XP, badges, projects) carries forward visibly
 *   - Guardian View: read-only progress snapshot
 *   - Portfolio Generator: generates HTML portfolio from completed projects
 *
 * Author: Aperintel Ltd
 */

const TSASenior = (() => {

  // ── Phase definitions ─────────────────────────────────────────────────────
  const PHASES = {
    s1: {
      id: 's1', num: 1, code: 'S1', journey: 'senior',
      title: 'Accelerated Foundations',
      emoji: '🚀', color: '#6C63FF', bgColor: '#F0EFFF',
      yearMin: 7, yearMax: 8,
      gate: null,
      certificate: 'cert_s1',
      weeks: '4–6 weeks',
      description: 'Rapidly master HTML, CSS, and JavaScript. Build on any Junior foundations you have — or start fresh at speed.',
      xpReward: 100,
      lessons: [
        { id: 's1-l1', title: 'HTML5 Semantics',         desc: 'header, nav, main, section, article, footer', activity: 'code', xp: 20 },
        { id: 's1-l2', title: 'CSS Grid & Flexbox',      desc: 'Modern layout techniques',                    activity: 'code', xp: 20 },
        { id: 's1-l3', title: 'JavaScript Fundamentals', desc: 'Variables, functions, arrays, objects',        activity: 'code', xp: 20 },
        { id: 's1-l4', title: 'DOM Manipulation',        desc: 'querySelector, addEventListener, classList',   activity: 'code', xp: 20 },
        { id: 's1-l5', title: 'Responsive Design',       desc: 'Media queries & mobile-first CSS',            activity: 'code', xp: 20 },
        { id: 's1-l6', title: 'Build: Personal Site v1', desc: 'Multi-page responsive portfolio',             activity: 'project', xp: 50 },
      ],
    },

    s2: {
      id: 's2', num: 2, code: 'S2', journey: 'senior',
      title: 'Software Engineering',
      emoji: '⚙️', color: '#00C9B1', bgColor: '#EDFDF8',
      yearMin: 8, yearMax: 9,
      gate: { phase: 's1' },
      certificate: 'cert_s2',
      weeks: '6–8 weeks',
      description: 'Learn how real software is built — APIs, data structures, debugging, testing, and version control with Git.',
      xpReward: 150,
      lessons: [
        { id: 's2-l1', title: 'Git & Version Control',  desc: 'commit, push, pull, branches, merge',          activity: 'code', xp: 25 },
        { id: 's2-l2', title: 'APIs & Fetch',           desc: 'Calling external APIs, JSON, async/await',     activity: 'code', xp: 25 },
        { id: 's2-l3', title: 'Data Structures',        desc: 'Arrays, objects, maps, sets in practice',      activity: 'code', xp: 25 },
        { id: 's2-l4', title: 'Error Handling',         desc: 'try/catch, debugging, console tools',          activity: 'code', xp: 25 },
        { id: 's2-l5', title: 'Unit Testing Basics',    desc: 'Write tests before you write code',            activity: 'code', xp: 25 },
        { id: 's2-l6', title: 'Build: Weather App',     desc: 'Fetch live data from a public API',            activity: 'project', xp: 60 },
        { id: 's2-l7', title: 'Build: Todo App with LocalStorage', desc: 'Persist data across page refreshes', activity: 'project', xp: 40 },
      ],
    },

    s3: {
      id: 's3', num: 3, code: 'S3', journey: 'senior',
      title: 'Real Development',
      emoji: '💻', color: '#FF6B6B', bgColor: '#FFF0F0',
      yearMin: 9, yearMax: 10,
      gate: { phase: 's2' },
      certificate: 'cert_s3',
      weeks: '6–8 weeks',
      description: 'Work like a professional developer. Use frameworks, build full-stack thinking, and ship polished products.',
      xpReward: 200,
      lessons: [
        { id: 's3-l1', title: 'Introduction to React',   desc: 'Components, props, state, hooks',             activity: 'code', xp: 30 },
        { id: 's3-l2', title: 'Node.js Foundations',     desc: 'Server-side JS, npm, modules',                activity: 'code', xp: 30 },
        { id: 's3-l3', title: 'Databases — SQL Basics',  desc: 'Tables, queries, INSERT, SELECT, JOIN',       activity: 'code', xp: 30 },
        { id: 's3-l4', title: 'Build a REST API',        desc: 'Express.js, routes, CRUD operations',         activity: 'code', xp: 35 },
        { id: 's3-l5', title: 'Authentication Basics',   desc: 'Passwords, hashing, JWTs, sessions',          activity: 'code', xp: 30 },
        { id: 's3-l6', title: 'Deploy to the Web',       desc: 'GitHub Pages, Railway, Vercel',               activity: 'code', xp: 25 },
        { id: 's3-l7', title: 'Build: Full-Stack App',   desc: 'Frontend + backend + database',               activity: 'project', xp: 80 },
      ],
    },

    s4: {
      id: 's4', num: 4, code: 'S4', journey: 'senior',
      title: 'AI Engineering',
      emoji: '🤖', color: '#FFB347', bgColor: '#FFF9EC',
      yearMin: 10, yearMax: 11,
      gate: { phase: 's3' },
      certificate: 'cert_s4',
      weeks: '6–8 weeks',
      description: 'Build AI-powered applications. Integrate LLMs, understand machine learning concepts, and create intelligent tools.',
      xpReward: 250,
      lessons: [
        { id: 's4-l1', title: 'How LLMs Work',           desc: 'Tokens, context windows, temperature',        activity: 'offline', xp: 20 },
        { id: 's4-l2', title: 'Prompt Engineering',      desc: 'System prompts, few-shot, chain-of-thought',  activity: 'code',    xp: 30 },
        { id: 's4-l3', title: 'Calling the Claude API',  desc: 'Messages, system prompts, streaming',         activity: 'code',    xp: 35 },
        { id: 's4-l4', title: 'RAG Foundations',         desc: 'Embeddings, vector search, context injection', activity: 'code',   xp: 35 },
        { id: 's4-l5', title: 'AI Safety & Ethics',      desc: 'Bias, misuse, responsible AI development',    activity: 'offline', xp: 20 },
        { id: 's4-l6', title: 'Build: AI Study Assistant', desc: 'Full app using Claude API + your notes',    activity: 'project', xp: 100 },
      ],
    },

    s5: {
      id: 's5', num: 5, code: 'S5', journey: 'senior',
      title: 'Portfolio Projects',
      emoji: '🏛️', color: '#2EC4B6', bgColor: '#EDFDF8',
      yearMin: 11, yearMax: 99,
      gate: { phase: 's4' },
      certificate: 'cert_s5',
      weeks: 'Open-ended',
      description: 'Build your own original projects, guided by your interests. Ship real products, write technical write-ups, and publish your portfolio.',
      xpReward: 500,
      lessons: [
        { id: 's5-l1', title: 'Choose Your Project',     desc: 'Scope, plan, and spec your idea',             activity: 'offline', xp: 20 },
        { id: 's5-l2', title: 'Sprint Planning',         desc: 'Break work into 2-week sprints',              activity: 'offline', xp: 20 },
        { id: 's5-l3', title: 'Build Sprint 1',          desc: 'Core feature working',                        activity: 'project', xp: 60 },
        { id: 's5-l4', title: 'Build Sprint 2',          desc: 'Polish and edge cases',                       activity: 'project', xp: 60 },
        { id: 's5-l5', title: 'Technical Write-up',      desc: 'Document what you built and how',             activity: 'offline', xp: 40 },
        { id: 's5-l6', title: 'Publish Portfolio',       desc: 'Deploy and share your work',                  activity: 'project', xp: 100 },
      ],
    },
  };

  // ── Gate check ────────────────────────────────────────────────────────────
  function checkGate(phase, profile) {
    if (!phase.gate) return { unlocked: true, reason: '' };
    if (profile.yearGroup < phase.yearMin) {
      return { unlocked: false, reason: `Available from Year ${phase.yearMin}` };
    }
    const gatePhase = phase.gate.phase;
    if (gatePhase) {
      const prog = profile.phaseProgress?.[gatePhase];
      if (!prog?.done) {
        const gPh = PHASES[gatePhase];
        return { unlocked: false, reason: `Complete Phase ${gPh?.code || gatePhase} first` };
      }
    }
    return { unlocked: true, reason: '' };
  }

  // ── Mark lesson complete ───────────────────────────────────────────────────
  async function markLessonComplete(phaseId, lessonId) {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) return;

    const prog = { ...(profile.phaseProgress || {}) };
    if (!prog[phaseId]) prog[phaseId] = { lessonsComplete: [], done: false };
    if (!prog[phaseId].lessonsComplete.includes(lessonId)) {
      prog[phaseId].lessonsComplete.push(lessonId);
    }

    const phase   = PHASES[phaseId];
    const lessons = phase?.lessons || [];
    if (lessons.length > 0 && prog[phaseId].lessonsComplete.length >= lessons.length && !prog[phaseId].done) {
      prog[phaseId].done = true;
      await window.TSA.services.xp.addXP('CERTIFICATE');
      await window.TSA.services.xp.awardBadge(`phase${phase.num}_complete`);
      celebrate(phase.emoji, `Phase ${phase.code} Complete!`, phase.title, `+${phase.xpReward} XP 🎓`);
    }

    await window.TSA.services.sessionManager.updateProfile(profile.profileId, { phaseProgress: prog });
    await window.TSA.services.xp.addXP('LESSON_COMPLETE');
  }

  // ── Render Senior Journey ─────────────────────────────────────────────────
  async function renderSeniorJourney() {
    const screen = document.getElementById('s-senior');
    if (!screen) return;

    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) { go('picker'); return; }

    // Show junior history carried forward
    const juniorXp     = profile.yearGroup < 7 ? profile.xp : 0;
    const juniorBadges = (profile.badges || []).filter(b => b.startsWith('phase') && ['1','2','3','4'].includes(b.replace(/\D/g,'')));

    screen.innerHTML = `
      <div style="max-width:1060px;margin:0 auto;padding:28px 18px">
        <div style="margin-bottom:22px;display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px">
          <div>
            <h2 style="font-family:'Fredoka One',cursive;font-size:27px;color:var(--navy)">🎓 Senior Journey</h2>
            <p style="font-size:14px;color:var(--muted);margin-top:4px;font-weight:500">Year 7–11+ · 5 phases · Professional development skills</p>
          </div>
          <div style="display:flex;gap:9px">
            <button class="btn btn-gh" onclick="TSASenior.showGuardianView()">👁 Guardian View</button>
            <button class="btn btn-cy" onclick="TSASenior.generatePortfolio()">🎨 Generate Portfolio</button>
          </div>
        </div>

        ${juniorBadges.length > 0 ? `
          <div style="background:linear-gradient(135deg,rgba(0,201,177,.08),rgba(108,99,255,.06));border:1px solid rgba(0,201,177,.2);border-radius:var(--r-lg);padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;gap:12px;flex-wrap:wrap">
            <span style="font-size:20px">🏆</span>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--navy)">Junior history carried forward</div>
              <div style="font-size:12px;color:var(--muted);font-weight:500">${juniorBadges.length} Junior phases complete · ${profile.xp} total XP</div>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-left:auto">
              ${juniorBadges.map(b => `<span style="background:#D0F5EC;color:#0A6E56;font-size:11px;font-weight:800;padding:3px 9px;border-radius:20px">${b.replace('_complete','').replace('phase','Phase ')}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          ${Object.values(PHASES).map(ph => {
            const gate = checkGate(ph, profile);
            const prog = profile.phaseProgress?.[ph.id] || {};
            const lessons = ph.lessons || [];
            const done = lessons.filter(l => prog.lessonsComplete?.includes(l.id)).length;
            const pct  = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
            const isDone    = prog.done === true;
            const isCurrent = !isDone && gate.unlocked;
            return `
              <div class="card" style="border:1.5px solid ${isDone ? '#2EC4B6' : isCurrent ? ph.color : 'var(--border)'};background:${isDone ? '#EDFDF8' : '#fff'};cursor:${gate.unlocked ? 'pointer' : 'default'};transition:all .2s"
                onclick="${gate.unlocked ? `TSASenior.openPhase('${ph.id}')` : ''}">
                <div style="display:flex;align-items:center;gap:13px;margin-bottom:11px">
                  <div style="width:48px;height:48px;border-radius:11px;background:${ph.bgColor};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${ph.emoji}</div>
                  <div style="flex:1">
                    <div style="font-family:'Fredoka One',cursive;font-size:16px;color:var(--navy)">Phase ${ph.code}: ${ph.title}</div>
                    <div style="font-size:11px;color:var(--muted);font-weight:600;margin-top:2px">Year ${ph.yearMin}${ph.yearMax < 99 ? '–'+ph.yearMax : '+'} · ${ph.weeks}</div>
                  </div>
                  <div style="font-size:11px;font-weight:800;padding:3px 8px;border-radius:8px;${isDone ? 'background:#D0F5EC;color:#0A6E56' : isCurrent ? `background:${ph.bgColor};color:${ph.color}` : 'background:var(--slate);color:var(--muted)'}">
                    ${isDone ? '✅ Done' : isCurrent ? 'Active' : gate.reason || '🔒'}
                  </div>
                </div>
                <p style="font-size:13px;color:var(--muted);font-weight:500;margin-bottom:${lessons.length > 0 ? '11px' : '0'};line-height:1.5">${ph.description}</p>
                ${lessons.length > 0 ? `
                  <div style="background:var(--slate);border-radius:5px;height:5px;overflow:hidden;margin-bottom:4px">
                    <div style="height:100%;border-radius:5px;background:${ph.color};width:${pct}%;transition:width .7s"></div>
                  </div>
                  <div style="font-size:11px;color:var(--muted);font-weight:700">${done}/${lessons.length} lessons · ${pct}%</div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ── Open phase detail ──────────────────────────────────────────────────────
  async function openPhase(phaseId) {
    const phase   = PHASES[phaseId];
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!phase || !profile) return;
    const gate = checkGate(phase, profile);
    if (!gate.unlocked) { alert(`Not unlocked: ${gate.reason}`); return; }

    const prog    = profile.phaseProgress?.[phaseId] || {};
    const screen  = document.getElementById('s-senior');
    if (!screen) return;

    screen.innerHTML = `
      <div style="max-width:860px;margin:0 auto;padding:28px 18px">
        <button class="btn btn-gh" onclick="TSASenior.renderSeniorJourney()" style="margin-bottom:20px">← Back to Journey</button>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:22px">
          <div style="width:58px;height:58px;border-radius:13px;background:${phase.bgColor};display:flex;align-items:center;justify-content:center;font-size:26px">${phase.emoji}</div>
          <div>
            <h2 style="font-family:'Fredoka One',cursive;font-size:23px;color:var(--navy)">Phase ${phase.code}: ${phase.title}</h2>
            <div style="font-size:13px;color:var(--muted);font-weight:600">Year ${phase.yearMin}${phase.yearMax < 99 ? '–'+phase.yearMax : '+'} · ${phase.weeks} · +${phase.xpReward} XP on completion</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:9px">
          ${phase.lessons.map((lesson, idx) => {
            const done = prog.lessonsComplete?.includes(lesson.id);
            const prev = idx === 0 || prog.lessonsComplete?.includes(phase.lessons[idx-1].id);
            return `
              <div class="card" style="border:1.5px solid ${done ? '#2EC4B6' : prev ? phase.color : 'var(--border)'};cursor:${prev ? 'pointer' : 'default'};opacity:${prev ? 1 : .5}"
                onclick="${prev ? `TSASenior.openLesson('${phaseId}','${lesson.id}')` : ''}">
                <div style="display:flex;align-items:center;gap:11px">
                  <div style="font-size:20px">${done ? '✅' : prev ? '▶️' : '🔒'}</div>
                  <div style="flex:1">
                    <div style="font-weight:700;color:var(--navy);font-size:14px">${lesson.title}</div>
                    <div style="font-size:12px;color:var(--muted);font-weight:500;margin-top:1px">${lesson.desc}</div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:10px;font-weight:800;background:${lesson.activity==='project'?'var(--amber)':'var(--slate)'};color:${lesson.activity==='project'?'var(--navy)':'var(--muted)'};padding:2px 7px;border-radius:9px;text-transform:uppercase;letter-spacing:.5px">${lesson.activity}</span>
                    <span style="font-size:11px;font-weight:800;color:var(--amber)">+${lesson.xp} XP</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ── Open lesson ────────────────────────────────────────────────────────────
  function openLesson(phaseId, lessonId) {
    const phase  = PHASES[phaseId];
    const lesson = phase?.lessons?.find(l => l.id === lessonId);
    if (!lesson) return;

    if (lesson.activity === 'code' || lesson.activity === 'project') {
      // Redirect to code editor with context
      go('editor');
      setTimeout(() => {
        const title = document.getElementById('lessonTitle');
        const desc  = document.getElementById('lessonDesc');
        if (title) title.textContent = `${phase.code} · ${lesson.title}`;
        if (desc)  desc.textContent  = lesson.desc;
      }, 150);
      return;
    }

    // Render inline content for offline lessons
    const screen = document.getElementById('s-senior');
    if (!screen) return;
    screen.innerHTML = `
      <div style="max-width:800px;margin:0 auto;padding:28px 18px">
        <button class="btn btn-gh" onclick="TSASenior.openPhase('${phaseId}')" style="margin-bottom:16px">← Back to Phase</button>
        <div class="card">
          <div style="font-family:'Fredoka One',cursive;font-size:22px;color:var(--navy);margin-bottom:8px">${lesson.title}</div>
          <div style="font-size:14px;color:var(--muted);font-weight:500;margin-bottom:16px">${lesson.desc}</div>
          <div style="background:var(--slate);border-radius:11px;padding:20px;font-size:14px;color:var(--ink);line-height:1.75">
            📖 Full lesson content for <strong>${lesson.title}</strong> — built out in Stage 10 detailed content pass.
            <br><br>This lesson covers: <em>${lesson.desc}</em>
          </div>
        </div>
        <div style="margin-top:20px;text-align:center">
          <button class="btn btn-cy btn-full" style="max-width:320px;margin:0 auto"
            onclick="TSASenior.markLessonComplete('${phaseId}','${lessonId}').then(()=>TSASenior.openPhase('${phaseId}'))">
            ✓ Mark Complete (+${lesson.xp} XP)
          </button>
        </div>
      </div>
    `;
  }

  // ── Guardian View ──────────────────────────────────────────────────────────
  /**
   * Read-only progress snapshot for parents/teachers.
   * Renders as a modal overlay — no editing possible.
   */
  async function showGuardianView() {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) return;
    // Shorthand escaper — XSS prevention for all user data in innerHTML
    const e = window.TSASecurity ? window.TSASecurity.esc : (s => String(s || ''));

    // Build progress summary
    const allPhases  = { ...window.TSAJunior?.PHASES || {}, ...PHASES };
    const phaseRows  = Object.values(allPhases).map(ph => {
      const prog    = profile.phaseProgress?.[ph.id] || {};
      const lessons = ph.lessons || [];
      const done    = lessons.filter(l => prog.lessonsComplete?.includes(l.id)).length;
      const pct     = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : (prog.done ? 100 : 0);
      return `
        <tr>
          <td style="padding:9px 12px;font-size:13px;font-weight:700;color:var(--navy)">${ph.emoji} Phase ${ph.code || ph.num}: ${ph.title}</td>
          <td style="padding:9px 12px;text-align:center">
            <div style="background:var(--slate);border-radius:4px;height:8px;width:100px;overflow:hidden;display:inline-block">
              <div style="height:100%;border-radius:4px;background:${prog.done ? '#2EC4B6' : 'var(--cyan)'};width:${pct}%"></div>
            </div>
          </td>
          <td style="padding:9px 12px;text-align:center;font-size:12px;font-weight:700;color:${prog.done ? '#0A6E56' : 'var(--muted)'}">
            ${prog.done ? '✅ Complete' : done > 0 ? `${done}/${lessons.length} lessons` : 'Not started'}
          </td>
        </tr>
      `;
    }).join('');

    const ov = document.createElement('div');
    ov.className = 'overlay show';
    ov.id = 'guardianView';
    ov.innerHTML = `
      <div style="background:#fff;border-radius:22px;padding:36px 32px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:var(--sh-lg)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
          <div>
            <div style="font-family:'Fredoka One',cursive;font-size:23px;color:var(--navy)">👁 Guardian View</div>
            <div style="font-size:13px;color:var(--muted);font-weight:500;margin-top:3px">Read-only · Generated ${new Date().toLocaleDateString('en-GB')}</div>
          </div>
          <button class="btn btn-gh" onclick="document.getElementById('guardianView').remove()">✕ Close</button>
        </div>

        <!-- Learner card -->
        <div style="background:linear-gradient(130deg,var(--navy),var(--navy2));border-radius:var(--r-lg);padding:20px;margin-bottom:20px;display:flex;align-items:center;gap:16px">
          <div style="font-size:46px">${e(profile.avatar)}</div>
          <div>
            <div style="font-family:'Fredoka One',cursive;font-size:21px;color:#fff">${e(profile.name)}</div>
            <div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:2px;font-weight:500">Year ${e(String(profile.yearGroup))} · ${profile.journeyType === 'junior' ? 'Junior' : 'Senior'} Journey</div>
            <div style="display:flex;gap:14px;margin-top:9px;flex-wrap:wrap">
              <span style="font-size:12px;font-weight:800;color:var(--amber)">⭐ ${profile.xp} XP</span>
              <span style="font-size:12px;font-weight:800;color:var(--coral)">🔥 ${profile.streak || 0}-day streak</span>
              <span style="font-size:12px;font-weight:800;color:var(--cyan)">🏅 ${(profile.badges||[]).length} badges</span>
            </div>
          </div>
        </div>

        <!-- Phase progress table -->
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:10px">Learning Progress</div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          <thead>
            <tr style="background:var(--slate)">
              <th style="padding:9px 12px;text-align:left;font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.8px">Phase</th>
              <th style="padding:9px 12px;text-align:center;font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.8px">Progress</th>
              <th style="padding:9px 12px;text-align:center;font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.8px">Status</th>
            </tr>
          </thead>
          <tbody>
            ${phaseRows}
          </tbody>
        </table>

        <!-- Badges -->
        ${profile.badges?.length ? `
          <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:10px">Badges Earned</div>
          <div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:20px">
            ${profile.badges.map(b => {
              const badge = window.TSA.services.xp.getBadge(b);
              return `<span style="background:var(--slate);border-radius:20px;padding:5px 12px;font-size:12px;font-weight:700;color:var(--navy)">${badge.emoji} ${badge.label}</span>`;
            }).join('')}
          </div>
        ` : ''}

        <!-- Typing stats -->
        ${profile.typingStats?.bestWpm > 0 ? `
          <div style="background:var(--slate);border-radius:11px;padding:14px 16px;margin-bottom:16px">
            <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:8px">Typing Performance</div>
            <div style="display:flex;gap:20px">
              <div><div style="font-family:'Fredoka One',cursive;font-size:24px;color:var(--navy)">${profile.typingStats.bestWpm}</div><div style="font-size:11px;color:var(--muted);font-weight:700">Best WPM</div></div>
              <div><div style="font-family:'Fredoka One',cursive;font-size:24px;color:var(--navy)">${profile.typingStats.sessionsCompleted || 0}</div><div style="font-size:11px;color:var(--muted);font-weight:700">Sessions</div></div>
            </div>
          </div>
        ` : ''}

        <p style="font-size:12px;color:var(--muted);text-align:center;line-height:1.6">
          This is a read-only snapshot of learning progress stored on this device.<br>
          No data is sent to any server in Release 1 · TekkieStack by Aperintel Ltd
        </p>
      </div>
    `;
    document.body.appendChild(ov);
  }

  // ── Portfolio Generator ────────────────────────────────────────────────────
  /**
   * Generates a downloadable HTML portfolio from the learner's completed projects.
   */
  async function generatePortfolio() {
    const profile  = await window.TSA.services.sessionManager.getActiveProfile();
    const projects = await window.TSA.storage.getByIndex('projects_store', 'profileId', profile.profileId);

    const completedPhases = Object.entries(profile.phaseProgress || {})
      .filter(([, v]) => v.done)
      .map(([k]) => {
        const ph = PHASES[k] || window.TSAJunior?.PHASES?.[k];
        return ph ? `${ph.emoji} Phase ${ph.code || ph.num}: ${ph.title}` : k;
      });

    const projectCards = projects.length > 0
      ? projects.map(p => `
          <div class="project-card">
            <h3>${p.name || 'Untitled Project'}</h3>
            <p class="meta">Saved ${new Date(p.updatedAt || p.createdAt).toLocaleDateString('en-GB')}</p>
            <div class="preview-box">
              <iframe srcdoc="${(p.code || '').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}" style="width:100%;height:200px;border:none;border-radius:8px"></iframe>
            </div>
          </div>
        `).join('')
      : '<p style="color:#6B7A99;text-align:center;padding:30px">No saved projects yet — build something in the Code Editor!</p>';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${profile.name}'s TekkieStack Portfolio</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Segoe UI',sans-serif; background:#0F1F3D; color:#CDD9F0; padding:36px 24px; }
  .hero { text-align:center; margin-bottom:48px; padding:48px 24px; background:rgba(0,201,177,.05); border:1px solid rgba(0,201,177,.15); border-radius:20px; }
  .avatar { font-size:72px; display:block; margin-bottom:14px; }
  h1 { font-size:42px; color:#fff; margin-bottom:6px; }
  .tagline { font-size:17px; color:rgba(255,255,255,.55); margin-bottom:20px; }
  .stats { display:flex; gap:28px; justify-content:center; flex-wrap:wrap; }
  .stat { text-align:center; }
  .stat-n { font-size:30px; font-weight:700; color:#00C9B1; }
  .stat-l { font-size:12px; color:rgba(255,255,255,.4); text-transform:uppercase; letter-spacing:1px; margin-top:3px; }
  h2 { font-size:26px; color:#fff; margin:40px 0 18px; }
  .phases { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:40px; }
  .phase-chip { background:rgba(0,201,177,.12); border:1px solid rgba(0,201,177,.25); border-radius:20px; padding:7px 16px; font-size:13px; font-weight:700; color:#00C9B1; }
  .projects { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
  .project-card { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:20px; }
  .project-card h3 { font-size:16px; color:#fff; margin-bottom:5px; }
  .meta { font-size:12px; color:rgba(255,255,255,.4); margin-bottom:12px; }
  .preview-box { background:#fff; border-radius:8px; overflow:hidden; }
  .badges { display:flex; flex-wrap:wrap; gap:8px; }
  .badge { background:rgba(255,179,71,.1); border:1px solid rgba(255,179,71,.25); border-radius:20px; padding:5px 13px; font-size:13px; color:#FFB347; }
  .footer { text-align:center; margin-top:52px; padding-top:28px; border-top:1px solid rgba(255,255,255,.07); font-size:12px; color:rgba(255,255,255,.25); }
</style>
</head>
<body>
<div class="hero">
  <span class="avatar">${profile.avatar}</span>
  <h1>${profile.name}'s Portfolio</h1>
  <p class="tagline">Year ${profile.yearGroup} · TekkieStack Learner · Built with code</p>
  <div class="stats">
    <div class="stat"><div class="stat-n">${profile.xp}</div><div class="stat-l">Total XP</div></div>
    <div class="stat"><div class="stat-n">${profile.streak || 0}</div><div class="stat-l">Day Streak</div></div>
    <div class="stat"><div class="stat-n">${(profile.badges||[]).length}</div><div class="stat-l">Badges</div></div>
    <div class="stat"><div class="stat-n">${projects.length}</div><div class="stat-l">Projects</div></div>
    ${profile.typingStats?.bestWpm ? `<div class="stat"><div class="stat-n">${profile.typingStats.bestWpm}</div><div class="stat-l">Best WPM</div></div>` : ''}
  </div>
</div>

${completedPhases.length ? `<h2>📚 Phases Completed</h2><div class="phases">${completedPhases.map(p=>`<span class="phase-chip">${p}</span>`).join('')}</div>` : ''}

<h2>🚀 Projects</h2>
<div class="projects">${projectCards}</div>

${profile.badges?.length ? `<h2>🏅 Badges</h2><div class="badges">${profile.badges.map(b => { const badge = window.TSA.services.xp.getBadge(b); return `<span class="badge">${badge.emoji} ${badge.label}</span>`; }).join('')}</div>` : ''}

<div class="footer">
  Generated by TekkieStack · ${new Date().toLocaleDateString('en-GB')} · Built by Aperintel Ltd
</div>
</body>
</html>`;

    // Download
    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.toLowerCase().replace(/\s+/g,'-')}-tekkiestack-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);

    await window.TSA.services.xp.awardBadge('portfolio_published').then(awarded => {
      if (awarded) celebrate('🎨', 'Portfolio Published!', 'Download complete', '+10 XP');
    });
  }

  // ── Ensure s-senior screen exists ─────────────────────────────────────────
  function ensureScreen() {
    if (!document.getElementById('s-senior')) {
      const div = document.createElement('div');
      div.id = 's-senior';
      div.className = 'screen';
      document.body.insertBefore(div, document.querySelector('.site-footer'));
    }
  }

  if (window.TSA) {
    ensureScreen();
    window.TSA.routes['senior'] = () => renderSeniorJourney();
  }

  return { PHASES, checkGate, markLessonComplete, renderSeniorJourney, openPhase, openLesson, showGuardianView, generatePortfolio };
})();

window.TSASenior = TSASenior;
