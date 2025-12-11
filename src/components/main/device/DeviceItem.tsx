import type { DeviceData } from "./type"
import { Icon } from "../../items"

interface Props {
    device?: DeviceData
}

export function DeviceItem({ device }: Props) {
    if (!device) return <div style={{ flex: 1 }} />

    return (
        <Icon
            id={device.id}
            type={device.type}
            state={device.state}
            size="large"
        />
    )
}
