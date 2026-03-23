/**
 * TekkieStack 2.0 — Session Manager
 * Handles multi-user profiles, PIN hashing, and session lifecycle.
 *
 * Profile schema includes a `userId` field (null in Release 1,
 * populated when linked to a Railway cloud account in Release 2).
 *
 * Author: Aperintel Ltd
 */

const TSASession = (() => {
  const ACTIVE_SESSION_KEY = 'active_session';
  const MAX_PROFILES = 10;
  const MAX_BACKUPS  = 5;

  // ── PIN hashing (SHA-256 via SubtleCrypto) ───────────────────────────────
  /**
   * Hash a PIN with a device-specific salt.
   * The PIN is never stored in plaintext — only the hash is persisted.
   * @param {string} pin   — 4-digit PIN string
   * @param {string} salt  — deviceId from config
   * @returns {Promise<string>} — hex hash
   */
  async function hashPIN(pin, salt) {
    const data   = new TextEncoder().encode(pin + salt);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // ── Generate IDs ─────────────────────────────────────────────────────────
  /**
   * Generate a UUID v4.
   * @returns {string}
   */
  function uuid() {
    return crypto.randomUUID ? crypto.randomUUID() :
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
  }

  // ── Create profile ────────────────────────────────────────────────────────
  /**
   * Create a new learner profile and save it to storage.
   *
   * Profile schema (v5):
   * {
   *   profileId   : string  — local UUID
   *   userId      : null    — Release 2: populated when linked to cloud account
   *   name        : string
   *   avatar      : string  — emoji
   *   yearGroup   : number  — 3-12
   *   journeyType : 'junior'|'senior'
   *   pinHash     : string  — SHA-256(pin + deviceId)
   *   xp          : number
   *   streak      : number
   *   streakLastDate : string|null — ISO date of last activity
   *   freezeTokens: number  — max 3
   *   badges      : string[]
   *   createdAt   : string  — ISO timestamp
   *   updatedAt   : string
   * }
   *
   * @param {object} opts
   * @param {string} opts.name
   * @param {string} opts.avatar
   * @param {number} opts.yearGroup
   * @param {string} opts.pin
   * @returns {Promise<object>} — created profile
   */
  async function createProfile({ name, avatar, yearGroup, pin }) {
    const storage  = window.TSA.storage;
    const deviceId = window.TSA.config.deviceId;

    // Enforce max profiles
    const existing = await storage.getAll('profiles_store');
    if (existing.length >= MAX_PROFILES) {
      throw new Error(`Maximum of ${MAX_PROFILES} profiles allowed on one device.`);
    }

    const pinHash = await hashPIN(pin, deviceId);
    const now     = new Date().toISOString();

    const profile = {
      profileId:       uuid(),
      userId:          null,            // ← Release 2 hook: cloud account link
      name:            name.trim(),
      avatar,
      yearGroup:       Number(yearGroup),
      journeyType:     Number(yearGroup) >= 7 ? 'senior' : 'junior',
      pinHash,
      xp:              0,
      streak:          0,
      streakLastDate:  null,
      freezeTokens:    0,
      badges:          [],
      phaseProgress:   {},              // { phase1: { lessonsComplete: [], done: false }, … }
      typingStats:     { bestWpm: 0, sessionsCompleted: 0 },
      createdAt:       now,
      updatedAt:       now,
    };

    await storage.put('profiles_store', profile);
    console.log('[Session] Profile created:', profile.profileId);
    return profile;
  }

  // ── Session start ─────────────────────────────────────────────────────────
  /**
   * Verify PIN and start a session for the given profile.
   * @param {string} profileId
   * @param {string} pin       — raw 4-digit PIN
   * @returns {Promise<object>} — profile on success
   * @throws {Error} on wrong PIN
   */
  async function startSession(profileId, pin) {
    const storage  = window.TSA.storage;
    const deviceId = window.TSA.config.deviceId;

    const profile = await storage.get('profiles_store', profileId);
    if (!profile) throw new Error('Profile not found.');

    const hash = await hashPIN(pin, deviceId);
    if (hash !== profile.pinHash) throw new Error('Incorrect PIN.');

    // Write active session
    await storage.put('session_store', {
      id:        ACTIVE_SESSION_KEY,
      profileId: profile.profileId,
      startedAt: new Date().toISOString(),
    });

    // Create auto-backup
    await _backup(profile);

    console.log('[Session] Session started for:', profile.name);
    return profile;
  }

  // ── Session end ───────────────────────────────────────────────────────────
  /**
   * End the current session — backup, then clear active session record.
   * @returns {Promise<void>}
   */
  async function endSession() {
    const storage = window.TSA.storage;
    const sess    = await getActiveSession();
    if (sess) {
      const profile = await storage.get('profiles_store', sess.profileId);
      if (profile) await _backup(profile);
    }
    await storage.remove('session_store', ACTIVE_SESSION_KEY);
    console.log('[Session] Session ended.');
  }

  // ── Get active session ────────────────────────────────────────────────────
  /**
   * Get the currently active session record, or null.
   * @returns {Promise<object|null>}
   */
  async function getActiveSession() {
    return window.TSA.storage.get('session_store', ACTIVE_SESSION_KEY);
  }

  /**
   * Get the profile for the currently active session, or null.
   * @returns {Promise<object|null>}
   */
  async function getActiveProfile() {
    const sess = await getActiveSession();
    if (!sess) return null;
    return window.TSA.storage.get('profiles_store', sess.profileId);
  }

  // ── Backup ────────────────────────────────────────────────────────────────
  /**
   * Create an auto-backup snapshot of a profile.
   * Keeps max MAX_BACKUPS per profile (FIFO).
   * @param {object} profile
   */
  async function _backup(profile) {
    const storage  = window.TSA.storage;
    const backupId = `${profile.profileId}_${Date.now()}`;

    await storage.put('backups_store', {
      backupId,
      profileId:   profile.profileId,
      snapshot:    JSON.parse(JSON.stringify(profile)), // deep clone
      createdAt:   new Date().toISOString(),
    });

    // Prune to MAX_BACKUPS
    const all = await storage.getByIndex('backups_store', 'profileId', profile.profileId);
    if (all.length > MAX_BACKUPS) {
      all.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      const toDelete = all.slice(0, all.length - MAX_BACKUPS);
      for (const b of toDelete) await storage.remove('backups_store', b.backupId);
    }
  }

  /**
   * Restore a profile from its most recent valid backup.
   * Called when the active profile data appears corrupted.
   * @param {string} profileId
   * @returns {Promise<object|null>}
   */
  async function restoreFromBackup(profileId) {
    const storage = window.TSA.storage;
    const backups = await storage.getByIndex('backups_store', 'profileId', profileId);
    if (!backups.length) return null;
    backups.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const restored = { ...backups[0].snapshot, updatedAt: new Date().toISOString() };
    await storage.put('profiles_store', restored);
    console.log('[Session] Profile restored from backup:', profileId);
    return restored;
  }

  // ── Update profile ────────────────────────────────────────────────────────
  /**
   * Merge updates into a profile and persist.
   * @param {string} profileId
   * @param {object} updates
   * @returns {Promise<object>} updated profile
   */
  async function updateProfile(profileId, updates) {
    const storage = window.TSA.storage;
    const profile = await storage.get('profiles_store', profileId);
    if (!profile) throw new Error('Profile not found.');
    const updated = { ...profile, ...updates, updatedAt: new Date().toISOString() };
    await storage.put('profiles_store', updated);
    return updated;
  }

  /**
   * Delete a profile and all its data.
   * @param {string} profileId
   */
  async function deleteProfile(profileId) {
    const storage = window.TSA.storage;
    await storage.remove('profiles_store', profileId);
    // Remove associated projects
    const projects = await storage.getByIndex('projects_store', 'profileId', profileId);
    for (const p of projects) await storage.remove('projects_store', p.projectId);
    // Remove backups
    const backups = await storage.getByIndex('backups_store', 'profileId', profileId);
    for (const b of backups) await storage.remove('backups_store', b.backupId);
    console.log('[Session] Profile deleted:', profileId);
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    hashPIN,
    createProfile,
    startSession,
    endSession,
    getActiveSession,
    getActiveProfile,
    updateProfile,
    deleteProfile,
    restoreFromBackup,

    /** Expose backup trigger for manual saves (e.g. after every 5 lessons) */
    backup: _backup,
  };
})();

if (typeof window !== 'undefined') {
  window._TSASessionModule = TSASession;
}
