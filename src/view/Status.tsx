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
import { useDeviceStatusSocket } from "../domains/devices"

interface Props {
    loading: boolean
    error: boolean
}

const AREA_CONFIG = {
    "남자 학교측": {
        layout: maleSchoolLayout,
        range: [1, 25] as readonly [number, number],
    },
    "남자 기숙사측": {
        layout: maleDormLayout,
        range: [26, 51] as readonly [number, number],
    },
    여자: {
        layout: femaleLayout,
        range: [52, 67] as readonly [number, number],
    },
}

export function Status({ loading }: Props) {
    const { area } = useAreaStore()
    const { status } = useNetworkStore()
    const [present, setPresent] = useState(area)

    const {
        stateMap,
        version,
        loading: socketLoading,
        error: socketError,
    } = useDeviceStatusSocket()

    const showSkeleton = useMinSkeleton(loading || socketLoading, 500)

    const renderState = useNetworkRenderState({
        status,
        loading: loading || socketLoading,
        showSkeleton,
    })

    const isSkeleton = renderState === "skeleton"

    const { layout, range } = AREA_CONFIG[present]

    const devices = useDevicesSocket(
        layout,
        stateMap,
        version,
        range,
        isSkeleton,
    )

    if (renderState === "error" || socketError) {
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
