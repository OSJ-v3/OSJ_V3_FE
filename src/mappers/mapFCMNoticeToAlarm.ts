import type { Alarm } from "../types/alarm"
import type { FCMNoticeData } from "../types/fcm"

export function mapFCMNoticeToAlarm(
    data: FCMNoticeData,
    now: number = Date.now(),
): Alarm {
    return {
        type: "NOTICE",
        title: data.title,
        content: data.content,
        createdAt: now,
    }
}
