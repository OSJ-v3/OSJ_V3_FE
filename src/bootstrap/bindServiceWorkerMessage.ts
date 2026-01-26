import { useAlarmStore, useAlarmModalStore } from "../stores"
import { calcDuration } from "../utils/calcDuration"
import { getDeviceType } from "../utils/deviceType"

interface DevicePayload {
    device_id: string
    prevAt: string
    now: string
}

export function bindServiceWorkerMessage() {
    if (!("serviceWorker" in navigator)) return

    navigator.serviceWorker.addEventListener("message", (e) => {
        const { type, payload } = e.data || {}
        if (type !== "DEVICE") return

        const data = payload as DevicePayload
        const id = Number(data.device_id)
        if (Number.isNaN(id)) return

        useAlarmStore.getState().removeAlarm(id)

        useAlarmModalStore.getState().open({
            id,
            type: getDeviceType(id),
            duration: calcDuration(data.prevAt, data.now),
        })
    })
}
