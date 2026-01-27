import { useMemo } from "react"
import type { LayoutCell, DeviceData } from "../../components"

type DeviceStateValue = DeviceData["state"]

export function useDevicesSocket(
    layout: LayoutCell[][],
    stateMap: Map<number, DeviceStateValue>,
    version: number,
    range: readonly [number, number],
    forceSkeleton?: boolean,
): DeviceData[] {
    return useMemo(() => {
        const cells = layout.flat().filter((c) => c.type !== "empty")

        if (forceSkeleton) {
            return cells.flatMap((cell) =>
                cell.type === "single"
                    ? [
                          {
                              id: cell.device.id,
                              type: cell.device.deviceType,
                              state: "skeleton",
                          },
                      ]
                    : cell.devices.map((d) => ({
                          id: d.id,
                          type: d.deviceType,
                          state: "skeleton",
                      })),
            )
        }

        const [min, max] = range

        return cells.flatMap((cell) =>
            cell.type === "single"
                ? [
                      {
                          id: cell.device.id,
                          type: cell.device.deviceType,
                          state:
                              cell.device.id >= min && cell.device.id <= max
                                  ? (stateMap.get(cell.device.id) ?? 2)
                                  : 2,
                      },
                  ]
                : cell.devices.map((d) => ({
                      id: d.id,
                      type: d.deviceType,
                      state:
                          d.id >= min && d.id <= max
                              ? (stateMap.get(d.id) ?? 2)
                              : 2,
                  })),
        )
    }, [layout, range, forceSkeleton, version])
}
