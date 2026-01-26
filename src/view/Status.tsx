import { useState } from "react"
import styled from "styled-components"
import {
    NetworkError,
    AreaSelector,
    SkeletonDeviceLayout,
    DeviceLayout,
} from "../components"
import {
    type DeviceState,
    useMinSkeleton,
    useNetworkRenderState,
    useDevicesSocket,
} from "../hooks"
import { maleSchoolLayout, maleDormLayout, femaleLayout } from "../layouts"
import { useAreaStore, useNetworkStore } from "../stores"

interface Props {
    states: DeviceState[]
    loading: boolean
    error: boolean
}

export function Status({ states, loading }: Props) {
    const { area } = useAreaStore()
    const { status } = useNetworkStore()
    const [present, setPresent] = useState(area)

    const showSkeleton = useMinSkeleton(loading, 500)

    const renderState = useNetworkRenderState({
        status,
        loading,
        showSkeleton,
    })

    const isSkeleton = renderState === "skeleton"

    const maleSchool = useDevicesSocket(
        maleSchoolLayout,
        states,
        [1, 25],
        isSkeleton,
    )

    const maleDorm = useDevicesSocket(
        maleDormLayout,
        states,
        [26, 51],
        isSkeleton,
    )

    const female = useDevicesSocket(femaleLayout, states, [52, 67], isSkeleton)

    if (renderState === "error") {
        return (
            <ErrorFill>
                <NetworkError />
            </ErrorFill>
        )
    }

    return (
        <>
            <AreaSelector value={present} onChange={setPresent} />

            {renderState === "skeleton" && (
                <SkeletonDeviceLayout
                    layout={
                        present === "남자 학교측"
                            ? maleSchoolLayout
                            : present === "남자 기숙사측"
                              ? maleDormLayout
                              : femaleLayout
                    }
                />
            )}

            {renderState === "content" && (
                <>
                    {present === "남자 학교측" && (
                        <DeviceLayout
                            layout={maleSchoolLayout}
                            devices={maleSchool}
                        />
                    )}

                    {present === "남자 기숙사측" && (
                        <DeviceLayout
                            layout={maleDormLayout}
                            devices={maleDorm}
                        />
                    )}

                    {present === "여자" && (
                        <DeviceLayout layout={femaleLayout} devices={female} />
                    )}
                </>
            )}
        </>
    )
}

const ErrorFill = styled.div`
    width: 100%;
    min-height: 80vh;

    display: flex;
    align-items: center;
    justify-content: center;
`
