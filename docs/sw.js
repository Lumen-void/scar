const CACHE_NAME = "scar-travel-book-v1";
const CORE_URLS = [
  "/",
  "/states",
  "/states/himachal-pradesh",
  "/states/himachal-pradesh/kullu-lahaul",
  "/states/himachal-pradesh/kullu-lahaul/mindful-retreat",
  "/travel-book",
  "/travel-book/himachal-pradesh",
  "/travel-book/himachal-pradesh/kullu-lahaul",
  "/travel-book/himachal-pradesh/kullu-lahaul/local-transport",
  "/travel-book/himachal-pradesh/kullu-lahaul/camping",
  "/travel-book/himachal-pradesh/kullu-lahaul/guides",
  "/travel-book/himachal-pradesh/kullu-lahaul/safety",
  "/offline",
  "/customer"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_URLS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/offline")))
  );
});
