import { useAlarmStore, useAlarmModalStore } from "../stores"
import { calcDuration } from "../utils/calcDuration"
import { getDeviceType } from "../utils/deviceType"

export function bindServiceWorkerMessage() {
    if (!("serviceWorker" in navigator)) return

    navigator.serviceWorker.addEventListener("message", (e) => {
        if (!document.hidden) return

        if (!e.data) return
        const { type, payload } = e.data
        if (type !== "DEVICE" || !payload) return

        const id = Number(payload.device_id)
        if (Number.isNaN(id)) return

        useAlarmStore.getState().removeAlarm(id)

        useAlarmModalStore.getState().open({
            id,
            type: getDeviceType(id),
            duration: calcDuration(payload.prevAt, payload.now),
        })
    })
}
