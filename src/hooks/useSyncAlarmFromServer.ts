import { useEffect } from "react"
import { fetchPushAlertList } from "../apis/device"
import { useAlarmStore, type AlarmDevice } from "../stores"
import { useFcmStore } from "../stores/useFcmStore"

const WASHER_IDS = new Set([
    1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36, 37, 42,
    44, 45, 47, 48, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
])

function mapToAlarmDevices(ids: number[]): AlarmDevice[] {
    return ids.map((id) => ({
        id,
        type: WASHER_IDS.has(id) ? "WASH" : "DRY",
    }))
}

export function useSyncAlarmFromServer() {
    const { token } = useFcmStore()
    const setAlarms = useAlarmStore((s) => s.setAlarms)

    useEffect(() => {
        if (!token) return

        fetchPushAlertList(token)
            .then((ids) => {
                const devices = mapToAlarmDevices(ids)
                setAlarms(devices)
            })
            .catch((err) => {
                console.error("알림 목록 동기화 실패", err)
            })
    }, [token, setAlarms])
}
