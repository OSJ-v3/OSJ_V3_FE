import { DeviceLayout } from "../../components/main/device/DeviceLayout"
import type { DeviceData } from "../../components/main/device/type"
import { maleDormLayout } from "../../layouts/maleDorm"

interface Props {
    forceSkeleton?: boolean
}

export function MaleDorm({ forceSkeleton }: Props) {
    const maleDormDummyDevices: DeviceData[] = maleDormLayout
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

    return (
        <>
            <DeviceLayout
                layout={maleDormLayout}
                devices={forceSkeleton ? [] : maleDormDummyDevices}
            />
        </>
    )
}
