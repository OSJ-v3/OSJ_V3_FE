import { AreaSelector } from "../../components/main/AreaSelector"
import { Female } from "./Female"
import { MaleDorm } from "./MaleDorm"
import { MaleSchool } from "./MaleSchool"
import { useAreaStore } from "../../stores/useAreaStore"
import { useState } from "react"

export function Status() {
    const { area } = useAreaStore()
    const [present, setPresent] = useState(area)

    return (
        <>
            <AreaSelector value={present} onChange={setPresent} />
            {present == "남자 학교측" && <MaleSchool />}
            {present == "남자 기숙사측" && <MaleDorm />}
            {present == "여자" && <Female />}
        </>
    )
}
