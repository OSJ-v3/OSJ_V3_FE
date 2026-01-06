import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "../firebase/settingFCM";
import { useFCMStore } from "../stores/fcmStore";

let messagingInstance: ReturnType<typeof getMessaging> | null = null;
let isInitializing = false;

export const initFCM = async () => {
  if (isInitializing || messagingInstance) {
    alert("FCM 이미 초기화됨");
    return;
  }

  if (!("serviceWorker" in navigator)) {
    alert("브라우저가 서비스 워커 지원X");
    return;
  }

  isInitializing = true;

  try {
    alert("제발 1: 알림 권한 요청 중");

    const permission = await Notification.requestPermission();
    alert(`제발 1 완료: 알림 권한 = ${permission}`);

    if (permission !== "granted") {
      alert("알림 권한이 거부;;;;");
      isInitializing = false;
      return;
    }

    alert("제발 2: 서비스 워커 등록 중");
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      { scope: "/" }
    );
    alert(`제발 2 완료: SW 등록 완 (scope: ${registration.scope})`);

    alert("제발 3: 서비스워커 활성화 대기 중");
    await navigator.serviceWorker.ready;
    alert("제발 3 완료: 서비스워커 활성화됨");

    alert("제발 4: Firebase Messaging 인스턴스 생성 중");
    const messaging = getMessaging(app);
    messagingInstance = messaging;
    alert("제발 4 완료: Messaging 인스턴스 생성됨");

    alert("제발 5: FCM 토큰 요청 중");
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      alert("SHIT 토큰 발급 실패");
      isInitializing = false;
      return;
    }

    alert(`제발 5 완료: 토큰 발급 성공!\n\n${token.substring(0, 60)}...`);

    alert("제발 6: 토큰 저장 중");
    useFCMStore.getState().setToken(token);
    alert("제발 6 완료: 토큰이 Store에 저장됨");

    alert("제발 7: 메시지 리스너 등록 중");
    onMessage(messaging, (payload) => {
      alert(
        `포그라운드 메시지 받음!\n\n제목: ${payload.notification?.title}\n내용: ${payload.notification?.body}`
      );

      const title = payload.notification?.title || "알림";
      const body = payload.notification?.body || "";
      const icon = payload.notification?.icon || "/icon.png";

      if (Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon,
          badge: "/badge.png",
          tag: payload.data?.id || String(Date.now()),
        });
      }
    });
    alert("제발 7 완료: 메시지 리스너 등록됨");

    alert("FCM 초기화 ㄹㅇ 완료!");
  } catch (error: any) {
    alert(
      `SHIT FCM 초기화 실패!\n\n에러: ${
        error.message
      }\n\nStack: ${error.stack?.substring(0, 200)}`
    );
  } finally {
    isInitializing = false;
  }
};
