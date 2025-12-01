const CACHE_NAME = 'iot-cart-v1';
const urlsToCache = [
  './',
  './index.html',
  './control/index.html',
  './monitor/index.html',
  './assets/css/styles.css',
  './assets/js/api.js',
  './assets/js/config.js',
  './assets/js/ws.js',
  './manifest.json',
  './assets/img/android-chrome-192x192.png',
  './assets/img/android-chrome-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});