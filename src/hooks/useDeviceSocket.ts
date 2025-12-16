import type { DeviceData, LayoutCell } from "../components"
import type { DeviceState } from "./useDeviceStatusSocket"

export function useDevicesSocket(
    layout: LayoutCell[][],
    states: DeviceState[],
    range: [number, number],
    forceSkeleton?: boolean
): DeviceData[] {
    if (forceSkeleton) {
        return layout
            .flat()
            .filter((c) => c.type !== "empty")
            .flatMap((cell) => {
                if (cell.type === "single") {
                    return [
                        {
                            id: cell.device.id,
                            type: cell.device.deviceType,
                            state: "skeleton",
                        },
                    ]
                }

                return cell.devices.map((d) => ({
                    id: d.id,
                    type: d.deviceType,
                    state: "skeleton",
                }))
            })
    }

    const stateMap = new Map(states.map((s) => [s.id, s.state]))

    return layout
        .flat()
        .filter((c) => c.type !== "empty")
        .flatMap((cell) => {
            if (cell.type === "single") {
                const id = cell.device.id
                return [
                    {
                        id,
                        type: cell.device.deviceType,
                        state:
                            id >= range[0] && id <= range[1]
                                ? stateMap.get(id) ?? 2
                                : 2,
                    },
                ]
            }

            return cell.devices.map((d) => ({
                id: d.id,
                type: d.deviceType,
                state:
                    d.id >= range[0] && d.id <= range[1]
                        ? stateMap.get(d.id) ?? 2
                        : 2,
            }))
        })
}
