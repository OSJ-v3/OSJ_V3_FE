import type { LayoutCell } from "../../../components"
import { mapLayoutToDevices } from "../mapper"
import { randomState, skeletonState, socketState } from "../selectors"
import type { DeviceState } from "../types"

interface Params {
    layout: LayoutCell[][]
    stateMap?: Map<number, DeviceState["state"]>
    range?: [number, number]
    forceSkeleton?: boolean
}

export function useDevices({ layout, stateMap, range, forceSkeleton }: Params) {
    if (forceSkeleton) {
        return mapLayoutToDevices(layout, skeletonState)
    }

    if (!stateMap || !range) {
        return mapLayoutToDevices(layout, randomState)
    }

    return mapLayoutToDevices(layout, socketState(stateMap, range))
}
