importScripts("workbox-v5.1.3/workbox-sw.js");

workbox.setConfig({ modulePathPrefix: "workbox-v5.1.3/" });

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
