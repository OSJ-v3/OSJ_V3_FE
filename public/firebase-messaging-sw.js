/// <reference lib="webworker" />

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {
    getMessaging,
    onBackgroundMessage,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-sw.js"

const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

onBackgroundMessage(messaging, (payload) => {
    console.log("[SW] Background message:", payload)

    const title = payload.notification?.title || "알림"
    const options = {
        body: payload.notification?.body,
        icon: "/icons/icon-512.png",
    }

    self.registration.showNotification(title, options)
})
