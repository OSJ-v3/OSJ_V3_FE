import { useAlarmStore } from "../stores"
import { useAlarmModalStore } from "../stores/useAlarmModalStore"
import { useFcmStore } from "../stores/useFcmStore"
import { calcDuration } from "../utils/calcDuration"
import { getDeviceType } from "../utils/deviceType"
import { firebaseMessaging } from "./firebase"
import { getToken, onMessage, type MessagePayload } from "firebase/messaging"

export async function requestPermissionAndSyncToken(
    syncTokenToServer: (token: string) => Promise<void>,
): Promise<string | null> {
    if (!("Notification" in window)) return null

    try {
        const permission = await Notification.requestPermission()
        if (permission !== "granted") return null

        const registration = await navigator.serviceWorker.ready

        const newToken = await getToken(firebaseMessaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration,
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

export function listenForegroundMessage() {
    const openAlarmModal = useAlarmModalStore.getState().open
    const removeAlarm = useAlarmStore.getState().removeAlarm

    return onMessage(firebaseMessaging, (payload: MessagePayload) => {
        console.log("[FCM foreground]", payload) // 반드시 찍히게

        const data = payload.data as Record<string, string> | undefined
        if (!data?.device_id || !data.prevAt || !data.now) return

        const id = Number(data.device_id)
        if (Number.isNaN(id)) return

        removeAlarm(id)

        openAlarmModal({
            id,
            type: getDeviceType(id),
            duration: calcDuration(data.prevAt, data.now),
        })

        // 포그라운드에서 브라우저 알림도 원하면
        if (Notification.permission === "granted") {
            new Notification(
                `${id}번 ${getDeviceType(id) === "WASH" ? "세탁기" : "건조기"} 종료 알림`,
                {
                    body: `작동이 완료되었습니다.`,
                    tag: `device-${id}`,
                },
            )
        }
    })
}
