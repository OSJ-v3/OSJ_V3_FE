importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js",
)
importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js",
)

firebase.initializeApp({
    apiKey: "AIzaSy...",
    authDomain: "osj-v3.firebaseapp.com",
    projectId: "osj-v3",
    storageBucket: "osj-v3.firebasestorage.app",
    messagingSenderId: "96201396002",
    appId: "1:96201396002:web:dfbd7de6ac05d42b545f7b",
})

const messaging = firebase.messaging()

const WASHER_IDS = new Set([
    1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36, 37, 42,
    44, 45, 47, 48, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
])

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener("notificationclick", (event) => {
    event.notification.close()

    event.waitUntil(clients.openWindow("/"))
})

messaging.onBackgroundMessage(async (payload) => {
    const data = payload.data || {}
    const id = Number(data.device_id)

    const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
    })

    for (const client of clients) {
        client.postMessage({
            type: "DEVICE",
            payload: data,
        })
    }

    self.registration.showNotification(
        `${id}번 ${WASHER_IDS.has(id) ? "세탁기" : "건조기"}`,
        {
            body: "작동이 완료되었습니다.",
            icon: "/icon-512.png",
            data,
        },
    )
})

self.__WB_MANIFEST
