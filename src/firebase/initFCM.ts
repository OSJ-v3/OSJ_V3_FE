import { onMessage } from "firebase/messaging"
import { getFirebaseMessaging } from "./firebase"
import { useAlarmStore } from "../stores/useAlarmStore"
import { useAlarmModalStore } from "../stores/useAlarmModalStore"
import { calcDuration } from "../utils/calcDuration"
import { getDeviceType } from "../utils/deviceType"

export async function initFCM() {
    const messaging = await getFirebaseMessaging()
    if (!messaging) return

    const removeAlarm = useAlarmStore.getState().removeAlarm
    const openAlarmModal = useAlarmModalStore.getState().open

    onMessage(messaging, (payload) => {
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
