/**
 * TekkieStack 2.0 — Storage Service
 * IndexedDB wrapper with automatic localStorage fallback.
 *
 * Schema version 5 — adds userId field to profiles and projects
 * for future Railway/cloud sync in Release 2.
 *
 * Stores:
 *   session_store   — active session (one record)
 *   profiles_store  — profiles keyed by profileId
 *   projects_store  — projects keyed by projectId
 *   backups_store   — auto-backups keyed by backupId
 *
 * Author: Aperintel Ltd
 */

const TSAStorage = (() => {
  const DB_NAME    = 'tekkiestack';
  const DB_VERSION = 5;   // bumped from 4 → 5 to add userId field

  let _db = null;
  let _usingFallback = false;

  // ── Open / init ──────────────────────────────────────────────────────────
  /**
   * Open (or upgrade) the IndexedDB database.
   * @returns {Promise<IDBDatabase>}
   */
  function open() {
    return new Promise((resolve, reject) => {
      if (_db) return resolve(_db);

      const req = indexedDB.open(DB_NAME, DB_VERSION);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        const oldVersion = e.oldVersion;

        // ── session_store ─────────────────────────────────────────────────
        if (!db.objectStoreNames.contains('session_store')) {
          db.createObjectStore('session_store', { keyPath: 'id' });
        }

        // ── profiles_store ────────────────────────────────────────────────
        if (!db.objectStoreNames.contains('profiles_store')) {
          const ps = db.createObjectStore('profiles_store', { keyPath: 'profileId' });
          ps.createIndex('userId', 'userId', { unique: false }); // Release 2 sync
        } else if (oldVersion < 5) {
          // Migration: add userId index to existing store
          const tx = e.target.transaction;
          const ps = tx.objectStore('profiles_store');
          if (!ps.indexNames.contains('userId')) {
            ps.createIndex('userId', 'userId', { unique: false });
          }
        }

        // ── projects_store ────────────────────────────────────────────────
        if (!db.objectStoreNames.contains('projects_store')) {
          const pj = db.createObjectStore('projects_store', { keyPath: 'projectId' });
          pj.createIndex('profileId', 'profileId', { unique: false });
          pj.createIndex('userId',    'userId',    { unique: false }); // Release 2 sync
        } else if (oldVersion < 5) {
          const tx = e.target.transaction;
          const pj = tx.objectStore('projects_store');
          if (!pj.indexNames.contains('userId')) {
            pj.createIndex('userId', 'userId', { unique: false });
          }
        }

        // ── backups_store ─────────────────────────────────────────────────
        if (!db.objectStoreNames.contains('backups_store')) {
          const bk = db.createObjectStore('backups_store', { keyPath: 'backupId' });
          bk.createIndex('profileId', 'profileId', { unique: false });
        }
      };

      req.onsuccess = (e) => {
        _db = e.target.result;
        console.log('[Storage] IndexedDB opened, version', _db.version);
        resolve(_db);
      };

      req.onerror = (e) => {
        console.warn('[Storage] IndexedDB failed, falling back to localStorage', e.target.error);
        _usingFallback = true;
        resolve(null);
      };
    });
  }

  // ── Generic IDB helpers ──────────────────────────────────────────────────
  /**
   * Write a record to a store.
   * @param {string} storeName
   * @param {object} record
   */
  function put(storeName, record) {
    return open().then(db => {
      if (!db) return fallbackPut(storeName, record);
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(record);
        tx.oncomplete = () => resolve(record);
        tx.onerror    = (e) => reject(e.target.error);
      });
    });
  }

  /**
   * Read a record by key.
   * @param {string} storeName
   * @param {string} key
   */
  function get(storeName, key) {
    return open().then(db => {
      if (!db) return fallbackGet(storeName, key);
      return new Promise((resolve, reject) => {
        const tx  = db.transaction(storeName, 'readonly');
        const req = tx.objectStore(storeName).get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror   = (e) => reject(e.target.error);
      });
    });
  }

  /**
   * Get all records from a store.
   * @param {string} storeName
   */
  function getAll(storeName) {
    return open().then(db => {
      if (!db) return fallbackGetAll(storeName);
      return new Promise((resolve, reject) => {
        const tx  = db.transaction(storeName, 'readonly');
        const req = tx.objectStore(storeName).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror   = (e) => reject(e.target.error);
      });
    });
  }

  /**
   * Get all records matching an index value.
   * @param {string} storeName
   * @param {string} indexName
   * @param {*} value
   */
  function getByIndex(storeName, indexName, value) {
    return open().then(db => {
      if (!db) return fallbackGetByIndex(storeName, indexName, value);
      return new Promise((resolve, reject) => {
        const tx    = db.transaction(storeName, 'readonly');
        const index = tx.objectStore(storeName).index(indexName);
        const req   = index.getAll(value);
        req.onsuccess = () => resolve(req.result || []);
        req.onerror   = (e) => reject(e.target.error);
      });
    });
  }

  /**
   * Delete a record by key.
   * @param {string} storeName
   * @param {string} key
   */
  function remove(storeName, key) {
    return open().then(db => {
      if (!db) return fallbackRemove(storeName, key);
      return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).delete(key);
        tx.oncomplete = () => resolve(true);
        tx.onerror    = (e) => reject(e.target.error);
      });
    });
  }

  // ── localStorage fallback ────────────────────────────────────────────────
  function _lsKey(store, key) { return `ts_${store}_${key}`; }
  function _lsStoreKey(store)  { return `ts_${store}__keys`; }

  function fallbackPut(store, record) {
    try {
      const key = Object.values(record)[0]; // first field is key
      localStorage.setItem(_lsKey(store, key), JSON.stringify(record));
      // Maintain a key index
      const keys = JSON.parse(localStorage.getItem(_lsStoreKey(store)) || '[]');
      if (!keys.includes(key)) { keys.push(key); localStorage.setItem(_lsStoreKey(store), JSON.stringify(keys)); }
      return Promise.resolve(record);
    } catch(e) { return Promise.reject(e); }
  }

  function fallbackGet(store, key) {
    try {
      const raw = localStorage.getItem(_lsKey(store, key));
      return Promise.resolve(raw ? JSON.parse(raw) : null);
    } catch(e) { return Promise.reject(e); }
  }

  function fallbackGetAll(store) {
    try {
      const keys = JSON.parse(localStorage.getItem(_lsStoreKey(store)) || '[]');
      return Promise.resolve(
        keys.map(k => { try { return JSON.parse(localStorage.getItem(_lsKey(store, k))); } catch { return null; } }).filter(Boolean)
      );
    } catch(e) { return Promise.reject(e); }
  }

  function fallbackGetByIndex(store, index, value) {
    return fallbackGetAll(store).then(all => all.filter(r => r[index] === value));
  }

  function fallbackRemove(store, key) {
    try {
      localStorage.removeItem(_lsKey(store, key));
      const keys = JSON.parse(localStorage.getItem(_lsStoreKey(store)) || '[]');
      localStorage.setItem(_lsStoreKey(store), JSON.stringify(keys.filter(k => k !== key)));
      return Promise.resolve(true);
    } catch(e) { return Promise.reject(e); }
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    open,
    put,
    get,
    getAll,
    getByIndex,
    remove,

    /** Whether IndexedDB is unavailable and localStorage is being used */
    get usingFallback() { return _usingFallback; },

    /** DB version (for diagnostics) */
    get version() { return DB_VERSION; },

    /**
     * Nuke everything — used by the Cookie Policy "Clear All Data" button.
     * @returns {Promise<void>}
     */
    clearAll() {
      return new Promise((resolve) => {
        try {
          // Clear localStorage
          Object.keys(localStorage)
            .filter(k => k.startsWith('ts_'))
            .forEach(k => localStorage.removeItem(k));
          // Delete IndexedDB
          if (_db) { _db.close(); _db = null; }
          const req = indexedDB.deleteDatabase(DB_NAME);
          req.onsuccess = () => resolve();
          req.onerror   = () => resolve(); // resolve anyway
        } catch { resolve(); }
      });
    }
  };
})();

