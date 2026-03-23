/**
 * TekkieStack 2.0 — XP & Engagement Engine
 * Handles XP events, milestones, badges, streaks, and freeze tokens.
 *
 * Author: Aperintel Ltd
 */

const TSAXp = (() => {

  // ── XP event values ───────────────────────────────────────────────────────
  const XP_EVENTS = {
    LESSON_COMPLETE:    20,
    PROJECT_SAVE:       10,
    DAILY_CHALLENGE:    15,
    DEBUG_SOLVED:       25,
    CERTIFICATE:        50,
    STREAK_7:           30,
    STREAK_30:         100,
    FIRST_BUILD:        25,
    BADGE_EARNED:       10,
    TYPING_SESSION:     10,
    TYPING_PERSONAL_BEST: 15,
  };

  // ── Milestones ────────────────────────────────────────────────────────────
  const MILESTONES = [
    { xp: 100,  badge: 'first_builder',      label: 'First Builder',       emoji: '🏗️' },
    { xp: 250,  badge: 'code_curious',       label: 'Code Curious',        emoji: '🔍' },
    { xp: 500,  badge: 'web_weaver',         label: 'Web Weaver',          emoji: '🌐' },
    { xp: 1000, badge: 'logic_legend',       label: 'Logic Legend',        emoji: '⚡' },
    { xp: 2500, badge: 'digital_architect',  label: 'Digital Architect',   emoji: '🏛️' },
  ];

  // ── Other badge definitions ───────────────────────────────────────────────
  const BADGES = {
    first_build:        { label: 'First Build',         emoji: '🚀' },
    streak_7:           { label: '7-Day Streak',         emoji: '🔥' },
    streak_30:          { label: '30-Day Streak',        emoji: '🌟' },
    streak_100:         { label: '100-Day Streak',       emoji: '👑' },
    debug_master:       { label: 'Debug Master',         emoji: '🐛' },
    speed_typer:        { label: 'Speed Typer (40 WPM)', emoji: '⌨️' },
    ai_explorer:        { label: 'AI Explorer',          emoji: '🤖' },
    portfolio_published:{ label: 'Portfolio Published',  emoji: '🎨' },
    phase1_complete:    { label: 'Phase 1 Complete',     emoji: '✅' },
    phase2_complete:    { label: 'Phase 2 Complete',     emoji: '✅' },
    phase3_complete:    { label: 'Phase 3 Complete',     emoji: '✅' },
    phase4_complete:    { label: 'Phase 4 Complete',     emoji: '✅' },
    // Milestone badges (also in MILESTONES)
    first_builder:      { label: 'First Builder',        emoji: '🏗️' },
    code_curious:       { label: 'Code Curious',         emoji: '🔍' },
    web_weaver:         { label: 'Web Weaver',           emoji: '🌐' },
    logic_legend:       { label: 'Logic Legend',         emoji: '⚡' },
    digital_architect:  { label: 'Digital Architect',    emoji: '🏛️' },
  };

  // ── Add XP ────────────────────────────────────────────────────────────────
  /**
   * Award XP to the active profile and check for milestone badges.
   * @param {string} eventKey — key from XP_EVENTS
   * @param {number} [override] — override amount (for custom values)
   * @returns {Promise<{ newXp: number, newBadges: string[] }>}
   */
  async function addXP(eventKey, override) {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) return { newXp: 0, newBadges: [] };

    const amount  = override ?? XP_EVENTS[eventKey] ?? 0;
    const prevXp  = profile.xp || 0;
    const newXp   = prevXp + amount;
    const newBadges = [];

    // Check milestones
    for (const m of MILESTONES) {
      if (prevXp < m.xp && newXp >= m.xp && !profile.badges.includes(m.badge)) {
        profile.badges.push(m.badge);
        newBadges.push(m.badge);
      }
    }

    const updated = await window.TSA.services.sessionManager.updateProfile(
      profile.profileId,
      { xp: newXp, badges: profile.badges }
    );

    // Award badge XP for each new badge (recursive-safe: use override)
    for (const b of newBadges) {
      await addXP('BADGE_EARNED', XP_EVENTS.BADGE_EARNED);
    }

    // Update nav UI
    _updateNavXP(updated);

    return { newXp, newBadges };
  }

  // ── Award a specific badge ────────────────────────────────────────────────
  /**
   * Award a named badge if the profile doesn't already have it.
   * @param {string} badgeKey
   * @returns {Promise<boolean>} — true if badge was newly awarded
   */
  async function awardBadge(badgeKey) {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile || profile.badges.includes(badgeKey)) return false;

    const badges = [...profile.badges, badgeKey];
    await window.TSA.services.sessionManager.updateProfile(profile.profileId, { badges });
    await addXP('BADGE_EARNED');
    console.log('[XP] Badge awarded:', badgeKey);
    return true;
  }

  // ── Streak ────────────────────────────────────────────────────────────────
  /**
   * Update streak on login / activity.
   * @returns {Promise<{ streak: number, wasIncremented: boolean }>}
   */
  async function updateStreak() {
    const profile = await window.TSA.services.sessionManager.getActiveProfile();
    if (!profile) return { streak: 0, wasIncremented: false };

    const today     = _today();
    const lastDate  = profile.streakLastDate;
    const streak    = profile.streak || 0;
    let   newStreak = streak;
    let   wasIncremented = false;

    if (!lastDate) {
      // First ever activity
      newStreak = 1;
      wasIncremented = true;
    } else if (lastDate === today) {
      // Already active today — no change
    } else {
      const diff = _dayDiff(lastDate, today);
      if (diff === 1) {
        // Consecutive day
        newStreak = streak + 1;
        wasIncremented = true;
      } else if (diff > 1) {
        // Missed days — try to use a freeze token
        const freeze = profile.freezeTokens || 0;
        if (freeze > 0) {
          newStreak = streak; // streak preserved
          await window.TSA.services.sessionManager.updateProfile(profile.profileId, { freezeTokens: freeze - 1 });
          console.log('[XP] Freeze token used. Tokens remaining:', freeze - 1);
        } else {
          newStreak = 1; // reset
        }
        wasIncremented = (newStreak > 1);
      }
    }

    const updates = { streak: newStreak, streakLastDate: today };

    // Streak bonuses
    if (wasIncremented) {
      if (newStreak === 7)  { await addXP('STREAK_7');  await awardBadge('streak_7'); }
      if (newStreak === 30) { await addXP('STREAK_30'); await awardBadge('streak_30'); }
      if (newStreak === 100){ await awardBadge('streak_100'); }
    }

    // Award a freeze token every 7th day
    if (wasIncremented && newStreak % 7 === 0) {
      const tokens = Math.min((profile.freezeTokens || 0) + 1, 3);
      updates.freezeTokens = tokens;
    }

    await window.TSA.services.sessionManager.updateProfile(profile.profileId, updates);
    return { streak: newStreak, wasIncremented };
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function _today() {
    return new Date().toISOString().slice(0, 10);
  }

  function _dayDiff(isoA, isoB) {
    const a = new Date(isoA).setHours(0,0,0,0);
    const b = new Date(isoB).setHours(0,0,0,0);
    return Math.round(Math.abs(b - a) / 86400000);
  }

  function _updateNavXP(profile) {
    const xpNum  = document.getElementById('xpNum');
    const xpFill = document.getElementById('xpFill');
    const cXp    = document.getElementById('cXp');
    const nStrk  = document.getElementById('nStreak');
    if (xpNum)  xpNum.textContent  = `${profile.xp} XP`;
    if (cXp)    cXp.textContent    = `${profile.xp} XP`;
    if (nStrk)  nStrk.textContent  = profile.streak || 0;
    if (xpFill) xpFill.style.width = `${Math.min((profile.xp / 500) * 100, 100)}%`;
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    XP_EVENTS,
    MILESTONES,
    BADGES,
    addXP,
    awardBadge,
    updateStreak,

    /** Get badge definition by key */
    getBadge: (key) => BADGES[key] || { label: key, emoji: '🏅' },
  };
})();

if (typeof window !== 'undefined') {
  window._TSAXpModule = TSAXp;
}
