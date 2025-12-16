export type DeviceType = "WASH" | "DRY"

export interface DeviceData {
    id: number
    type: DeviceType
    state: 0 | 1 | 2 | 3 | "skeleton"
}

export interface DeviceRef {
    id: number
    deviceType: DeviceType
}

export interface SingleCell {
    type: "single"
    device: DeviceRef
}

export interface PairCell {
    type: "pair"
    devices: [DeviceRef, DeviceRef]
}

export interface EmptyCell {
    type: "empty"
}

export type LayoutCell = SingleCell | PairCell | EmptyCell
export type LayoutRow = LayoutCell[]
