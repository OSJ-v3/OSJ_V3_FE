import { firebaseMessaging } from "./firebase"
import { getToken, onMessage } from "firebase/messaging"

export async function requestPermissionAndGetToken(): Promise<string | null> {
    try {
        const permission = await Notification.requestPermission()
        if (permission !== "granted") return null

        const token = await getToken(firebaseMessaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        })

        return token
    } catch (err) {
        console.error("FCM getToken error:", err)
        return null
    }
}

export function listenForegroundMessage(
    onMessageHandler?: (payload: any) => void,
) {
    return onMessage(firebaseMessaging, (payload) => {
        console.log("[FCM] message received:", payload)
        if (onMessageHandler) onMessageHandler(payload)
    })
}
