/* eslint-disable no-console */
/* eslint-disable no-undef */
importScripts("workbox-v5.1.3/workbox-sw.js");

workbox.setConfig({ modulePathPrefix: "workbox-v5.1.3/" });

// workbox.core.skipWaiting();
workbox.core.clientsClaim();

const { registerRoute } = workbox.routing;
const {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkFirst,
  NetworkOnly,
} = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const bgSyncPlugin = new BackgroundSyncPlugin("addNewQueue", {
  maxRetentionTime: 24 * 60,
  onSync: async ({ queue }) => {
    console.log("...Synchronizing " + queue.name);
    let entry;
    while ((entry = await queue.shiftRequest())) {
      try {
        console.log("...Replaying: " + entry.request.url);
        await fetch(entry.request).then((response) => {
          if (!response.ok) {
            console.log(
              "...Response status fail, readd to queue",
              entry.request.url
            );
            queue.unshiftRequest(entry);
            return;
          }
        });
        console.log("...Replayed: " + entry.request.url);
      } catch (error) {
        console.error("Replay failed for request", entry.request, error);
        await queue.unshiftRequest(entry);
        return;
      }
    }
    console.log("Replay complete!");
  },
});

registerRoute(
  new RegExp("https://jsonplaceholder.typicode.com/posts"),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

registerRoute(
  /.*.(?:png|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  new StaleWhileRevalidate({
    cacheName: "google-files",
  })
);

registerRoute(
  new RegExp("https://jsonplaceholder.typicode.com/posts"),
  new NetworkFirst({
    cacheName: "api-cache",
  })
);

// Cache routing:

// const dataCacheConfig = {
//   cacheName: "route-cache",
// };

// registerRoute(
//   /.*categories/,
//   new CacheFirst(dataCacheConfig)
// );
// registerRoute(
//   /.*templates/,
//   new CacheFirst(dataCacheConfig)
// );
// registerRoute(
//   /.*memes\/.\w+/,
//   new StaleWhileRevalidate(dataCacheConfig)
// );

self.addEventListener("install", (event) => {
  const channel = new BroadcastChannel("service-worker-channel");
  channel.postMessage({ promptToReload: true });

  channel.onmessage = (message) => {
    if (message.data.skipWaiting) {
      self.skipWaiting();
    }
  };
});
