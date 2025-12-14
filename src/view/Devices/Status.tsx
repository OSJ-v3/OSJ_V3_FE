import { AreaSelector } from "../../components/main/AreaSelector"
import { Female } from "./Female"
import { MaleDorm } from "./MaleDorm"
import { MaleSchool } from "./MaleSchool"
import { useAreaStore } from "../../stores/useAreaStore"
import { useEffect, useState } from "react"
import { useMinSkeleton } from "../../hooks/useMinSkeleton"

export function Status() {
    const { area } = useAreaStore()
    const [present, setPresent] = useState(area)

    const [isLoading, setIsLoading] = useState(false)
    const showSkeleton = useMinSkeleton(isLoading, 1000)

    // 지금은 1초후 바로 false, 나중에 api 연동
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
                <MaleSchool forceSkeleton={showSkeleton} />
            )}

            {present === "남자 기숙사측" && (
                <MaleDorm forceSkeleton={showSkeleton} />
            )}

            {present === "여자" && <Female forceSkeleton={showSkeleton} />}
        </>
    )
}
