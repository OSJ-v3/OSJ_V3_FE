import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../firebase/settingFCM";
import { useFCMStore } from "../stores/fcmStore";
import { subscribeNoticePushAlert } from "../apis/notices/fcm";

let messagingInstance: ReturnType<typeof getMessaging> | null = null;
let isInitializing = false;

const registerServiceWorker = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();

  for (const registration of registrations) {
    await registration.unregister();
  }

  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
    { scope: "/", updateViaCache: "none" }
  );

  if (registration.installing) {
    await new Promise<void>((resolve) => {
      registration.installing!.addEventListener("statechange", function () {
        if (this.state === "activated") resolve();
      });
    });
  } else if (registration.waiting) {
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    await new Promise<void>((resolve) => {
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        () => resolve(),
        {
          once: true,
        }
      );
    });
  }

  await navigator.serviceWorker.ready;
  return registration;
};

const getFCMToken = async (
  messaging: any,
  registration: ServiceWorkerRegistration
) => {
  return await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });
};

const setupForegroundListener = (messaging: any) => {
  onMessage(messaging, (payload) => {
    let title = "새 공지";
    let body = "공지사항이 도착했습니다";
    const icon = "/icon.png";

    if (payload.notification) {
      title = payload.notification.title || title;
      body = payload.notification.body || body;
    } else if (payload.data) {
      if (payload.data.title && payload.data.content) {
        title = payload.data.title;
        body = payload.data.content;
      } else if (payload.data.device_id) {
        title = `${payload.data.device_id}번 기기 알림`;
        body = `상태가 ${payload.data.state}로 변경되었습니다.`;
      }
    }

    if (Notification.permission === "granted") {
      const notification = new Notification(title, {
        body,
        icon,
        badge: "/badge.png",
        tag: String(Date.now()),
        requireInteraction: true,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  });
};

export const initFCM = async () => {
  if (isInitializing || messagingInstance) return;
  if (!("serviceWorker" in navigator)) return;

  isInitializing = true;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      isInitializing = false;
      return;
    }

    const registration = await registerServiceWorker();
    const messaging = getMessaging(app);
    messagingInstance = messaging;

    const token = await getFCMToken(messaging, registration);
    if (!token) {
      isInitializing = false;
      return;
    }

    useFCMStore.getState().setToken(token);
    localStorage.setItem("FCM_TOKEN", token);

    await subscribeNoticePushAlert(token);
    setupForegroundListener(messaging);
  } catch (error) {
    console.error("FCM 초기화 실패:", error);
  } finally {
    isInitializing = false;
  }
};
