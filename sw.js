/**
 * TekkieStack 2.0 — Service Worker (v3)
 *
 * NETWORK-FIRST strategy for HTML / JS / CSS:
 *   - Try network first (with a 4 s timeout)
 *   - On success, cache the response for offline use
 *   - On failure (offline or slow), fall back to cache
 *
 * This guarantees that returning users on a working connection always
 * see the LATEST code on next reload, no manual cache wipe required.
 * Static assets (images, fonts) stay cache-first for speed.
 *
 * IndexedDB profile data is completely separate from this cache and is
 * NEVER touched by service-worker activity.
 *
 * Author: Aperintel Ltd
 */

const CACHE_VERSION = 'ts-20260502-200320';  // bump this string on every production deploy
const NETWORK_TIMEOUT_MS = 4000;
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/main.css',
  './assets/js/icons.js',
  './assets/js/security.js',
  './assets/js/storage.js',
  './assets/js/session.js',
  './assets/js/xp.js',
  './assets/js/app.js',
  './assets/img/logo.png',
  './modules/code-editor.js',
  './modules/typing-trainer.js',
  './modules/ai-lab.js',
  './modules/support-chat.js',
  './modules/junior-phases.js',
  './modules/senior-phases.js',
  './modules/engagement.js',
  './modules/quiz-gate.js',
  './modules/games.js',
  './modules/game-builder.js',
  './modules/activities.js',
  // Google Fonts, cached on first fetch
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap'
];

// ── Install: pre-cache shell ───────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return Promise.allSettled(
        SHELL_ASSETS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] Could not cache:', url, err.message))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for code, cache-first for static assets ──────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isGoogleFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!isSameOrigin && !isGoogleFont) return;

  // Code-bearing files: HTML, JS, CSS use network-first so users always get
  // the latest deployed code when online. Falls back to cache when offline.
  const isCodeFile =
    event.request.mode === 'navigate' ||
    /\.(?:html|js|mjs|css)(?:\?.*)?$/i.test(url.pathname);

  if (isCodeFile) {
    event.respondWith(_networkFirst(event.request));
    return;
  }

  // Everything else (images, fonts, manifest): cache-first for speed.
  event.respondWith(_cacheFirst(event.request));
});

// Network-first: try network with timeout, refresh cache on success,
// fall back to cache on failure or timeout. Always returns a Response.
function _networkFirst(request) {
  return new Promise((resolve) => {
    let resolved = false;
    const respondFromCache = (label) => {
      if (resolved) return;
      caches.match(request).then(cached => {
        if (resolved) return;
        if (cached) {
          resolved = true;
          resolve(cached);
        } else if (request.mode === 'navigate') {
          // Last-resort fallback for navigations
          caches.match('./index.html').then(idx => {
            if (resolved) return;
            resolved = true;
            resolve(idx || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } }));
          });
        } else {
          resolved = true;
          resolve(new Response('', { status: 503 }));
        }
      });
    };

    // Timeout: if network is slow, serve cached response
    const timer = setTimeout(() => respondFromCache('timeout'), NETWORK_TIMEOUT_MS);

    fetch(request).then(response => {
      clearTimeout(timer);
      if (resolved) return;
      if (response && response.status === 200) {
        // Update cache for offline use
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, clone)).catch(() => {});
        resolved = true;
        resolve(response);
      } else {
        respondFromCache('non-200');
      }
    }).catch(() => {
      clearTimeout(timer);
      respondFromCache('error');
    });
  });
}

// Cache-first: return cached response immediately, fetch + cache in background.
function _cacheFirst(request) {
  return caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, clone)).catch(() => {});
      }
      return response;
    }).catch(() => new Response('', { status: 503 }));
  });
}

// ── Message: force update ─────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
