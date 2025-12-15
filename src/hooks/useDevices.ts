import type { DeviceData } from "../components"
import type { LayoutCell } from "../components"

export function useDevices(
    layout: LayoutCell[][],
    forceSkeleton?: boolean
): DeviceData[] {
    if (forceSkeleton) return []

    return layout
        .flat()
        .filter((c) => c.type !== "empty")
        .flatMap((cell) => {
            if (cell.type === "single") {
                return [
                    {
                        id: cell.device.id,
                        type: cell.device.deviceType,
                        state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
                    },
                ]
            }

            return cell.devices.map((d) => ({
                id: d.id,
                type: d.deviceType,
                state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
            }))
        })
}
