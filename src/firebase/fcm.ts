import { getToken, onMessage, type MessagePayload } from "firebase/messaging"
import { getFirebaseMessaging } from "./firebase"
import { useAlarmStore } from "../stores"
import { useAlarmModalStore } from "../stores/useAlarmModalStore"
import { useFcmStore } from "../stores/useFcmStore"
import { calcDuration } from "../utils/calcDuration"
import { getDeviceType } from "../utils/deviceType"

export async function requestPermissionAndSyncToken(
    syncTokenToServer: (token: string) => Promise<void>,
): Promise<string | null> {
    if (!("Notification" in window)) return null

    try {
        const permission = await Notification.requestPermission()
        if (permission !== "granted") return null

        const messaging = await getFirebaseMessaging()
        if (!messaging) return null

        const registration = await navigator.serviceWorker.ready

        const newToken = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
        })

        if (!newToken) return null

        const { token: savedToken, setToken } = useFcmStore.getState()

        if (savedToken !== newToken) {
            await syncTokenToServer(newToken)
            setToken(newToken)
        }

        return newToken
    } catch (err) {
        console.error("FCM token sync failed", err)
        return null
    }
}

export async function listenForegroundMessage() {
    const messaging = await getFirebaseMessaging()
    if (!messaging) return

    console.log("🔥 FOREGROUND FCM LISTENER ATTACHED")

    onMessage(messaging, (payload: MessagePayload) => {
        console.log("🔥 FOREGROUND FCM", payload)

        const data = payload.data
        if (!data?.device_id || !data.prevAt || !data.now) return

        const id = Number(data.device_id)
        if (Number.isNaN(id)) return

        const openAlarmModal = useAlarmModalStore.getState().open
        const removeAlarm = useAlarmStore.getState().removeAlarm

        removeAlarm(id)

        openAlarmModal({
            id,
            type: getDeviceType(id),
            duration: calcDuration(data.prevAt, data.now),
        })

        if (Notification.permission === "granted") {
            new Notification(
                `${id}번 ${getDeviceType(id) === "WASH" ? "세탁기" : "건조기"}`,
                {
                    body: "작동이 완료되었습니다.",
                    tag: `device-${id}`,
                },
            )
        }
    })
}
