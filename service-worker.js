const CACHE_NAME = 'pubgolf-cache-v3'; // BELANGRIJK: Versie verhoogd!
const urlsToCache = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js',
  'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js',
  './icon-192.png',
  './icon-512.png'
];

// Installeer de service worker en cache de bestanden
self.addEventListener('install', event => {
  self.skipWaiting(); // Forceer activatie van de nieuwe service worker
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Probeer netwerk eerst, val terug op cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Ruim oude caches op bij activatie
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});
