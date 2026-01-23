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

export type Alarm =
    | {
          type: "NOTICE"
          title: string
          content: string
          createdAt: number
      }
    | {
          type: "DEVICE"
          deviceId: number
          title: string
          content: string
          createdAt: number
      }
