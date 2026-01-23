import type { Alarm } from "../types/alarm"

const WASHER_IDS = new Set([
    1, 3, 5, 7, 8, 9, 10, 11, 18, 20, 21, 22, 23, 30, 32, 33, 35, 36, 37, 42,
    44, 45, 47, 48, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
])

const DRYER_IDS = new Set([
    2, 4, 6, 12, 13, 14, 15, 16, 17, 24, 25, 26, 27, 28, 29, 31, 34, 38, 39, 40,
    41, 43, 46, 50, 51, 62, 63, 64, 65, 66, 67,
])

export function mapFCMToAlarm(payload: any): Alarm | null {
    const data = payload?.data
    if (!data) return null

    if (data.title && data.content) {
        return {
            type: "NOTICE",
            title: data.title,
            content: data.content,
            createdAt: Date.now(),
        }
    }

    if (data.device_id) {
        const id = Number(data.device_id)

        let deviceName = "기기"
        if (WASHER_IDS.has(id)) deviceName = "세탁기"
        if (DRYER_IDS.has(id)) deviceName = "건조기"

        return {
            type: "DEVICE",
            deviceId: id,
            title: "작동 완료 알림",
            content: `${id}번 ${deviceName}가 완료되었습니다`,
            createdAt: Date.now(),
        }
    }

    return null
}
