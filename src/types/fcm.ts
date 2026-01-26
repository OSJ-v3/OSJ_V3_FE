export interface FCMDevicePayload {
    device_id: string
    prevAt: string
    now: string
}

export interface FCMBaseData {
    [key: string]: string | undefined
}

export interface FCMNoticeData extends FCMBaseData {
    title: string
    content: string
}

export interface FCMDeviceData extends FCMBaseData {
    device_id: string
}
