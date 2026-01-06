// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

console.log("서비스 워커 로드됨!");

firebase.initializeApp({
  apiKey: "AIzaSyC8MZ4EFI4hynwoPtIFkaKjUzHUiWrj7dQ",
  authDomain: "osj-v3-b59bc.firebaseapp.com",
  projectId: "osj-v3-b59bc",
  storageBucket: "osj-v3-b59bc.firebasestorage.app",
  messagingSenderId: "426446214466",
  appId: "1:426446214466:web:ce81003dd57bc53933e4db",
});

console.log("Firebase 초기화 완!");

const messaging = firebase.messaging();

console.log("Messaging 인스턴스 생성 완!");

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신!!!", payload);

  const notificationTitle = payload.notification?.title || "알림";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: payload.notification?.icon || "/icon.png",
    badge: "/badge.png",
    tag: payload.data?.id || Date.now().toString(),
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("push", function (event) {
  console.log("Push 이벤트 수신!", event);
});

console.log("서비스 워커 설정 완!");
