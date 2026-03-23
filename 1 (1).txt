/**
 * TekkieStack 2.0 — Service Worker (v2)
 * Cache-first offline strategy. Cache version bumped on every deploy.
 * Author: Aperintel Ltd
 */

const CACHE_VERSION = 'ts-v2';  // bump this string on every production deploy
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/main.css',
  '/assets/js/security.js',
  '/assets/js/storage.js',
  '/assets/js/session.js',
  '/assets/js/xp.js',
  '/assets/js/app.js',
  '/assets/img/logo.png',
  '/modules/code-editor.js',
  '/modules/typing-trainer.js',
  '/modules/ai-lab.js',
  '/modules/support-chat.js',
  '/modules/junior-phases.js',
  '/modules/senior-phases.js',
  '/modules/engagement.js',
  // Google Fonts — cached on first fetch
  'https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap'
];

// ── Install: pre-cache shell ───────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Installing v2…');
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
  console.log('[SW] Activating v2…');
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

// ── Fetch: cache-first, fall back to network ──────────────────────────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isGoogleFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!isSameOrigin && !isGoogleFont) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// ── Message: force update ─────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
