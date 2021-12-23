const CACHE_NAME = "static-cache-v1.0.0";
const FILES_TO_CACHE = ["/offline.html", "/favicon.ico", "/logo/logo-152.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (CACHE_NAME !== key) return caches.delete(key);
        }),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  "navigate" === event.request.mode &&
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.open(CACHE_NAME).then((cache) => cache.match("/offline.html")),
      ),
    );
});
