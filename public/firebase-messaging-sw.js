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
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/favicon.ico",
    })
})
