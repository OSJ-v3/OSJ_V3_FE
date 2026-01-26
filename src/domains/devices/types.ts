export type DeviceStateValue = 0 | 1 | 2 | 3 | "skeleton"

export interface DeviceState {
    id: number
    state: 0 | 1 | 2 | 3
}

export interface DeviceData {
    id: number
    type: string
    state: DeviceStateValue
}
