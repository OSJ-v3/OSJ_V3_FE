import { useFcmStore } from "../stores/useFcmStore"
import { firebaseMessaging } from "./firebase"
import { getToken, onMessage } from "firebase/messaging"

const WASHER_IDS = new Set([
    1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36, 37, 42,
    44, 45, 47, 48, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
])

const DRYER_IDS = new Set([
    2, 4, 6, 12, 13, 14, 15, 16, 17, 24, 25, 26, 27, 28, 29, 31, 34, 38, 39, 40,
    41, 43, 46, 50, 51, 62, 63, 64, 65, 66, 67,
])

export async function requestPermissionAndSyncToken(
    syncTokenToServer: (token: string) => Promise<void>,
): Promise<string | null> {
    if (!("Notification" in window)) return null

    try {
        const permission = await Notification.requestPermission()
        if (permission !== "granted") return null

        const newToken = await getToken(firebaseMessaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        })

        if (!newToken) return null

        const { token: savedToken, setToken } = useFcmStore.getState()

        if (savedToken !== newToken) {
            console.log("[FCM] token changed → sync")

            await syncTokenToServer(newToken)
            setToken(newToken)
        } else {
            console.log("[FCM] token unchanged")
        }

        return newToken
    } catch (err) {
        console.error("[FCM] getToken error:", err)
        return null
    }
}

export function listenForegroundMessage(
    onMessageHandler?: (payload: any) => void,
) {
    return onMessage(firebaseMessaging, (payload) => {
        console.log("[FCM foreground]", payload)

        const data = payload.data
        if (!data) return

        let title = "알림"
        let body = ""

        if (data.title && data.content) {
            title = data.title
            body = data.content
        }

        if (data.device_id) {
            const deviceId = Number(data.device_id)

            let deviceName = "기기"
            if (WASHER_IDS.has(deviceId)) deviceName = "세탁기"
            if (DRYER_IDS.has(deviceId)) deviceName = "건조기"

            title = "작동 완료 알림"
            body = `${deviceId}번 ${deviceName}가 완료되었습니다`
        }

        if (Notification.permission === "granted") {
            new Notification(title, { body })
        }

        onMessageHandler?.(payload)
    })
}
