import { getToken } from "firebase/messaging"
import { getFirebaseMessaging } from "./firebase"
import { useFcmStore } from "../stores/useFcmStore"

export async function initFCMTokenIfNeeded() {
    const { token, setToken } = useFcmStore.getState()
    if (token) return token

    if (!("Notification" in window)) return null

    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
        console.log("🔕 알림 권한 거부")
        return null
    }

    const messaging = await getFirebaseMessaging()
    if (!messaging) return null

    const registration = await navigator.serviceWorker.ready

    const newToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
    })

    if (!newToken) {
        console.log("FCM 토큰 발급 실패")
        return null
    }

    console.log("FCM 토큰 발급")
    setToken(newToken)
    return newToken
}
