import { useState } from "react"
import { DeviceIcon, type DeviceData, DeviceAlarmSheet } from "../.."

interface Props {
    device?: DeviceData
}

export function DeviceItem({ device }: Props) {
    const [selected, setSelected] = useState<null | {
        id: number
        type: "WASH" | "DRY"
        state: 0 | 1 | 2 | 3
    }>(null)
    if (!device) return <div style={{ flex: 1 }} />

    return (
        <>
            <DeviceIcon
                id={device.id}
                type={device.type}
                state={device.state}
                size="large"
                onClick={() => setSelected(device)}
            />

            {selected && (
                <DeviceAlarmSheet
                    device={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    )
}
