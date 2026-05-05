const CACHE_NAME = "app-huevos-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js"
];

// INSTALAR
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// FETCH (AQUÍ ESTÁ LO IMPORTANTE)
self.addEventListener("fetch", e => {

  // ❌ NO cachear SheetDB (precios dinámicos)
  if (e.request.url.includes("sheetdb.io")) {
    e.respondWith(fetch(e.request));
    return;
  }

  // ✔ Cache normal para tu web
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});