export interface AlarmFCMPayload {
    device_id: string
    state: string
    prevAt: string
    now: string
}

export interface AlarmData {
    id: number
    type: "WASH" | "DRY"
    duration: string
}
