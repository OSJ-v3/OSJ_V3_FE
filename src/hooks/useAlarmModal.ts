import { useState, useCallback } from "react"
import type { AlarmData } from "../types/alarm"

export function useAlarmModal() {
    const [alarms, setAlarms] = useState<AlarmData[]>([])

    const showAlarm = useCallback((data: AlarmData) => {
        setAlarms((prev) => [data, ...prev])
    }, [])

    const closeAlarm = useCallback((id: number) => {
        setAlarms((prev) => prev.filter((a) => a.id !== id))
    }, [])

    return { alarms, showAlarm, closeAlarm }
}
