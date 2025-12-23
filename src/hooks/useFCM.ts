import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/settingFCM";

export const initFCM = async () => {
  console.log("initFCM 실행됨");
  console.log("알림 권한 상태:", Notification.permission);

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("알림 권한 거부:", permission);
    return;
  }

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  });

  console.log("FCM TOKEN:", token);

  onMessage(messaging, (payload) => {
    console.log("포그라운드 알림:", payload);
  });
};
