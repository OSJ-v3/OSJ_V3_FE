import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/settingFCM";
import { useFCMStore } from "../stores/fcmStore";

export const initFCM = async () => {
  console.log("initFCM 실행됨");
  console.log("알림 권한 상태:", Notification.permission);
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  });

  useFCMStore.getState().setToken(token);

  onMessage(messaging, (payload) => {
    console.log("포그라운드 알림:", payload);
  });
};
