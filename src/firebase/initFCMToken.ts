import { getToken } from "firebase/messaging"
import { getFirebaseMessaging } from "./firebase"
import { useFcmStore } from "../stores"

export async function initFCMTokenIfNeeded() {
    if (!("Notification" in window)) return null

    const permission = await Notification.requestPermission()
    if (permission !== "granted") return null

    const messaging = await getFirebaseMessaging()
    if (!messaging) return null

    const registration = await navigator.serviceWorker.ready

    const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
    })

    if (!token) return null

    const { token: savedToken, setToken } = useFcmStore.getState()

    if (savedToken !== token) {
        setToken(token)
    }

    return token
}
