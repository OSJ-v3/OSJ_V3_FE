import { getToken } from "firebase/messaging"
import { firebaseMessaging } from "./firebase"
import { useFcmStore } from "../stores/useFcmStore"

export async function initFCMTokenIfNeeded() {
    const { token, setToken } = useFcmStore.getState()

    if (token) return token

    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
        console.log("알림 권한 거부됨")
        return null
    }

    const registration = await navigator.serviceWorker.ready

    const newToken = await getToken(firebaseMessaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
    })

    if (newToken) {
        setToken(newToken)
        return newToken
    }

    console.log("❌ FCM 토큰 발급 실패")
    return null
}
