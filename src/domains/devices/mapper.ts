import type { LayoutCell } from "../../components"
import type { DeviceData } from "./types"

export function mapLayoutToDevices(
    layout: LayoutCell[][],
    resolveState: (id: number) => DeviceData["state"],
): DeviceData[] {
    return layout
        .flat()
        .filter((cell) => cell.type !== "empty")
        .flatMap((cell) =>
            cell.type === "single"
                ? [
                      {
                          id: cell.device.id,
                          type: cell.device.deviceType,
                          state: resolveState(cell.device.id),
                      },
                  ]
                : cell.devices.map((d) => ({
                      id: d.id,
                      type: d.deviceType,
                      state: resolveState(d.id),
                  })),
        )
}
