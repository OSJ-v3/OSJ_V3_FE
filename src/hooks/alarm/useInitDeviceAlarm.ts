import { useEffect } from "react"
import { useAlarmModalStore, useAlarmStore } from "../../stores"
import { getDeviceType, calcDuration } from "../../utils"

export function useInitDeviceAlarm() {
    useEffect(() => {
        if (!navigator.serviceWorker) return

        const handler = (e: MessageEvent) => {
            if (e.data?.type !== "DEVICE") return

            const payload = e.data.payload
            if (!payload?.device_id || !payload.prevAt || !payload.now) return

            const id = Number(payload.device_id)
            if (Number.isNaN(id)) return

            const removeAlarm = useAlarmStore.getState().removeAlarm
            const openAlarmModal = useAlarmModalStore.getState().open

            removeAlarm(id)

            openAlarmModal({
                id,
                type: getDeviceType(id),
                duration: calcDuration(payload.prevAt, payload.now),
            })
        }

        navigator.serviceWorker.addEventListener("message", handler)
        return () => navigator.serviceWorker.removeEventListener("message", handler)
    }, [])
}
