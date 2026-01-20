importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js",
)
importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js",
)

firebase.initializeApp({
    apiKey: "AIzaSyAiMkLkgVZ41qPTr-RRYSQoowEPyGWgeY4",
    authDomain: "osj-v3.firebaseapp.com",
    projectId: "osj-v3",
    storageBucket: "osj-v3.firebasestorage.app",
    messagingSenderId: "96201396002",
    appId: "1:96201396002:web:dfbd7de6ac05d42b545f7b",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    const data = payload.data || {}

    let title = "알림"
    let body = ""

    if (data.title && data.content) {
        title = data.title
        body = data.content
    }

    if (data.device_id) {
        const id = Number(data.device_id)

        const washerIds = new Set([
            1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36,
            37, 42, 44, 45, 47, 48, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
        ])
        const dryerIds = new Set([
            2, 4, 6, 12, 13, 14, 15, 16, 17, 24, 25, 26, 27, 28, 29, 31, 34, 38,
            39, 40, 41, 43, 46, 50, 51, 62, 63, 64, 65, 66, 67,
        ])

        let device = "기기"
        if (washerIds.has(id)) device = "세탁기"
        if (dryerIds.has(id)) device = "건조기"

        title = "작동 완료 알림"
        body = `${id}번 ${device}가 완료되었습니다`
    }

    self.registration.showNotification(title, {
        body,
        icon: "/icon-512.png",
    })
})

self.addEventListener("notificationclick", (event) => {
    event.notification.close()

    const data = event.notification.data || {}
    let url = "/"

    if (data.type === "NOTICE") {
        url = "/notice"
    }

    if (data.type === "DEVICE_DONE" && data.deviceId) {
        url = `/device/${data.deviceId}`
    }

    event.waitUntil(
        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin)) {
                        client.focus()
                        client.navigate(url)
                        return
                    }
                }
                return clients.openWindow(url)
            }),
    )
})
