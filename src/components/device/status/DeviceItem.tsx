import { useState } from "react"
import {
    DeviceIcon,
    type DeviceData,
    DeviceAlarmSheet,
    type RealDeviceData,
} from "../.."

interface Props {
    device?: DeviceData
}

function isRealDevice(device: DeviceData): device is RealDeviceData {
    return device.state !== "skeleton"
}

export function DeviceItem({ device }: Props) {
    const [selected, setSelected] = useState<RealDeviceData | null>(null)

    if (!device) return <div style={{ flex: 1 }} />

    if (!isRealDevice(device)) {
        return (
            <DeviceIcon
                id={device.id}
                type={device.type}
                state={0}
                size="large"
            />
        )
    }

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
