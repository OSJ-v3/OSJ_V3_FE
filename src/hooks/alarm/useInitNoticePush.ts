import { useEffect } from "react"
import { useAlarmStore } from "../../stores"

export function useInitNoticePush() {
    const removeAlarm = useAlarmStore((s) => s.removeAlarm)

    useEffect(() => {
        const id = requestIdleCallback(() => {
            if (!navigator.serviceWorker) return

            const handler = (e: MessageEvent) => {
                if (e.data?.type === "DEVICE") {
                    removeAlarm(e.data.id)
                }
            }

            navigator.serviceWorker.addEventListener("message", handler)

            return () => {
                navigator.serviceWorker.removeEventListener("message", handler)
            }
        })

        return () => cancelIdleCallback(id)
    }, [removeAlarm])
}
