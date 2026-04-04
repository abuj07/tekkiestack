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
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:26px">🧩 What is an Algorithm?</h2>
            <p style="font-size:13px;color:var(--muted);font-weight:600;margin-bottom:20px">Lesson 1 of 4 — Phase 1: Think Like a Builder</p>

            <div style="margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 1 — What Does Algorithm Even Mean?</h3>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">An <strong>algorithm</strong> is a set of step-by-step instructions that solve a problem or complete a task. Every time a computer does something — from showing you a YouTube video to sending a text message — it follows an algorithm.</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">Think of it like a recipe. A recipe tells a baker exactly what to do, in what order, to make a cake. If you skip a step or do them in the wrong order, the cake comes out wrong — or doesn't come out at all! Computers are the same: they follow instructions <em>exactly</em> as written, with zero guessing.</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">Fun fact: the word "algorithm" comes from the name of a 9th-century Persian mathematician called Al-Khwarizmi. So next time someone says algorithms are modern — they're actually over 1,000 years old! 🤯</p>
              <p style="line-height:1.8;font-size:15px">A good algorithm is: <strong>clear</strong> (no ambiguous steps), <strong>ordered</strong> (steps happen in the right sequence), and <strong>finite</strong> (it eventually ends — it doesn't loop forever).</p>
            </div>

            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px;font-size:18px">Section 2 — 🥪 Worked Example: Make a Sandwich</h3>
              <p style="font-size:14px;margin-bottom:12px">Here is a complete algorithm for making a peanut butter sandwich. Notice every step is specific — the computer can't "figure out" what you mean:</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:16px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2">
                START<br>
                1. Get two slices of bread from the bag<br>
                2. Place both slices flat on the plate<br>
                3. Pick up the butter knife<br>
                4. Open the peanut butter jar<br>
                5. Scoop one spoonful of peanut butter<br>
                6. Spread peanut butter on slice 1<br>
                7. Place slice 2 on top of slice 1<br>
                8. Cut the sandwich diagonally<br>
                END
              </div>
              <p style="font-size:13px;color:var(--muted);margin-top:10px">🔍 Notice: if we skipped step 3 (picking up the knife), the whole algorithm breaks. Computers need every tiny step written out.</p>
            </div>

            <div style="background:var(--slate);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 3 — ✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:12px">Write your own algorithm for brushing your teeth. Be as specific as a robot that has never brushed teeth before needs to be — assume it knows nothing! Include at least 6 steps.</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid var(--border);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:140px;outline:none;resize:vertical;box-sizing:border-box" placeholder="Step 1: Pick up the toothbrush&#10;Step 2: Turn on the tap&#10;Step 3: ...&#10;Step 4: ...&#10;Step 5: ...&#10;Step 6: ..."></textarea>
            </div>

            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;margin-bottom:10px;font-size:18px">🐛 Section 4 — Bug Hunt!</h3>
              <p style="font-size:14px;margin-bottom:12px">This algorithm for getting dressed in the morning has a problem. Can you find what's wrong?</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:12px">
                1. Put on your shoes<br>
                2. Put on your socks<br>
                3. Put on your trousers<br>
                4. Put on your shirt<br>
                5. Put on your jumper
              </div>
              <p style="font-size:14px;margin-bottom:10px">What is the bug, and what order should steps 1 and 2 be in?</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:vertical;box-sizing:border-box" placeholder="The bug is... because... The correct order should be..."></textarea>
            </div>

            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:20px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;margin-bottom:10px;font-size:18px">💭 Section 5 — Think About It</h3>
              <p style="font-size:15px;font-weight:600;margin-bottom:10px">When did YOU follow an algorithm today without realising it?</p>
              <p style="font-size:14px;color:var(--muted);margin-bottom:10px">Think about your morning routine, how you play a video game, or how you make a meal. Write 2–3 sentences about an algorithm you used today — even if you didn't know it was one at the time.</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:vertical;box-sizing:border-box" placeholder="Today I followed an algorithm when I..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j1-l2', title: 'Sequencing & Order',
          desc: 'Computers do EXACTLY what you tell them — in exactly the right order.',
          activity: 'offline', xp: 15,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:26px">🔢 Sequencing & Order</h2>
            <p style="font-size:13px;color:var(--muted);font-weight:600;margin-bottom:20px">Lesson 2 of 4 — Phase 1: Think Like a Builder</p>

            <div style="margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 1 — Why Does Order Matter So Much?</h3>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">Computers follow instructions in <strong>sequence</strong> — one step at a time, exactly in the order they are written. They cannot skip ahead, guess what you meant, or say "hmm, that doesn't feel right."</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">Imagine asking a robot to make you a bowl of cereal. If you tell it "add milk" before "get the bowl", it pours milk onto the table. Oops! The robot did exactly what you said — in exactly the order you said it. This is called a <strong>sequence error</strong>.</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">Sequencing matters in everything: pouring a glass of juice (glass first, then pour!), making a game character jump (check input first, then play animation), and even loading a webpage (download HTML first, then apply CSS).</p>
              <p style="line-height:1.8;font-size:15px">The word "sequence" comes from the Latin word for "follow" — because in a sequence, each step follows the one before it.</p>
            </div>

            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px;font-size:18px">Section 2 — 🍳 Worked Example: Making Toast</h3>
              <p style="font-size:14px;margin-bottom:12px">Here are two sequences. One is correct. One will either make a mess or leave you hungry:</p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <div style="font-weight:700;color:#C0392B;font-size:13px;margin-bottom:8px">❌ Wrong Sequence</div>
                  <div style="background:#0D1B2E;color:#FF6B6B;padding:12px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.9">
                    1. Spread butter on bread<br>
                    2. Put bread in toaster<br>
                    3. Wait for toast<br>
                    4. Remove from toaster<br>
                    5. Get bread from bag
                  </div>
                </div>
                <div>
                  <div style="font-weight:700;color:#0A6E56;font-size:13px;margin-bottom:8px">✅ Correct Sequence</div>
                  <div style="background:#0D1B2E;color:#A5F3FC;padding:12px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.9">
                    1. Get bread from bag<br>
                    2. Put bread in toaster<br>
                    3. Wait for toast<br>
                    4. Remove from toaster<br>
                    5. Spread butter on bread
                  </div>
                </div>
              </div>
              <p style="font-size:13px;color:var(--muted);margin-top:10px">🔍 In the wrong sequence, we try to butter the bread before it even exists in our hand — and before it's toasted!</p>
            </div>

            <div style="background:var(--slate);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 3 — ✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:12px">Below are the steps for washing your hands, but they are in the WRONG order. Number them 1–6 in the correct sequence:</p>
              ${[
                'Dry hands with a towel',
                'Turn on the tap',
                'Rub hands together with soap for 20 seconds',
                'Apply soap to hands',
                'Rinse the soap off under the water',
                'Turn off the tap',
              ].map((s, i) => `<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;padding:10px;background:rgba(255,255,255,.6);border-radius:8px;border:1px solid var(--border)"><input type="number" min="1" max="6" style="width:48px;padding:8px;border:1.5px solid var(--cyan);border-radius:6px;text-align:center;font-size:16px;font-family:'Fredoka One',cursive;outline:none"><span style="font-size:14px;font-weight:500">${s}</span></div>`).join('')}
            </div>

            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;margin-bottom:10px;font-size:18px">🐛 Section 4 — Bug Hunt!</h3>
              <p style="font-size:14px;margin-bottom:12px">This algorithm for logging into a website has a sequencing error. Find it!</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:12px">
                1. Click the "Log In" button<br>
                2. Open the website<br>
                3. Type your username<br>
                4. Type your password<br>
                5. Press Enter
              </div>
              <p style="font-size:14px;margin-bottom:10px">Which step is in the wrong place? Where should it go?</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:vertical;box-sizing:border-box" placeholder="The bug is step... because... It should come before/after step..."></textarea>
            </div>

            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:20px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;margin-bottom:10px;font-size:18px">💭 Section 5 — Think About It</h3>
              <p style="font-size:15px;font-weight:600;margin-bottom:10px">Can you think of a time when doing steps in the wrong order caused a problem for you or someone you know?</p>
              <p style="font-size:14px;color:var(--muted);margin-bottom:10px">Maybe in cooking, sport, getting ready for school, or in a game. Write 2–3 sentences describing what happened and what the correct order should have been.</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:vertical;box-sizing:border-box" placeholder="Once, I did steps in the wrong order when..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j1-l3', title: 'Loops — Repeat Yourself',
          desc: 'Instead of writing the same instructions over and over, we use loops!',
          activity: 'offline', xp: 15,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:26px">🔁 Loops — Don't Repeat Yourself!</h2>
            <p style="font-size:13px;color:var(--muted);font-weight:600;margin-bottom:20px">Lesson 3 of 4 — Phase 1: Think Like a Builder</p>

            <div style="margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 1 — What Is a Loop?</h3>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">Imagine you had to write "I will not throw paper aeroplanes in class" 100 times as a punishment. That would take ages. But a computer could do it in milliseconds — using a <strong>loop</strong>.</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">A <strong>loop</strong> is an instruction that tells a computer to repeat a set of steps — either a specific number of times, or until a certain condition becomes true. Loops are one of the most powerful ideas in all of computing.</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">There are two main types of loop: <strong>count-controlled loops</strong> (repeat exactly 10 times) and <strong>condition-controlled loops</strong> (keep going until the pizza is ready). You'll use both types when you start coding for real.</p>
              <p style="line-height:1.8;font-size:15px">Real-world loops: your phone checks for new messages every 30 seconds (condition loop), a game character's walking animation loops while you hold the button (condition loop), a high score table shows your top 10 scores (count loop).</p>
            </div>

            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px;font-size:18px">Section 2 — 🎮 Worked Example: Pac-Man Walk Cycle</h3>
              <p style="font-size:14px;margin-bottom:12px">When Pac-Man moves, his mouth opens and closes. Without a loop, a programmer would have to write every frame manually. With a loop, they write it once:</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:16px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:12px">
                <span style="color:#FFB347">// Without a loop — awful! 😱</span><br>
                open mouth → close mouth<br>
                open mouth → close mouth<br>
                open mouth → close mouth<br>
                open mouth → close mouth<br>
                <br>
                <span style="color:#FFB347">// With a loop — brilliant! ✅</span><br>
                REPEAT WHILE moving:<br>
                &nbsp;&nbsp;open mouth<br>
                &nbsp;&nbsp;close mouth
              </div>
              <div style="display:flex;align-items:center;gap:16px;background:#0F2A1F;border-radius:10px;padding:14px">
                <div style="font-size:36px;animation:none">🟡</div>
                <div>
                  <div style="color:#00C9B1;font-size:13px;font-weight:700">Count-controlled loop example:</div>
                  <div style="color:rgba(255,255,255,.7);font-size:13px;margin-top:4px">REPEAT 100 TIMES: move 1 pixel to the right</div>
                  <div style="color:#00C9B1;font-size:13px;font-weight:700;margin-top:8px">Condition-controlled loop example:</div>
                  <div style="color:rgba(255,255,255,.7);font-size:13px;margin-top:4px">WHILE lives &gt; 0: keep playing the game</div>
                </div>
              </div>
            </div>

            <div style="background:var(--slate);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 3 — ✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:14px">For each scenario below, write the loop instruction in plain English. Say whether it's a COUNT loop or a CONDITION loop, and write the repeat instruction.</p>
              ${[
                'A robot hoovering a room back and forth until the whole floor is clean',
                'Showing 5 adverts before a YouTube video plays',
                'A traffic light cycling through green → amber → red forever',
                'Counting down from 10 to 0 before a rocket launches',
              ].map((q, i) => `
                <div style="margin-bottom:14px;padding:14px;background:rgba(255,255,255,.7);border-radius:10px;border:1px solid var(--border)">
                  <p style="font-size:14px;font-weight:600;margin-bottom:8px">${i+1}. ${q}</p>
                  <textarea style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:7px;font-family:'DM Sans',sans-serif;font-size:13px;height:60px;outline:none;resize:none;box-sizing:border-box" placeholder="Type: COUNT or CONDITION — then write the loop instruction..."></textarea>
                </div>
              `).join('')}
            </div>

            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;margin-bottom:10px;font-size:18px">🐛 Section 4 — Bug Hunt!</h3>
              <p style="font-size:14px;margin-bottom:12px">This loop is supposed to print the numbers 1 through 5. But something is wrong — it will run forever! Can you see why?</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:12px">
                count = 1<br>
                REPEAT WHILE count &lt; 6:<br>
                &nbsp;&nbsp;print count<br>
                &nbsp;&nbsp;<span style="color:#FF6B6B">// Something is missing here!</span>
              </div>
              <textarea style="width:100%;padding:12px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:vertical;box-sizing:border-box" placeholder="The bug is: ... To fix it, add the line: ..."></textarea>
            </div>

            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:20px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;margin-bottom:10px;font-size:18px">💭 Section 5 — Think About It</h3>
              <p style="font-size:15px;font-weight:600;margin-bottom:10px">What is one thing you do every single day that works like a loop? How many times does it repeat, and what makes it stop?</p>
              <p style="font-size:14px;color:var(--muted);margin-bottom:10px">Hint: think about breathing, chewing food, watching a TV episode, or scrolling through a social media feed. Write 2–3 sentences.</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:vertical;box-sizing:border-box" placeholder="A loop in my daily life is..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j1-l4', title: 'Decisions — If This, Then That',
          desc: 'Computers can make decisions using IF/THEN logic.',
          activity: 'offline', xp: 15,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:26px">🤔 Decisions — If This, Then That</h2>
            <p style="font-size:13px;color:var(--muted);font-weight:600;margin-bottom:20px">Lesson 4 of 4 — Phase 1: Think Like a Builder</p>

            <div style="margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 1 — How Do Computers Make Choices?</h3>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">Computers seem really smart — they show you different content depending on who you are, they unlock new game levels when you have enough points, they send you to the right page when you click a link. How? They use <strong>decisions</strong>.</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">A decision in programming is called an <strong>IF statement</strong>. It works just like a fork in the road: IF a condition is true, go left. ELSE (otherwise), go right. The computer checks the condition — which is always either true or false — and then follows the correct path.</p>
              <p style="line-height:1.8;font-size:15px;margin-bottom:10px">You use IF logic every day: IF it is raining, take an umbrella. IF there is no cereal, have toast instead. IF the traffic light is red, stop. Your brain processes dozens of these every hour — computers can check millions per second!</p>
              <p style="line-height:1.8;font-size:15px">IF statements can be nested: IF you are hungry AND it is after 6pm, then have dinner. The AND and OR make conditions more powerful. You'll learn about these when you start coding!</p>
            </div>

            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:12px;font-size:18px">Section 2 — 🎮 Worked Example: Minecraft Mob Spawning</h3>
              <p style="font-size:14px;margin-bottom:12px">In Minecraft, monsters only spawn in the dark. Here's the decision algorithm the game uses:</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:16px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:12px">
                IF light_level &lt; 8:<br>
                &nbsp;&nbsp;IF random_chance &gt; 0.95:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;spawn a Creeper 💥<br>
                &nbsp;&nbsp;ELSE:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;spawn a Zombie 🧟<br>
                ELSE:<br>
                &nbsp;&nbsp;no mob spawns 😌
              </div>
              <p style="font-size:13px;color:var(--muted)">🔍 Notice the nested IF — a decision inside a decision! This is how complex behaviour can be created from simple true/false checks.</p>
              <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div style="background:rgba(0,201,177,.1);border-radius:8px;padding:12px">
                  <div style="font-weight:700;color:var(--navy);font-size:13px;margin-bottom:6px">✅ IF example</div>
                  <div style="font-size:13px;color:var(--ink);line-height:1.7">IF score &gt; 100:<br>&nbsp;&nbsp;unlock next level</div>
                </div>
                <div style="background:rgba(108,99,255,.1);border-radius:8px;padding:12px">
                  <div style="font-weight:700;color:var(--navy);font-size:13px;margin-bottom:6px">🔀 IF/ELSE example</div>
                  <div style="font-size:13px;color:var(--ink);line-height:1.7">IF password is correct:<br>&nbsp;&nbsp;log in<br>ELSE:<br>&nbsp;&nbsp;show error</div>
                </div>
              </div>
            </div>

            <div style="background:var(--slate);border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:10px;font-size:18px">Section 3 — ✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:14px">Complete the IF/ELSE algorithm for each scenario. Write the condition and both outcomes:</p>
              ${[
                { situation: 'A vending machine — the user has put in money', ifTrue: 'What happens if they press a button with enough money?', ifFalse: 'What happens if they do not have enough money?' },
                { situation: 'A school gate system — a student scans their card', ifTrue: 'What happens if the card is recognised?', ifFalse: 'What happens if the card is not in the system?' },
                { situation: 'A weather app notification', ifTrue: 'What does the app send if rain is forecast today?', ifFalse: 'What does it send if the weather is fine?' },
              ].map((s, i) => `
                <div style="margin-bottom:16px;padding:14px;background:rgba(255,255,255,.7);border-radius:10px;border:1px solid var(--border)">
                  <p style="font-size:14px;font-weight:700;margin-bottom:8px;color:var(--navy)">${i+1}. ${s.situation}</p>
                  <p style="font-size:12px;color:var(--muted);margin-bottom:6px">IF condition is true — ${s.ifTrue}</p>
                  <textarea style="width:100%;padding:8px;border:1.5px solid var(--cyan);border-radius:6px;font-family:'DM Sans',sans-serif;font-size:13px;height:50px;outline:none;resize:none;box-sizing:border-box;margin-bottom:8px" placeholder="IF ..."></textarea>
                  <p style="font-size:12px;color:var(--muted);margin-bottom:6px">ELSE — ${s.ifFalse}</p>
                  <textarea style="width:100%;padding:8px;border:1.5px solid #6C63FF;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:13px;height:50px;outline:none;resize:none;box-sizing:border-box" placeholder="ELSE ..."></textarea>
                </div>
              `).join('')}
            </div>

            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:20px;margin-bottom:22px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;margin-bottom:10px;font-size:18px">🐛 Section 4 — Bug Hunt!</h3>
              <p style="font-size:14px;margin-bottom:12px">This login algorithm has a logic error. It lets people in even when the password is wrong!</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:12px">
                IF username = "admin":<br>
                &nbsp;&nbsp;allow access<br>
                IF password = "secret123":<br>
                &nbsp;&nbsp;allow access<br>
                ELSE:<br>
                &nbsp;&nbsp;deny access
              </div>
              <p style="font-size:14px;margin-bottom:8px">Can you see why this is dangerous? What should the condition check instead?</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:vertical;box-sizing:border-box" placeholder="The bug is: ... The fix is: ..."></textarea>
            </div>

            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:20px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;margin-bottom:10px;font-size:18px">💭 Section 5 — Think About It</h3>
              <p style="font-size:15px;font-weight:600;margin-bottom:10px">Think of a decision you made today. What were the two possible paths? What condition did you check before deciding?</p>
              <p style="font-size:14px;color:var(--muted);margin-bottom:10px">Write it as an IF/ELSE algorithm in plain English. For example: "IF I wake up before 7am, have a slow breakfast. ELSE, grab something quick."</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:100px;outline:none;resize:vertical;box-sizing:border-box" placeholder="IF ...&#10;  THEN ...&#10;ELSE&#10;  ..."></textarea>
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
        {
          id: 'j3-l1', title: 'JavaScript Basics — Variables', desc: 'Store information in variables', activity: 'code', xp: 20,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">📦 JavaScript Basics — Variables</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 1 of 5 — Phase 3: Smart Builder</p>
            <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:17px;margin-bottom:8px">What is a Variable?</h3>
            <p style="font-size:14px;line-height:1.8;margin-bottom:12px">A <strong>variable</strong> is like a labelled box in your computer's memory. You can put a value inside — a number, a word, or anything else — and then use that label to get it back later. Variables are the most fundamental concept in all of programming.</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">Think of it like your school locker: it has a number (the variable name), and you put your stuff inside (the value). You can swap the stuff for something else later (unless it's a <strong>const</strong>!).</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">💡 let, const, and var — When to Use Each</h3>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2">
                <span style="color:#FFB347">// let — can be changed later</span><br>
                let score = 0;<br>
                score = 100; <span style="color:rgba(255,255,255,.5)">// ✅ allowed</span><br><br>
                <span style="color:#FFB347">// const — fixed forever (use this most of the time)</span><br>
                const playerName = "Alex";<br>
                <span style="color:rgba(255,255,255,.5)">// playerName = "Sam"; ← ❌ error!</span><br><br>
                <span style="color:#FFB347">// var — old style, avoid in new code</span><br>
                var oldStyle = "don't use me";
              </div>
              <p style="font-size:13px;color:var(--muted);margin-top:10px">📌 Rule of thumb: use <strong>const</strong> unless you know the value will change, then use <strong>let</strong>. Never use <strong>var</strong>.</p>
            </div>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🖨️ How to console.log a Variable</h3>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2">
                const myName = "Jordan";<br>
                let age = 12;<br>
                console.log(myName); <span style="color:rgba(255,255,255,.5)">// prints: Jordan</span><br>
                console.log("I am " + age + " years old");
              </div>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:12px">Declare 5 variables about yourself. Use <strong>const</strong> for things that won't change, <strong>let</strong> for things that might. Write them in the textarea:</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid var(--cyan);border-radius:8px;background:#0D1B2E;color:#A5F3FC;font-family:'JetBrains Mono',monospace;font-size:13px;height:130px;outline:none;resize:vertical;box-sizing:border-box" placeholder="const myName = &quot;...&quot;;&#10;const myAge = ...;&#10;let myFavouriteGame = &quot;...&quot;;&#10;let currentScore = ...;&#10;const mySchool = &quot;...&quot;;"></textarea>
            </div>
            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;font-size:16px;margin-bottom:10px">🐛 Spot the Bug!</h3>
              <p style="font-size:14px;margin-bottom:10px">This code should print "Hello, Alex! You have 5 lives." but it has a syntax error. Find it!</p>
              <div style="background:#0D1B2E;color:#FF6B6B;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:10px">
                const playerName = Alex; <span style="color:rgba(255,255,255,.4)">// line 1</span><br>
                let lives = 5;<br>
                console.log("Hello, " + playerName + "! You have " + lives + " lives.");
              </div>
              <textarea style="width:100%;padding:10px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:60px;outline:none;resize:none;box-sizing:border-box" placeholder="The bug is on line... The fix is..."></textarea>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">What three things about yourself would you store as variables if you were building a game where you're the main character?</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:70px;outline:none;resize:none;box-sizing:border-box" placeholder="I would store: 1)... 2)... 3)..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j3-l2', title: 'JavaScript — Functions', desc: 'Reuse code with functions', activity: 'code', xp: 20,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🍳 JavaScript — Functions</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 2 of 5 — Phase 3: Smart Builder</p>
            <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:17px;margin-bottom:8px">Functions Are Saved Recipes</h3>
            <p style="font-size:14px;line-height:1.8;margin-bottom:12px">A <strong>function</strong> is a named block of code you write once and can run (or "call") as many times as you want. Think of it like a recipe: you write the recipe once, then anyone can follow it any number of times without you rewriting it.</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">Without functions, you'd have to copy and paste the same code everywhere. If you needed to change it, you'd have to change every copy. Functions solve this — change the function once, and everywhere that uses it updates automatically.</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">💡 Functions: No Parameters → Parameters → Return</h3>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2">
                <span style="color:#FFB347">// No parameters — does the same thing every time</span><br>
                function sayHello() &#123;<br>
                &nbsp;&nbsp;console.log("Hello, TekkieStack!");<br>
                &#125;<br>
                sayHello(); <span style="color:rgba(255,255,255,.5)">// Call it!</span><br><br>
                <span style="color:#FFB347">// With parameters — customise the input</span><br>
                function greet(name) &#123;<br>
                &nbsp;&nbsp;return "Hello, " + name + "! Welcome to TekkieStack.";<br>
                &#125;<br>
                console.log(greet("Alex")); <span style="color:rgba(255,255,255,.5)">// Hello, Alex! Welcome to TekkieStack.</span><br>
                console.log(greet("Sam"));  <span style="color:rgba(255,255,255,.5)">// Hello, Sam! Welcome to TekkieStack.</span><br>
                console.log(greet("Mia"));  <span style="color:rgba(255,255,255,.5)">// Hello, Mia! Welcome to TekkieStack.</span>
              </div>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:10px">Write the <strong>greet(name)</strong> function that returns the exact message: <code style="background:#0D1B2E;color:#A5F3FC;padding:2px 6px;border-radius:4px">"Hello, [name]! Welcome to TekkieStack."</code></p>
              <p style="font-size:14px;margin-bottom:10px">Then call it 3 times with different names and console.log each result:</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid var(--cyan);border-radius:8px;background:#0D1B2E;color:#A5F3FC;font-family:'JetBrains Mono',monospace;font-size:13px;height:130px;outline:none;resize:vertical;box-sizing:border-box" placeholder="function greet(name) &#123;&#10;  // your code here&#10;&#125;&#10;&#10;console.log(greet(&quot;Alex&quot;));&#10;console.log(greet(&quot;...&quot;));&#10;console.log(greet(&quot;...&quot;));"></textarea>
            </div>
            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;font-size:16px;margin-bottom:10px">🐛 Spot the Bug!</h3>
              <p style="font-size:14px;margin-bottom:10px">This function should calculate the area of a rectangle and give back the answer, but it always gives <strong>undefined</strong>. What's missing?</p>
              <div style="background:#0D1B2E;color:#FF6B6B;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:10px">
                function area(width, height) &#123;<br>
                &nbsp;&nbsp;const result = width * height;<br>
                &nbsp;&nbsp;<span style="color:rgba(255,100,100,.8)">// something is missing here!</span><br>
                &#125;<br>
                console.log(area(5, 3)); <span style="color:rgba(255,255,255,.4)">// prints: undefined</span>
              </div>
              <textarea style="width:100%;padding:10px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:60px;outline:none;resize:none;box-sizing:border-box" placeholder="The bug is: the missing keyword is..."></textarea>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">Think of something you do every day that could be a function — something you do the same way each time but with different inputs. Write it as a function definition in plain English.</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:70px;outline:none;resize:none;box-sizing:border-box" placeholder="function [name]([input]) { ... }  // e.g. function makeToast(bread) { ... }"></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j3-l3', title: 'JavaScript — DOM Manipulation', desc: 'Change web pages with JS', activity: 'code', xp: 20,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🌐 JavaScript — DOM Manipulation</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 3 of 5 — Phase 3: Smart Builder</p>
            <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:17px;margin-bottom:8px">The DOM — The "Live" Version of Your HTML</h3>
            <p style="font-size:14px;line-height:1.8;margin-bottom:12px">When a browser loads your HTML file, it creates a <strong>Document Object Model (DOM)</strong> — a live, interactive version of your HTML that JavaScript can read and change. Think of the DOM like a family tree of every element on your page.</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">When you change the DOM with JavaScript, the page updates instantly — no reload needed. This is how chat apps show new messages, how games update scores, and how forms give you live feedback as you type.</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">💡 Key DOM Methods</h3>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2">
                <span style="color:#FFB347">// Get an element by its id</span><br>
                const heading = document.getElementById("title");<br><br>
                <span style="color:#FFB347">// Change the text content</span><br>
                heading.textContent = "New Heading Text";<br><br>
                <span style="color:#FFB347">// Change the HTML inside (can include tags)</span><br>
                heading.innerHTML = "&lt;span style='color:cyan'&gt;Coloured!&lt;/span&gt;";<br><br>
                <span style="color:#FFB347">// Change a style property</span><br>
                heading.style.color = "#00C9B1";<br>
                heading.style.fontSize = "32px";
              </div>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:10px">Given this HTML snippet, write JS to: (1) change the heading text, (2) change the background colour to purple, (3) add a new paragraph.</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:12px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;margin-bottom:10px">&lt;h1 id="title"&gt;Hello&lt;/h1&gt;<br>&lt;div id="box" style="background:#eee;padding:20px"&gt;<br>&nbsp;&nbsp;&lt;p id="msg"&gt;Original text&lt;/p&gt;<br>&lt;/div&gt;</div>
              <textarea style="width:100%;padding:12px;border:1.5px solid var(--cyan);border-radius:8px;background:#0D1B2E;color:#A5F3FC;font-family:'JetBrains Mono',monospace;font-size:13px;height:120px;outline:none;resize:vertical;box-sizing:border-box" placeholder="// 1. Change heading text&#10;document.getElementById('title').textContent = '...';&#10;&#10;// 2. Change background colour&#10;// 3. Add a new paragraph"></textarea>
            </div>
            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;font-size:16px;margin-bottom:10px">🐛 Spot the Bug!</h3>
              <p style="font-size:14px;margin-bottom:10px">This code throws an error because of a capitalisation mistake. Spot it!</p>
              <div style="background:#0D1B2E;color:#FF6B6B;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:10px">
                const btn = document.getElementByID("myButton");<br>
                btn.textContent = "Clicked!";
              </div>
              <textarea style="width:100%;padding:10px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:60px;outline:none;resize:none;box-sizing:border-box" placeholder="The bug is... The correct spelling is..."></textarea>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">Which element on your favourite website would you most want to control with JavaScript? What would you change about it?</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:70px;outline:none;resize:none;box-sizing:border-box" placeholder="On [website], I would change the [element] to..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j3-l4', title: 'JavaScript — Events', desc: 'React to clicks and inputs', activity: 'code', xp: 20,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🖱️ JavaScript — Events</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 4 of 5 — Phase 3: Smart Builder</p>
            <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:17px;margin-bottom:8px">Events: The Computer Listening for Things to Happen</h3>
            <p style="font-size:14px;line-height:1.8;margin-bottom:12px">An <strong>event</strong> is something that happens in the browser — a click, a key press, a mouse hover, a form submission. JavaScript can "listen" for these events and respond by running code. This is what makes web pages interactive.</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">Without events, a webpage is just a static document. With events, it becomes an application. Every button you've ever clicked, every form you've filled in, every game you've played in a browser runs on events.</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">💡 addEventListener and the event object</h3>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2">
                const btn = document.getElementById("myBtn");<br><br>
                <span style="color:#FFB347">// click event</span><br>
                btn.addEventListener("click", function() &#123;<br>
                &nbsp;&nbsp;console.log("Button clicked!");<br>
                &#125;);<br><br>
                <span style="color:#FFB347">// mouseover event</span><br>
                btn.addEventListener("mouseover", function() &#123;<br>
                &nbsp;&nbsp;btn.style.background = "#FF6B6B";<br>
                &#125;);<br><br>
                <span style="color:#FFB347">// Using the event object — e.target is the element that was clicked</span><br>
                document.addEventListener("click", function(e) &#123;<br>
                &nbsp;&nbsp;console.log("You clicked:", e.target);<br>
                &#125;);
              </div>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:10px">Write JavaScript that makes a div cycle through 3 background colours every time it's clicked: <strong>#00C9B1 → #FF6B6B → #6C63FF → #00C9B1 → ...</strong></p>
              <textarea style="width:100%;padding:12px;border:1.5px solid var(--cyan);border-radius:8px;background:#0D1B2E;color:#A5F3FC;font-family:'JetBrains Mono',monospace;font-size:13px;height:140px;outline:none;resize:vertical;box-sizing:border-box" placeholder="const colours = ['#00C9B1', '#FF6B6B', '#6C63FF'];&#10;let currentIndex = 0;&#10;const box = document.getElementById('colourBox');&#10;&#10;box.addEventListener('click', function() &#123;&#10;  // your code here&#10;&#125;);"></textarea>
            </div>
            <div style="background:#FFF5F5;border:1.5px solid #FF6B6B;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#C0392B;font-size:16px;margin-bottom:10px">🐛 Spot the Bug!</h3>
              <p style="font-size:14px;margin-bottom:10px">This event listener never fires. There's a typo in the method name. Find it!</p>
              <div style="background:#0D1B2E;color:#FF6B6B;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;margin-bottom:10px">
                const btn = document.getElementById("submitBtn");<br>
                btn.addEventListner("click", function() &#123;<br>
                &nbsp;&nbsp;console.log("Submitted!");<br>
                &#125;);
              </div>
              <textarea style="width:100%;padding:10px;border:1.5px solid #FF6B6B;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:60px;outline:none;resize:none;box-sizing:border-box" placeholder="The bug is: the correct spelling is addEventListener (missing the 'e' in Listener)"></textarea>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">If you could build your dream website, what would happen when a user clicks the main button? Describe the event and the result in 2–3 sentences.</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:70px;outline:none;resize:none;box-sizing:border-box" placeholder="On my dream website, when the user clicks... it would..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j3-l5', title: 'Build a Quiz Game', desc: 'Your first interactive project', activity: 'project', xp: 40,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🧠 Build a Quiz Game — Your First Project!</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 5 of 5 — Phase 3: Smart Builder</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">You're going to build a complete, interactive 5-question multiple choice quiz. When the player finishes, they'll see their score. This project uses variables, arrays, functions, DOM manipulation, and events — everything you've learned in Phase 3!</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">📐 Project Structure</h3>
              <p style="font-size:14px;margin-bottom:10px">Your quiz will have: a question display area, 4 answer buttons, a score counter, and a "next question" button. Here's the scaffold — complete the TODOs:</p>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.9;overflow-x:auto">
                const questions = [<br>
                &nbsp;&nbsp;&#123; q: "What does HTML stand for?", options: ["HyperText Markup Language","High Tech Modern Layout","HyperType Multipage Language","Hyper Transfer Media Links"], answer: 0 &#125;,<br>
                &nbsp;&nbsp;&#123; q: "Which tag creates a heading?", options: ["&lt;p&gt;","&lt;h1&gt;","&lt;div&gt;","&lt;span&gt;"], answer: 1 &#125;,<br>
                &nbsp;&nbsp;&#123; q: "CSS stands for?", options: ["Computer Style Sheets","Cascading Style Sheets","Creative Style Syntax","Colour Styling System"], answer: 1 &#125;,<br>
                &nbsp;&nbsp;&#123; q: "Which keyword declares a constant?", options: ["let","var","const","set"], answer: 2 &#125;,<br>
                &nbsp;&nbsp;&#123; q: "What does DOM stand for?", options: ["Document Object Model","Display Output Mode","Dynamic Old Markup","Design Object Method"], answer: 0 &#125;,<br>
                ];<br>
                let currentQ = 0;<br>
                let score = 0;<br><br>
                function showQuestion() &#123;<br>
                &nbsp;&nbsp;// TODO: Display questions[currentQ].q in the question element<br>
                &nbsp;&nbsp;// TODO: Display the 4 options as buttons<br>
                &#125;<br><br>
                function checkAnswer(chosen) &#123;<br>
                &nbsp;&nbsp;// TODO: If chosen === questions[currentQ].answer, increment score<br>
                &nbsp;&nbsp;// TODO: Move to next question or show final score<br>
                &#125;
              </div>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">📋 6 Steps to Complete</h3>
              <ol style="font-size:14px;line-height:2.4;padding-left:18px">
                <li>Create the HTML structure (question div, 4 option buttons, score display)</li>
                <li>Write showQuestion() to display the current question and options</li>
                <li>Wire each button's onclick to call checkAnswer() with the option index</li>
                <li>Write checkAnswer() — add to score if correct, then advance to next question</li>
                <li>Show the final score (e.g. "You scored 4/5!") when all questions are done</li>
                <li>Add a "Play Again" button that resets currentQ and score to 0</li>
              </ol>
            </div>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✅ Definition of Done</h3>
              <div style="font-size:14px;line-height:2.4">
                <div>☐  All 5 questions display correctly</div>
                <div>☐  Score increases for correct answers only</div>
                <div>☐  Correct answers are highlighted green</div>
                <div>☐  Wrong answers are highlighted red</div>
                <div>☐  Final score shows at the end</div>
                <div>☐  Play Again button resets everything</div>
              </div>
            </div>
            <div style="background:#FFF9EC;border:1.5px solid #FFB347;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#7B4F00;font-size:16px;margin-bottom:10px">🚀 Stretch Goals</h3>
              <ol style="font-size:14px;line-height:2.2;padding-left:18px">
                <li>Add a timer — each question has 15 seconds before auto-advancing</li>
                <li>Randomise the order of questions using <code>questions.sort(() => Math.random() - 0.5)</code></li>
                <li>Add a high score saved to localStorage that persists between sessions</li>
              </ol>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">What topic would YOU make a quiz about? What are 3 questions you'd add to the quiz about that topic?</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:90px;outline:none;resize:none;box-sizing:border-box" placeholder="My quiz topic would be: ...&#10;Q1: ...&#10;Q2: ...&#10;Q3: ..."></textarea>
            </div>
          </div>`,
        },
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
        {
          id: 'j4-l1', title: 'What is AI?', desc: 'Understanding artificial intelligence', activity: 'offline', xp: 15,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🤖 What is AI?</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 1 of 4 — Phase 4: AI &amp; Applied Engineering</p>
            <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:17px;margin-bottom:8px">Teaching a Dog vs Programming a Robot</h3>
            <p style="font-size:14px;line-height:1.8;margin-bottom:12px"><strong>Artificial Intelligence (AI)</strong> is a type of computer system that performs tasks that usually require human intelligence — like recognising faces, understanding speech, or making recommendations.</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:12px">Here's a great way to think about the difference between a normal program and AI: imagine training a dog vs programming a robot. When you program a robot, you write every single rule: "IF ball moves left, THEN move left." But when you train a dog, you show it examples over and over (fetch the ball, good dog!) and it learns the pattern itself. AI is like the dog — it learns from examples instead of following fixed rules.</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">This "learning from examples" approach is called <strong>machine learning</strong>. The AI looks at millions of examples, finds patterns, and builds a model it can use to handle new situations it has never seen before.</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🌍 5 AI Examples You Already Use</h3>
              ${[
                ['Siri / Alexa', 'Listens to your voice, recognises words, understands commands'],
                ['Netflix recommendations', 'Watches what you watch, predicts what you\'ll enjoy next'],
                ['Snapchat filters', 'Detects your face in real time and overlays effects precisely'],
                ['Spam filters', 'Analyses emails, learns what spam looks like, blocks new ones'],
                ['Google autocomplete', 'Predicts what you\'ll type based on billions of previous searches'],
              ].map(([name, desc]) => `<div style="display:grid;grid-template-columns:160px 1fr;gap:8px;padding:10px;background:rgba(0,201,177,.07);border-radius:8px;margin-bottom:8px;font-size:14px"><strong>${name}</strong><span style="color:var(--ink)">${desc}</span></div>`).join('')}
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✍️ Your Turn Activity</h3>
              <p style="font-size:14px;margin-bottom:12px">For each of the 5 AI examples above, answer: (a) what is the AI learning from? (b) what is it trying to predict or do?</p>
              <textarea style="width:100%;padding:12px;border:1.5px solid var(--cyan);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;height:150px;outline:none;resize:vertical;box-sizing:border-box" placeholder="Siri: learns from voice recordings. Predicts which words you're saying.&#10;Netflix: learns from...&#10;Snapchat: learns from...&#10;Spam filter: learns from...&#10;Google: learns from..."></textarea>
            </div>
            <div style="background:#FFF8EC;border:1.5px solid #FFB347;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#7B4F00;font-size:16px;margin-bottom:8px">💬 Discussion</h3>
              <p style="font-size:14px;margin-bottom:10px">AI gets things wrong — sometimes hilariously, sometimes dangerously. Have you ever seen AI make a funny mistake? (Think: autocorrect disasters, voice assistants mishearing you, weird Netflix recommendations.)</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #FFB347;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:70px;outline:none;resize:none;box-sizing:border-box" placeholder="Yes! Once AI got it wrong when... It recommended / said / did..."></textarea>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">Is there anything you think AI should <em>never</em> be allowed to do? Write 2–3 sentences explaining your answer.</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:none;box-sizing:border-box" placeholder="I think AI should never... because..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j4-l2', title: 'Prompt Engineering Basics', desc: 'How to talk to AI tools', activity: 'ai', xp: 20,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🗣️ Prompt Engineering Basics</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 2 of 4 — Phase 4: AI &amp; Applied Engineering</p>
            <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:17px;margin-bottom:8px">AI Responds to Instructions Called "Prompts"</h3>
            <p style="font-size:14px;line-height:1.8;margin-bottom:12px">A <strong>prompt</strong> is the instruction you give to an AI model. Just like a computer program follows code exactly, an AI responds to your prompt as precisely as it can. The quality of your prompt determines the quality of the answer.</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">This skill — writing effective prompts — is called <strong>prompt engineering</strong>. It's one of the most valuable new skills in tech, because it lets non-programmers harness the power of AI just through writing well.</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">💡 Vague vs Specific Prompt</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
                <div>
                  <div style="font-size:12px;font-weight:700;color:#C0392B;margin-bottom:6px">❌ Vague prompt</div>
                  <div style="background:#0D1B2E;color:#FF6B6B;padding:12px;border-radius:8px;font-size:13px;line-height:1.7">"Write something about space"</div>
                </div>
                <div>
                  <div style="font-size:12px;font-weight:700;color:#0A6E56;margin-bottom:6px">✅ Specific prompt</div>
                  <div style="background:#0D1B2E;color:#A5F3FC;padding:12px;border-radius:8px;font-size:13px;line-height:1.7">"Write a 3-sentence description of the Moon for an 8-year-old, including one fact they probably don't know"</div>
                </div>
              </div>
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px;margin-top:14px">4 Prompt Techniques</h3>
              ${[
                ['1. Be specific', 'Say exactly what you want, how long, what format, what level of detail'],
                ['2. Give context', 'Tell the AI who you are and why you need this: "I\'m a 12-year-old writing a school report about..."'],
                ['3. Set the format', 'Ask for bullet points, a table, a story, code — whatever format works best'],
                ['4. Give an example', 'Show the AI what a good answer looks like: "Write it like this example: [example]"'],
              ].map(([t, d]) => `<div style="padding:10px 14px;background:rgba(0,201,177,.07);border-radius:8px;margin-bottom:8px;font-size:14px"><strong style="color:var(--navy)">${t}:</strong> ${d}</div>`).join('')}
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✍️ Your Turn Activity — Improve These Bad Prompts</h3>
              <p style="font-size:14px;margin-bottom:12px">Rewrite each bad prompt to make it specific, contextual, and formatted properly:</p>
              ${[
                '"Explain history"',
                '"Write a story"',
                '"Help me with maths"',
              ].map((bad, i) => `
                <div style="margin-bottom:16px;padding:14px;background:rgba(255,255,255,.6);border-radius:10px;border:1px solid var(--border)">
                  <p style="font-size:13px;color:#C0392B;font-weight:700;margin-bottom:8px">Bad prompt ${i+1}: ${bad}</p>
                  <textarea style="width:100%;padding:10px;border:1.5px solid var(--cyan);border-radius:7px;font-family:'DM Sans',sans-serif;font-size:13px;height:70px;outline:none;resize:none;box-sizing:border-box" placeholder="Improved: ..."></textarea>
                </div>
              `).join('')}
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">How is writing a good prompt similar to writing a good algorithm? Think about clarity, specificity, and order. Write 2–3 sentences.</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:none;box-sizing:border-box" placeholder="Both algorithms and prompts are similar because..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j4-l3', title: 'AI in the Real World', desc: 'Where AI is used today', activity: 'offline', xp: 15,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🌍 AI in the Real World</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 3 of 4 — Phase 4: AI &amp; Applied Engineering</p>
            <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:17px;margin-bottom:12px">4 Industries Being Transformed by AI</h3>
            ${[
              { icon: '🏥', title: 'Healthcare', what: 'AI analyses medical scans (X-rays, MRIs) to detect diseases like cancer earlier than human doctors sometimes can.', example: 'DeepMind\'s AlphaFold solved a 50-year-old protein folding problem that helps researchers design new medicines.', benefit: 'Earlier diagnosis saves lives.', concern: 'Who is responsible if the AI gets it wrong?' },
              { icon: '🌿', title: 'Environment', what: 'AI models predict extreme weather events and monitor deforestation from satellite images in real time.', example: 'Google\'s floodforecasting AI warns millions of people in South Asia before floods hit.', benefit: 'Better predictions save lives and reduce waste.', concern: 'Training large AI models uses massive amounts of energy.' },
              { icon: '📚', title: 'Education', what: 'AI tutoring systems adapt the difficulty and topic of questions to exactly what each student needs.', example: 'Khan Academy\'s Khanmigo AI tutor works one-on-one with each student at their own pace.', benefit: 'Personalised learning for every student.', concern: 'Could reduce the need for human teachers.' },
              { icon: '🎨', title: 'Creative Arts', what: 'AI generates music, images, and video from text descriptions in seconds.', example: 'Midjourney can generate a detailed painting from a single text prompt; Suno creates full songs with lyrics.', benefit: 'Lowers the barrier to creative expression.', concern: 'Artists worry about their work being used to train AI without permission.' },
            ].map(s => `
              <div style="background:#F8F9FF;border:1.5px solid rgba(108,99,255,.2);border-radius:12px;padding:16px;margin-bottom:14px">
                <div style="font-family:'Fredoka One',cursive;font-size:17px;color:var(--navy);margin-bottom:8px">${s.icon} ${s.title}</div>
                <div style="font-size:14px;color:var(--ink);margin-bottom:6px;line-height:1.7"><strong>What it does:</strong> ${s.what}</div>
                <div style="font-size:13px;color:var(--muted);margin-bottom:6px;line-height:1.6"><strong>Real example:</strong> ${s.example}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
                  <div style="background:#D0F5EC;border-radius:8px;padding:8px;font-size:12px;color:#0A6E56"><strong>✅ Benefit:</strong> ${s.benefit}</div>
                  <div style="background:#FFE4E4;border-radius:8px;padding:8px;font-size:12px;color:#8B0000"><strong>⚠️ Concern:</strong> ${s.concern}</div>
                </div>
              </div>
            `).join('')}
            <div style="background:#FFF8EC;border:1.5px solid #FFB347;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#7B4F00;font-size:16px;margin-bottom:10px">💬 Discussion</h3>
              <p style="font-size:14px;margin-bottom:10px">Some people worry AI will take jobs. Others think it will create new ones. What do YOU think? Give a reason — there is no wrong answer.</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #FFB347;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:none;box-sizing:border-box" placeholder="I think AI will... because..."></textarea>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✍️ Design Your Own AI Tool</h3>
              <p style="font-size:14px;margin-bottom:12px">Design an AI tool that solves a real problem. Fill in the blanks:</p>
              <div style="display:grid;gap:10px">
                ${['My AI tool is called:', 'It learns from (what kind of data?):', 'It predicts or does:', 'The people it helps are:', 'One concern about it:'].map((label, i) => `
                  <div>
                    <div style="font-size:13px;font-weight:700;margin-bottom:4px">${label}</div>
                    <input type="text" style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:7px;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;box-sizing:border-box" placeholder="...">
                  </div>
                `).join('')}
              </div>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">Which AI application from this lesson surprised you the most, and why?</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:none;box-sizing:border-box" placeholder="The AI application that surprised me most was... because..."></textarea>
            </div>
          </div>`,
        },
        {
          id: 'j4-l4', title: 'Build an AI-Powered Page', desc: 'Combine HTML, JS, and AI', activity: 'project', xp: 50,
          content: `<!-- Think About It --><div style="padding:20px;max-width:720px">
            <h2 style="font-family:'Fredoka One',cursive;color:var(--navy);margin-bottom:6px;font-size:24px">🚀 Build an AI-Powered Page</h2>
            <p style="font-size:13px;color:var(--muted);margin-bottom:18px">Lesson 4 of 4 — Phase 4: AI &amp; Applied Engineering</p>
            <p style="font-size:14px;line-height:1.8;margin-bottom:16px">You'll build a webpage that feels like it has an AI assistant. Since we're working offline, we'll use a <strong>mock AI function</strong> that responds intelligently to keywords — teaching you the interface without needing a live API key.</p>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:15px;margin-bottom:10px">🤖 The Mock AI — How It Works</h3>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.9;margin-bottom:10px">
                function mockAI(prompt) &#123;<br>
                &nbsp;&nbsp;const p = prompt.toLowerCase();<br>
                &nbsp;&nbsp;if (p.includes("joke")) &#123;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛";<br>
                &nbsp;&nbsp;&#125; else if (p.includes("fact")) &#123;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Fact: Honey never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs — still edible!";<br>
                &nbsp;&nbsp;&#125; else if (p.includes("poem")) &#123;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "Roses are red,\\nViolets are blue,\\nYou just wrote your first AI app,\\nAnd that's pretty cool too! 🌟";<br>
                &nbsp;&nbsp;&#125; else &#123;<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return "I heard you say: \\"" + prompt + "\\" — try asking for a joke, fact, or poem!";<br>
                &nbsp;&nbsp;&#125;<br>
                &#125;
              </div>
              <p style="font-size:13px;color:var(--muted)">This teaches the same interface pattern as a real AI API — input goes in, output comes back. The only difference is where the intelligence lives.</p>
            </div>
            <div style="background:var(--slate);border-radius:12px;padding:18px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">📋 Build Scaffold — Complete the TODOs</h3>
              <div style="background:#0D1B2E;color:#A5F3FC;padding:14px;border-radius:9px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.9;overflow-x:auto">
                &lt;!-- HTML structure --&gt;<br>
                &lt;input type="text" id="promptInput" placeholder="Ask for a joke, fact, or poem..."&gt;<br>
                &lt;button onclick="sendPrompt()"&gt;Ask AI&lt;/button&gt;<br>
                &lt;div id="loading" style="display:none"&gt;🤔 Thinking...&lt;/div&gt;<br>
                &lt;div id="response"&gt;&lt;/div&gt;<br><br>
                async function sendPrompt() &#123;<br>
                &nbsp;&nbsp;const prompt = document.getElementById("promptInput").value;<br>
                &nbsp;&nbsp;// TODO 1: Show the loading div<br>
                &nbsp;&nbsp;// TODO 2: Get response from mockAI(prompt)<br>
                &nbsp;&nbsp;// TODO 3: Hide loading, show response in #response div<br>
                &nbsp;&nbsp;// TODO 4: If prompt is empty, show an error message instead<br>
                &#125;
              </div>
            </div>
            <div style="background:#F0FDFB;border:1.5px solid var(--cyan);border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:var(--navy);font-size:16px;margin-bottom:10px">✅ Definition of Done</h3>
              <div style="font-size:14px;line-height:2.5">
                <div>☐  Input field works and accepts text</div>
                <div>☐  "Ask AI" button triggers the function</div>
                <div>☐  AI response displays in the response div</div>
                <div>☐  Loading message shows while "waiting" (use setTimeout to simulate)</div>
                <div>☐  Error message shows if the input is empty</div>
              </div>
            </div>
            <div style="background:#FFF9EC;border:1.5px solid #FFB347;border-radius:12px;padding:16px;margin-bottom:18px">
              <h3 style="font-family:'Fredoka One',cursive;color:#7B4F00;font-size:16px;margin-bottom:10px">🚀 Stretch Goals</h3>
              <ol style="font-size:14px;line-height:2.2;padding-left:18px">
                <li>Add a "history" section showing previous prompts and responses</li>
                <li>Add a "character" dropdown (e.g. Pirate, Robot, Shakespeare) that changes the response style</li>
              </ol>
            </div>
            <div style="background:#F0F4FF;border:1.5px solid #6C63FF;border-radius:12px;padding:16px">
              <h3 style="font-family:'Fredoka One',cursive;color:#4A3F9F;font-size:16px;margin-bottom:8px">💭 Think About It</h3>
              <p style="font-size:14px;margin-bottom:8px">If you could add one real AI feature to this page using a real AI API, what would it do? How would it help the user?</p>
              <textarea style="width:100%;padding:10px;border:1.5px solid #6C63FF;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:14px;height:80px;outline:none;resize:none;box-sizing:border-box" placeholder="I would add a feature that..."></textarea>
            </div>
          </div>`,
        },
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
        // Award certificate XP + phase completion XP + badge
        await window.TSA.services.xp.addXP('CERTIFICATE');
        await window.TSA.services.xp.addXP('PHASE_COMPLETE');
        await window.TSA.services.xp.awardBadge(`phase${phase.num}_complete`);
        const xpReward = phase.xpReward || 50;
        celebrate(phase.emoji, `Phase ${phase.num} Complete!`, phase.title, `+${xpReward} XP 🎓`);

        // Check if ALL junior phases are complete → award Junior Graduate badge
        const allJuniorDone = Object.values(PHASES).every(p => prog[p.id]?.done);
        if (allJuniorDone) {
          await window.TSA.services.xp.awardBadge('phase_j_complete');
        }
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
          <button class="btn btn-cy btn-full" style="max-width:300px;margin:0 auto" onclick="TSAJunior.markLessonDoneWithQuiz('${phaseId}','${lessonId}')">
            ✓ Mark Complete (+${lesson.xp} XP)
          </button>
        </div>
      </div>
    `;
  }

  // ── Quiz-gated mark done ─────────────────────────────────────────────────
  function markLessonDoneWithQuiz(phaseId, lessonId) {
    if (window.TSAQuizGate && TSAQuizGate.hasQuizFor(lessonId)) {
      TSAQuizGate.showQuiz(lessonId, () => {
        markLessonComplete(phaseId, lessonId).then(() => openPhase(phaseId));
      }, () => {});
    } else {
      markLessonComplete(phaseId, lessonId).then(() => openPhase(phaseId));
    }
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

  return { PHASES, checkGate, markLessonComplete, markLessonDoneWithQuiz, renderJuniorJourney, openPhase, openLesson };
})();

window.TSAJunior = TSAJunior;
