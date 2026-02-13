import { getToken, onMessage, type MessagePayload } from "firebase/messaging"
import { useFcmStore, useAlarmModalStore, useAlarmStore } from "../stores"
import { getDeviceType, calcDuration } from "../utils"
import { getFirebaseMessaging } from "./firebase"

export async function requestPermissionAndGetToken(): Promise<string | null> {
    if (!("Notification" in window)) return null

    try {
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
    } catch (err) {
        console.error("❌ FCM token request failed", err)
        return null
    }
}

export async function listenForegroundMessage() {
    const messaging = await getFirebaseMessaging()
    if (!messaging) return

    onMessage(messaging, (payload: MessagePayload) => {
        const data = payload.data
        if (!data) return

        if (typeof data.title === "string" && typeof data.content === "string") {
            handleNoticeAlarm(data)
            return
        }

        if (
            typeof data.device_id === "string" &&
            /^\d+$/.test(data.device_id) &&
            typeof data.prevAt === "string" &&
            typeof data.now === "string"
        ) {
            handleDeviceAlarm(data)
            return
        }
    })
}

function handleDeviceAlarm(data: any) {
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
}

function handleNoticeAlarm(data: any) {
    if (Notification.permission !== "granted") return

    new Notification(data.title, {
        body: data.content,
    })
}
