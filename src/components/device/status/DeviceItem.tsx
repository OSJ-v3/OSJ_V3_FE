import { useState, useCallback } from "react"
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

    const open = useCallback((d: RealDeviceData) => setSelected(d), [])

    const close = useCallback(() => setSelected(null), [])

    if (!device) return <div style={{ flex: 1, height: 88 }} />

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
                onClick={() => open(device)}
            />

            {selected && <DeviceAlarmSheet device={selected} onClose={close} />}
        </>
    )
}
