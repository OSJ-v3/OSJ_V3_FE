import { useState, useEffect } from "react"
import { AreaSelector, DeviceLayout } from "../components"
import { useMinSkeleton, useDevices } from "../hooks"
import { femaleLayout, maleDormLayout, maleSchoolLayout } from "../layouts"
import { useAreaStore } from "../stores"

export function Status() {
    const { area } = useAreaStore()
    const [present, setPresent] = useState(area)

    const [isLoading, setIsLoading] = useState(false)
    const showSkeleton = useMinSkeleton(isLoading, 1000)

    const female = useDevices(femaleLayout, showSkeleton)
    const maleDorm = useDevices(maleDormLayout, showSkeleton)
    const maleSchool = useDevices(maleSchoolLayout, showSkeleton)

    useEffect(() => {
        setIsLoading(true)

        const t = setTimeout(() => {
            setIsLoading(false)
        }, 0)

        return () => clearTimeout(t)
    }, [present])

    return (
        <>
            <AreaSelector value={present} onChange={setPresent} />

            {present === "남자 학교측" && (
                <DeviceLayout layout={maleSchoolLayout} devices={maleSchool} />
            )}

            {present === "남자 기숙사측" && (
                <DeviceLayout layout={maleDormLayout} devices={maleDorm} />
            )}

            {present === "여자" && (
                <DeviceLayout layout={femaleLayout} devices={female} />
            )}
        </>
    )
}
