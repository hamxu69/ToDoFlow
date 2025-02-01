self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("todo-app-cache").then((cache) => {
      return cache.addAll([
        "./landing.html",
        "./index.html",
        "./footer.css",
        "./header.css",
        "./Responsive.css",
        "./script.js",
        "./manifest.json",
        "./icons/icon-start.png",
        "./icons/icon-app.png",
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
