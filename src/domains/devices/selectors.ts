import type { DeviceState, DeviceStateValue } from "./types"

export function skeletonState(): DeviceStateValue {
    return "skeleton"
}

export function randomState(): DeviceStateValue {
    return Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3
}

export function socketState(states: DeviceState[], range: [number, number]) {
    const map = new Map(states.map((s) => [s.id, s.state]))

    return (id: number): DeviceStateValue => {
        if (id < range[0] || id > range[1]) return 2
        return map.get(id) ?? 2
    }
}
