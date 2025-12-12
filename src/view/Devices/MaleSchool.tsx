import { DeviceLayout } from "../../components/main/device/DeviceLayout"
import type { DeviceData } from "../../components/main/device/type"
import { maleSchoolLayout } from "../../layouts/maleSchool"

export function MaleSchool() {
    const maleSchoolDummyDevices: DeviceData[] = maleSchoolLayout
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
                layout={maleSchoolLayout}
                devices={maleSchoolDummyDevices}
            />
        </>
    )
}
