import type { LayoutCell } from "../../../components"
import { mapLayoutToDevices } from "../mapper"
import { randomState, skeletonState, socketState } from "../selectors"
import type { DeviceState } from "../types"

interface Params {
    layout: LayoutCell[][]
    states?: DeviceState[]
    range?: [number, number]
    forceSkeleton?: boolean
}

export function useDevices({ layout, states, range, forceSkeleton }: Params) {
    if (forceSkeleton) {
        return mapLayoutToDevices(layout, skeletonState)
    }

    if (!states || !range) {
        return mapLayoutToDevices(layout, randomState)
    }

    return mapLayoutToDevices(layout, socketState(states, range))
}
