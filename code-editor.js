/**
 * TekkieStack 2.0 — Junior Phases Module (Stage 9)
 * Junior Journey: Year 3–6, Phases 1–4.
 *
 * Phase 1: Think Like a Builder   (Y3–4, 4–6 wks)
 * Phase 2: Build the Web          (Y4–5, 6–8 wks)  ← lessons in code-editor.js
 * Phase 3: Smart Builder          (Y5–6, 4–6 wks)
 * Phase 4: AI & Applied Engineering (Y5–6, 4–6 wks)
 *
 * Each phase has a gate, lessons, and a certificate awarded on completion.
 * Phase 1 history carries forward visibly into Senior journey.
 *
 * Author: Aperintel Ltd
 */

const TSAJunior = (() => {

  // ── Phase definitions ────────────────────────────────────────────────────
  const PHASES = {
    j1: {
      id: 'j1', num: 1, journey: 'junior',
      title: 'Think Like a Builder',
      emoji: '🏗️', color: '#00C9B1', bgColor: '#EDFDF8',
      yearMin: 3, yearMax: 6,
      gate: null,    // No gate — entry phase
      certificate: 'cert_j1',
      weeks: '4–6 weeks',
      description: 'Discover how computers think. Learn sequencing, algorithms, and the basics of coding logic — no keyboard needed!',
      xpReward: 50,
      lessons: [
        {
          id: 'j1-l1', title: 'What is an Algorithm?',
          desc: 'Algorithms are step-by-step instructions. We follow them every day!',
          activity: 'offline', xp: 15,
          content: `<div style="padding:20px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px">What is an Algorithm?</h2>
            <p style="margin-bottom:14px;line-height:1.7">An <strong>algorithm</strong> is a set of step-by-step instructions to solve a problem. Like a recipe for a computer!</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:16px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">🥪 Algorithm: Make a Sandwich</div>
              <ol style="line-height:2;font-size:14px">
                <li>Get two slices of bread</li>
                <li>Open the butter</li>
                <li>Spread butter on one slice</li>
                <li>Add your filling</li>
                <li>Place second slice on top</li>
                <li>Cut in half</li>
              </ol>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:16px;margin-bottom:14px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">🎯 Your turn!</div>
              <p style="font-size:14px">Write an algorithm for brushing your teeth. What are the steps? Order matters!</p>
              <textarea style="width:100%;margin-top:10px;padding:11px;border:1.5px solid var(--border);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:100px;outline:none" placeholder="Step 1: &#10;Step 2: &#10;Step 3: ..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j1-l2', title: 'Sequencing & Order',
          desc: 'Computers do EXACTLY what you tell them — in exactly the right order.',
          activity: 'offline', xp: 15,
          content: `<div style="padding:20px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px">Sequencing & Order</h2>
            <p style="margin-bottom:14px;line-height:1.7">Computers follow instructions in <strong>sequence</strong> — one after another, in exactly the order you give them.</p>
            <div style="background:#FFF8EC;border:1.5px solid var(--amber);border-radius:12px;padding:16px;margin-bottom:16px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">⚠️ Order matters!</div>
              <p style="font-size:14px">If you write "put on shoes" before "put on socks" — your algorithm has a bug! Just like computers, order matters.</p>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:16px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">🔢 Challenge: Number these steps 1–5</div>
              ${['Put your shoes on', 'Wake up', 'Eat breakfast', 'Get dressed', 'Brush your teeth'].sort(() => Math.random()-.5).map((s,i) =>
                `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><input type="number" min="1" max="5" style="width:45px;padding:7px;border:1.5px solid var(--border);border-radius:6px;text-align:center;font-size:16px;font-family:'Fredoka One',cursive"><span style="font-size:14px">${s}</span></div>`
              ).join('')}
            </div>
          </div>`,
        },
        {
          id: 'j1-l3', title: 'Loops — Repeat Yourself',
          desc: 'Instead of writing the same instructions over and over, we use loops!',
          activity: 'offline', xp: 15,
          content: `<div style="padding:20px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px">Loops — Repeat Yourself!</h2>
            <p style="margin-bottom:14px;line-height:1.7">A <strong>loop</strong> lets us repeat instructions. Instead of writing the same thing 10 times, we tell the computer: "do this 10 times!"</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:16px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">🔁 Without a loop (messy!):</div>
              <code style="font-size:13px;background:#0D1B2E;color:#A5F3FC;padding:12px;border-radius:8px;display:block;line-height:1.8">clap hands<br>clap hands<br>clap hands<br>clap hands<br>clap hands</code>
            </div>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:16px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">✅ With a loop (smart!):</div>
              <code style="font-size:13px;background:#0D1B2E;color:#A5F3FC;padding:12px;border-radius:8px;display:block;line-height:1.8">REPEAT 5 TIMES:<br>&nbsp;&nbsp;clap hands</code>
            </div>
          </div>`,
        },
        {
          id: 'j1-l4', title: 'Decisions — If This, Then That',
          desc: 'Computers can make decisions using IF/THEN logic.',
          activity: 'offline', xp: 15,
          content: `<div style="padding:20px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px">Decisions — If This, Then That</h2>
            <p style="margin-bottom:14px;line-height:1.7">Computers can make <strong>decisions</strong>. They check a condition and choose what to do next.</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:16px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">🌧️ Real life IF/THEN:</div>
              <code style="font-size:13px;background:#0D1B2E;color:#A5F3FC;padding:12px;border-radius:8px;display:block;line-height:1.8">IF it is raining<br>&nbsp;&nbsp;THEN take an umbrella<br>ELSE<br>&nbsp;&nbsp;wear sunglasses</code>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:16px">
              <div style="font-weight:700;color:var(--navy);margin-bottom:8px">✍️ Write your own IF/THEN:</div>
              <textarea style="width:100%;margin-top:10px;padding:11px;border:1.5px solid var(--border);border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:13px;height:90px;outline:none" placeholder="IF ___&#10;  THEN ___&#10;ELSE&#10;  ___"></textarea>
            </div>
          </div>`,
        },
      ],
    },

    j2: {
      id: 'j2', num: 2, journey: 'junior',
      title: 'Build the Web',
      emoji: '🌐', color: '#6C63FF', bgColor: '#F0EFFF',
      yearMin: 4, yearMax: 6,
      gate: { phase: 'j1', minXp: 0 },
      certificate: 'cert_j2',
      weeks: '6–8 weeks',
      description: 'Build real web pages with HTML and CSS. By the end, you\'ll have a personal portfolio page!',
      xpReward: 100,
      lessonRef: 'code-editor',  // Lessons live in code-editor.js (p2-l1 to p2-l5)
    },

    j3: {
      id: 'j3', num: 3, journey: 'junior',
      title: 'Smart Builder',
      emoji: '🔧', color: '#FF6B6B', bgColor: '#FFF0F0',
      yearMin: 5, yearMax: 6,
      gate: { phase: 'j2', minXp: 0, yearMin: 5 },
      certificate: 'cert_j3',
      weeks: '4–6 weeks',
      description: 'Add interactivity with JavaScript. Make buttons click, forms submit, and pages come alive!',
      xpReward: 100,
      lessons: [
        { id: 'j3-l1', title: 'JavaScript Basics — Variables', desc: 'Store information in variables', activity: 'code', xp: 20 },
        { id: 'j3-l2', title: 'JavaScript — Functions',        desc: 'Reuse code with functions',     activity: 'code', xp: 20 },
        { id: 'j3-l3', title: 'JavaScript — DOM Manipulation', desc: 'Change web pages with JS',      activity: 'code', xp: 20 },
        { id: 'j3-l4', title: 'JavaScript — Events',           desc: 'React to clicks and inputs',    activity: 'code', xp: 20 },
        { id: 'j3-l5', title: 'Build a Quiz Game',             desc: 'Your first interactive project', activity: 'project', xp: 40 },
      ],
    },

    j4: {
      id: 'j4', num: 4, journey: 'junior',
      title: 'AI & Applied Engineering',
      emoji: '🤖', color: '#FFB347', bgColor: '#FFF9EC',
      yearMin: 5, yearMax: 6,
      gate: { phase: 'j3', minXp: 0, yearMin: 5 },
      certificate: 'cert_j4',
      weeks: '4–6 weeks',
      description: 'Discover AI, prompt engineering, and build projects that use intelligent features.',
      xpReward: 150,
      lessons: [
        { id: 'j4-l1', title: 'What is AI?',              desc: 'Understanding artificial intelligence', activity: 'offline', xp: 15 },
        { id: 'j4-l2', title: 'Prompt Engineering Basics', desc: 'How to talk to AI tools',              activity: 'ai',      xp: 20 },
        { id: 'j4-l3', title: 'AI in the Real World',     desc: 'Where AI is used today',               activity: 'offline', xp: 15 },
        { id: 'j4-l4', title: 'Build an AI-Powered Page', desc: 'Combine HTML, JS, and AI',             activity: 'project', xp: 50 },
      ],
    },
  };

  // ── Check phase gate ────────────────────────────────────────────────────
  /**
   * @param {object} phase
   * @param {object} profile
   * @returns {{ unlocked: boolean, reason: string }}
   */
  function checkGate(phase, profile) {
    if (!phase.gate) return { unlocked: true, reason: '' };
    const { phase: gatePhase, yearMin } = phase.gate;
    if (yearMin && profile.yearGroup < yearMin) {
      return { unlocked: false, reason: `Available from Year ${yearMin}` };
    }
    if (gatePhase) {
      const progress = profile.phaseProgress?.[gatePhase];
      if (!progress?.done) {
        return { unlocked: false, reason: `Complete Phase ${PHASES[gatePhase]?.num} first` };
      }
    }
    return { unlocked: true, reason: '' };
  }

  // ── Mark lesson complete ────────────────────────────────────────────────
  async function markLessonComplete(phaseId, lessonId) {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) return;

    const prog = { ...(profile.phaseProgress || {}) };
    if (!prog[phaseId]) prog[phaseId] = { lessonsComplete: [], done: false };
    if (!prog[phaseId].lessonsComplete.includes(lessonId)) {
      prog[phaseId].lessonsComplete.push(lessonId);
    }

    // Check if all lessons done
    const phase   = PHASES[phaseId];
    const lessons = phase?.lessons || [];
    if (lessons.length > 0 && prog[phaseId].lessonsComplete.length >= lessons.length) {
      if (!prog[phaseId].done) {
        prog[phaseId].done = true;
        // Award certificate XP
        await window.TSA.services.xp.addXP('CERTIFICATE');
        await window.TSA.services.xp.awardBadge(`phase${phase.num}_complete`);
        const xpReward = phase.xpReward || 50;
        celebrate(phase.emoji, `Phase ${phase.num} Complete!`, phase.title, `+${xpReward} XP 🎓`);
      }
    }

    await window.TSA.services.sessionManager.updateProfile(profile.profileId, { phaseProgress: prog });
    await window.TSA.services.xp.addXP('LESSON_COMPLETE');
    return prog[phaseId];
  }

  // ── Render Junior Journey screen ────────────────────────────────────────
  async function renderJuniorJourney() {
    const screen = document.getElementById('s-junior');
    if (!screen) return;

    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) { go('picker'); return; }

    const phases = Object.values(PHASES);

    screen.innerHTML = `
      <div style="max-width:1000px;margin:0 auto;padding:28px 18px">
        <div style="margin-bottom:24px">
          <h2 style="font-family:'Fredoka One',cursive;font-size:27px;color:var(--navy)">🎒 Junior Journey</h2>
          <p style="font-size:14px;color:var(--muted);margin-top:4px;font-weight:500">Year 3–6 · 4 phases · Build real things from day one</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          ${phases.map(ph => {
            const gate     = checkGate(ph, profile);
            const prog     = profile.phaseProgress?.[ph.id] || {};
            const lessons  = ph.lessons || [];
            const done     = lessons.filter(l => prog.lessonsComplete?.includes(l.id)).length;
            const pct      = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
            const isDone   = prog.done === true;
            const isCurrent = !isDone && gate.unlocked;

            return `
              <div class="card" style="border:1.5px solid ${isDone ? '#2EC4B6' : isCurrent ? ph.color : 'var(--border)'};background:${isDone ? '#EDFDF8' : '#fff'};cursor:${gate.unlocked ? 'pointer' : 'default'};transition:all .2s"
                onclick="${gate.unlocked ? `TSAJunior.openPhase('${ph.id}')` : ''}">
                <div style="display:flex;align-items:center;gap:13px;margin-bottom:12px">
                  <div style="width:50px;height:50px;border-radius:12px;background:${ph.bgColor};display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${ph.emoji}</div>
                  <div style="flex:1">
                    <div style="font-family:'Fredoka One',cursive;font-size:17px;color:var(--navy)">Phase ${ph.num}: ${ph.title}</div>
                    <div style="font-size:12px;color:var(--muted);font-weight:600;margin-top:2px">Year ${ph.yearMin}–${ph.yearMax} · ${ph.weeks}</div>
                  </div>
                  <div style="font-size:11px;font-weight:800;padding:3px 9px;border-radius:9px;${isDone ? 'background:#D0F5EC;color:#0A6E56' : isCurrent ? `background:${ph.bgColor};color:${ph.color}` : 'background:var(--slate);color:var(--muted)'}">
                    ${isDone ? '✅ Done' : isCurrent ? 'Active' : gate.reason || '🔒 Locked'}
                  </div>
                </div>
                <p style="font-size:13px;color:var(--muted);font-weight:500;margin-bottom:${lessons.length > 0 ? '12px' : '0'};line-height:1.5">${ph.description}</p>
                ${lessons.length > 0 ? `
                  <div style="background:var(--slate);border-radius:6px;height:6px;overflow:hidden;margin-bottom:5px">
                    <div style="height:100%;border-radius:6px;background:${ph.color};width:${pct}%;transition:width .7s"></div>
                  </div>
                  <div style="font-size:11px;color:var(--muted);font-weight:700">${done}/${lessons.length} lessons · ${pct}% complete</div>
                ` : ph.lessonRef ? `<div style="font-size:11px;color:var(--muted);font-weight:700">Lessons in Code Editor</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ── Open a phase ────────────────────────────────────────────────────────
  async function openPhase(phaseId) {
    const phase   = PHASES[phaseId];
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!phase || !profile) return;

    const gate = checkGate(phase, profile);
    if (!gate.unlocked) { alert(`Not unlocked yet: ${gate.reason}`); return; }

    if (phase.lessonRef === 'code-editor') {
      go('editor');
      return;
    }

    // Render phase detail inline in the s-junior screen
    const screen = document.getElementById('s-junior');
    if (!screen || !phase.lessons) return;

    const prog = profile.phaseProgress?.[phaseId] || {};

    screen.innerHTML = `
      <div style="max-width:800px;margin:0 auto;padding:28px 18px">
        <button class="btn btn-gh" onclick="TSAJunior.renderJuniorJourney()" style="margin-bottom:20px">← Back to Journey</button>
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
          <div style="width:60px;height:60px;border-radius:14px;background:${phase.bgColor};display:flex;align-items:center;justify-content:center;font-size:28px">${phase.emoji}</div>
          <div>
            <h2 style="font-family:'Fredoka One',cursive;font-size:24px;color:var(--navy)">Phase ${phase.num}: ${phase.title}</h2>
            <div style="font-size:13px;color:var(--muted);font-weight:600">Year ${phase.yearMin}–${phase.yearMax} · ${phase.weeks}</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${phase.lessons.map((lesson, idx) => {
            const done = prog.lessonsComplete?.includes(lesson.id);
            const prev = idx === 0 || prog.lessonsComplete?.includes(phase.lessons[idx-1].id);
            return `
              <div class="card" style="border:1.5px solid ${done ? '#2EC4B6' : prev ? phase.color : 'var(--border)'};cursor:${prev ? 'pointer' : 'default'};opacity:${prev ? 1 : .55}"
                onclick="${prev ? `TSAJunior.openLesson('${phaseId}','${lesson.id}')` : ''}">
                <div style="display:flex;align-items:center;gap:12px">
                  <div style="font-size:22px">${done ? '✅' : prev ? '▶️' : '🔒'}</div>
                  <div style="flex:1">
                    <div style="font-weight:700;color:var(--navy);font-size:15px">${lesson.title}</div>
                    <div style="font-size:12px;color:var(--muted);font-weight:500;margin-top:2px">${lesson.desc}</div>
                  </div>
                  <div style="font-size:11px;font-weight:800;color:var(--amber)">+${lesson.xp} XP</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ── Open a lesson ────────────────────────────────────────────────────────
  function openLesson(phaseId, lessonId) {
    const phase   = PHASES[phaseId];
    const lesson  = phase?.lessons?.find(l => l.id === lessonId);
    if (!lesson) return;

    const screen = document.getElementById('s-junior');
    if (!screen) return;

    screen.innerHTML = `
      <div style="max-width:800px;margin:0 auto;padding:28px 18px">
        <button class="btn btn-gh" onclick="TSAJunior.openPhase('${phaseId}')" style="margin-bottom:16px">← Back to Phase</button>
        ${lesson.content || `<div class="card"><div style="font-family:'Fredoka One',cursive;font-size:22px;color:var(--navy);margin-bottom:8px">${lesson.title}</div><p style="font-size:14px;color:var(--muted)">${lesson.desc}</p></div>`}
        <div style="margin-top:20px;text-align:center">
          <button class="btn btn-cy btn-full" style="max-width:300px;margin:0 auto" onclick="TSAJunior.markLessonComplete('${phaseId}','${lessonId}').then(()=>TSAJunior.openPhase('${phaseId}'))">
            ✓ Mark Complete (+${lesson.xp} XP)
          </button>
        </div>
      </div>
    `;
  }

  // ── Expose screen ────────────────────────────────────────────────────────
  // Add s-junior to DOM if not present
  function ensureScreen() {
    if (!document.getElementById('s-junior')) {
      const div = document.createElement('div');
      div.id = 's-junior';
      div.className = 'screen';
      document.body.insertBefore(div, document.querySelector('.site-footer'));
    }
  }

  if (window.TSA) {
    ensureScreen();
    window.TSA.routes['junior'] = () => renderJuniorJourney();
  }

  return { PHASES, checkGate, markLessonComplete, renderJuniorJourney, openPhase, openLesson };
})();

window.TSAJunior = TSAJunior;
