importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js")

firebase.initializeApp({
    apiKey: "AIzaSyAiMkLkgVZ41qPTr-RRYSQoowEPyGWgeY4",
    authDomain: "osj-v3.firebaseapp.com",
    projectId: "osj-v3",
    storageBucket: "osj-v3.firebasestorage.app",
    messagingSenderId: "96201396002",
    appId: "1:96201396002:web:dfbd7de6ac05d42b545f7b",
})

const messaging = firebase.messaging()

const WASHER_IDS = new Set([
    1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36, 37, 42, 44, 45, 47, 48, 49, 52, 53, 54, 55, 56,
    57, 58, 59, 60, 61,
])

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener("notificationclick", (event) => {
    event.notification.close()

    const type = event.notification.data?.type

    if (type === "NOTICE") {
        event.waitUntil(clients.openWindow("/notices"))
        return
    }

    event.waitUntil(clients.openWindow("/"))
})

messaging.onBackgroundMessage(async (payload) => {
    const data = payload.data || {}

    if (typeof data.title === "string" && typeof data.content === "string") {
        await self.registration.showNotification(data.title, {
            body: data.content,
            icon: "/icon-512.png",
        })
        return
    }

    if (
        typeof data.device_id === "string" &&
        /^\d+$/.test(data.device_id) &&
        typeof data.prevAt === "string" &&
        typeof data.now === "string"
    ) {
        const id = Number(data.device_id)

        await self.registration.showNotification(`${id}번 기기`, {
            body: "작동이 완료되었습니다.",
            icon: "/icon-512.png",
        })
    }
})

self.__WB_MANIFEST
