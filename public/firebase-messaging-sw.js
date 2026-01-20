importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC8MZ4EFI4hynwoPtIFkaKjUzHUiWrj7dQ",
  authDomain: "osj-v3-b59bc.firebaseapp.com",
  projectId: "osj-v3-b59bc",
  storageBucket: "osj-v3-b59bc.firebasestorage.app",
  messagingSenderId: "426446214466",
  appId: "1:426446214466:web:ce81003dd57bc53933e4db",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification?.title ?? "알림", {
    body: payload.notification?.body ?? "",
  });
});
