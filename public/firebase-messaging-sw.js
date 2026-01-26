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

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim())
})

messaging.onBackgroundMessage(async (payload) => {
    console.log("📦 BACKGROUND FCM", payload)

    const data = payload.data || {}
    const id = Number(data.device_id)
    if (Number.isNaN(id)) return

    const clients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
    })

    for (const client of clients) {
        client.postMessage({
            type: "DEVICE",
            id,
            data,
        })
    }

    self.registration.showNotification(`${id}번 장비`, {
        body: "작동이 완료되었습니다.",
        icon: "/icon-512.png",
        tag: `device-${id}`,
        data,
    })
})
