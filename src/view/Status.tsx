import { useState } from "react"
import styled from "styled-components"
import {
    NetworkError,
    AreaSelector,
    SkeletonDeviceLayout,
    DeviceLayout,
} from "../components"
import {
    useMinSkeleton,
    useNetworkRenderState,
    useDevicesSocket,
} from "../hooks"
import { maleSchoolLayout, maleDormLayout, femaleLayout } from "../layouts"
import { useAreaStore, useNetworkStore } from "../stores"
import type { DeviceState } from "../domains/devices"

interface Props {
    states: DeviceState[]
    loading: boolean
    error: boolean
}

const AREA_CONFIG = {
    "남자 학교측": {
        layout: maleSchoolLayout,
        range: [1, 25] as const,
    },
    "남자 기숙사측": {
        layout: maleDormLayout,
        range: [26, 51] as const,
    },
    여자: {
        layout: femaleLayout,
        range: [52, 67] as const,
    },
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

    const { layout, range } = AREA_CONFIG[present]

    const devices = useDevicesSocket(layout, states, range, isSkeleton)

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
                <SkeletonDeviceLayout layout={layout} />
            )}

            {renderState === "content" && (
                <DeviceLayout layout={layout} devices={devices} />
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
