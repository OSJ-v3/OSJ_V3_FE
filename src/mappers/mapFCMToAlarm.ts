import type { Alarm } from "../types/alarm"
import type { FCMBaseData } from "../types/fcm"
import { mapFCMNoticeToAlarm } from "./mapFCMNoticeToAlarm"
import { mapFCMDeviceToAlarm } from "./mapFCMDeviceToAlarm"

export function mapFCMToAlarm(
    data: FCMBaseData | undefined,
    now: number = Date.now(),
): Alarm | null {
    if (!data) return null

    if (data.title && data.content) {
        return mapFCMNoticeToAlarm(
            data as { title: string; content: string },
            now,
        )
    }

    if (data.device_id) {
        return mapFCMDeviceToAlarm(data as { device_id: string }, now)
    }

    return null
}