// Attach to namespace (populated by app.js)
if (typeof window !== 'undefined') {
  window._TSAStorageModule = TSAStorage;
}

// ── Storage migration utility (Stage 12) ─────────────────────────────────
/**
 * Run a health check on all profiles and attempt to repair minor corruption.
 * Called once at startup if DB_VERSION was just upgraded.
 * @returns {Promise<{ checked: number, repaired: number, errors: string[] }>}
 */
async function runMigration() {
  const result = { checked: 0, repaired: 0, errors: [] };
  try {
    const profiles = await TSAStorage.getAll('profiles_store');
    for (const profile of profiles) {
      result.checked++;
      let dirty = false;

      // Ensure userId field exists (v4 → v5 migration)
      if (!('userId' in profile)) {
        profile.userId = null;
        dirty = true;
      }

      // Ensure badges is array
      if (!Array.isArray(profile.badges)) {
        profile.badges = [];
        dirty = true;
      }

      // Ensure numeric fields are numbers
      if (typeof profile.xp !== 'number')     { profile.xp = 0;     dirty = true; }
      if (typeof profile.streak !== 'number') { profile.streak = 0; dirty = true; }

      // Ensure phaseProgress is object
      if (!profile.phaseProgress || typeof profile.phaseProgress !== 'object') {
        profile.phaseProgress = {};
        dirty = true;
      }

      // Ensure typingStats exists
      if (!profile.typingStats) {
        profile.typingStats = { bestWpm: 0, sessionsCompleted: 0 };
        dirty = true;
      }

      if (dirty) {
        profile.updatedAt = new Date().toISOString();
        await TSAStorage.put('profiles_store', profile);
        result.repaired++;
      }
    }
  } catch(e) {
    result.errors.push(e.message);
  }
  return result;
}

// Attach migration to the module
TSAStorage.runMigration = runMigration;
