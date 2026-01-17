importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAiMkLkgVZ41qPTr-RRYSQoowEPyGWgeY4",
  authDomain: "osj-v3.firebaseapp.com",
  projectId: "osj-v3",
  storageBucket: "osj-v3.firebasestorage.app",
  messagingSenderId: "96201396002",
  appId: "1:96201396002:web:dfbd7de6ac05d42b545f7b",
});

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

const messaging = firebase.messaging();

const parseNotificationContent = (payload) => {
  let title = "새 공지";
  let body = "공지사항이 도착했습니다";
  let tag = String(Date.now());

  if (payload.notification) {
    title = payload.notification.title || title;
    body = payload.notification.body || body;
  } else if (payload.data) {
    if (payload.data.title && payload.data.content) {
      title = payload.data.title;
      body = payload.data.content;
      tag = `notice-${payload.data.createAt || Date.now()}`;
    } else if (payload.data.device_id) {
      title = `${payload.data.device_id}번 기기 알림`;
      body = `상태가 ${payload.data.state}로 변경되었습니다.`;
      tag = `device-${payload.data.device_id}`;
    }
  }

  return { title, body, tag };
};

messaging.onBackgroundMessage((payload) => {
  const { title, body, tag } = parseNotificationContent(payload);

  const options = {
    body,
    icon: "/icon.png",
    badge: "/badge.png",
    tag,
    data: payload.data || {},
    requireInteraction: true,
  };

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "FCM_RECEIVED",
        title,
        body,
      });
    });
  });

  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data;
  const urlToOpen = data?.device_id ? "/" : data?.createAt ? "/notice" : "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
