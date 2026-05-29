import type { DeviceState, DeviceStateValue } from "./types"

export function skeletonState(): DeviceStateValue {
    return "skeleton"
}

export function randomState(): DeviceStateValue {
    return Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3
}

export function socketState(stateMap: Map<number, DeviceState["state"]>, range: [number, number]) {
    return (id: number): DeviceStateValue => {
        if (id < range[0] || id > range[1]) return 2
        return stateMap.get(id) ?? 2
    }
}
