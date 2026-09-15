/**
 * 通樑古榕 PWA Service Worker
 *
 * - 採用 cache-first 策略快取靜態資源（HTML、CSS、JS、圖片）
 * - 對外部資源（Google Maps、GA）採 network-only，不寫入快取
 * - 提供離線時的核心頁面後援，協助使用者再次操作時仍可載入站內內容
 */
const VERSION = "v1";
const CORE_CACHE = `tongliang-gurong-core-${VERSION}`;
const RUNTIME_CACHE = `tongliang-gurong-runtime-${VERSION}`;

const CORE_ASSETS = [
  "/",
  "/visitor-guide/",
  "/transportation/",
  "/history/",
  "/aerial-roots/",
  "/baoan-temple/",
  "/photo-guide/",
  "/north-loop-itinerary/",
  "/half-day-itinerary/",
  "/nearby-attractions/",
  "/food/",
  "/faq/",
  "/about/",
  "/sources/",
  "/contact/",
  "/privacy/",
  "/manifest.webmanifest",
  "/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CORE_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // 不快取外部資源（GA、Google Maps iframe 等）
  if (url.origin !== self.location.origin) return;

  // 跳過 sitemap 與 robots（避免干擾 SEO 抓取）
  if (url.pathname.startsWith("/sitemap") || url.pathname === "/robots.txt") {
    return;
  }

  // HTML：以 network-first 取得最新內容，失敗時回退到快取
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match("/"))
        )
    );
    return;
  }

  // 其他靜態資源：cache-first
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req).then((res) => {
          if (
            res &&
            res.status === 200 &&
            res.type !== "opaque" &&
            (url.pathname.startsWith("/_astro/") ||
              url.pathname.startsWith("/images/") ||
              url.pathname.startsWith("/icons/") ||
              /\.(css|js|woff2?|svg|png|jpg|jpeg|webp|avif)$/i.test(
                url.pathname
              ))
          ) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
    )
  );
});