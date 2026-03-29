const CACHE_NAME = 'fittrack-v1';
const urlsToCache = [
  '/fitness-app/',
  '/fitness-app/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Zeit für dein Training!',
    icon: '/fitness-app/icon-192.png',
    badge: '/fitness-app/icon-192.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'FitTrack', options)
  );
});
