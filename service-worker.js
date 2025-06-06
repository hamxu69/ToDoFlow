self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("todo-app-cache").then((cache) => {
      return cache.addAll([
        "./landing.html",
        "./style.css",
        "./herstyle.css",
        "./script.js",
        "./manifest.json",
        "./icons/icon-app.png",
        "./icons/icon-start.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
