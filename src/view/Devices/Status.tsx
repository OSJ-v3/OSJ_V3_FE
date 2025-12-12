import { useState } from "react"
import { AreaSelector } from "../../components/main/AreaSelector"
import { Female } from "./Female"
import { MaleDorm } from "./MaleDorm"
import { MaleSchool } from "./MaleSchool"

export function Status() {
    const [area, setArea] = useState<"남자 학교측" | "남자 기숙사측" | "여자">(
        "남자 학교측"
    )

    return (
        <>
            <AreaSelector value={area} onChange={setArea} />
            {area == "남자 학교측" && <MaleSchool />}
            {area == "남자 기숙사측" && <MaleDorm />}
            {area == "여자" && <Female />}
        </>
    )
}
