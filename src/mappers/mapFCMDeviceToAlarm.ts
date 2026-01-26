import type { Alarm } from "../types/alarm"
import type { FCMDeviceData } from "../types/fcm"

const WASHER_IDS = new Set<number>([
    1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36, 37, 42,
    44, 45, 47, 48, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
])

export function mapFCMDeviceToAlarm(
    data: FCMDeviceData,
    now: number = Date.now(),
): Alarm | null {
    const id = Number(data.device_id)
    if (Number.isNaN(id)) return null

    const deviceName = WASHER_IDS.has(id) ? "세탁기" : "건조기"

    return {
        type: "DEVICE",
        deviceId: id,
        title: `${id}번 ${deviceName}`,
        content: "작동이 완료되었습니다.",
        createdAt: now,
    }
}
