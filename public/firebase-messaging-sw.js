importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js",
)
importScripts(
    "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js",
)

firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
})

const messaging = firebase.messaging()

const WASHER_IDS = new Set([
    1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36, 37, 42,
    44, 45, 47, 48, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
])

function getDeviceType(id) {
    return WASHER_IDS.has(id) ? "WASH" : "DRY"
}

messaging.onBackgroundMessage((payload) => {
    const data = payload.data || {}
    let title = "알림"
    let body = ""

    if (data.device_id) {
        const deviceId = Number(data.device_id)
        const deviceName = getDeviceType(deviceId)
        title = "작동 완료 알림"
        body = `${deviceId}번 ${deviceName}가 완료되었습니다`
    }

    self.registration.showNotification(title, {
        body,
        icon: "/icon-512.png",
        data,
    })
})
