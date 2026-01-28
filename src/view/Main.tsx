import { useRef, useState, useLayoutEffect, useCallback, useMemo } from "react"
import styled from "styled-components"
import {
    HeaderTabBar,
    Text,
    MyDevice,
    SkeletonMyDevice,
    NetworkError,
} from "../components"
import Status from "./Status"
import { useStartStore, useAlarmStore, useNetworkStore } from "../stores"
import { useMinSkeleton, useNetworkRenderState } from "../hooks"
import { useDeviceStatusSocket } from "../domains/devices"

const SKELETON_COUNT = 6
const SWIPE_THRESHOLD = 50

export default function Main() {
    const start = useStartStore((s) => s.start)
    const alarms = useAlarmStore((s) => s.alarms)
    const networkStatus = useNetworkStore((s) => s.status)

    const [tab, setTab] = useState<"mine" | "status">(start)
    const [height, setHeight] = useState<number | undefined>(undefined)

    const mineRef = useRef<HTMLDivElement>(null)
    const statusRef = useRef<HTMLDivElement>(null)

    const socket = useDeviceStatusSocket()
    const showSkeleton = useMinSkeleton(socket.loading, 500)

    const renderState = useNetworkRenderState({
        status: networkStatus,
        loading: socket.loading,
        showSkeleton,
    })

    useLayoutEffect(() => {
        const target = tab === "mine" ? mineRef.current : statusRef.current
        if (!target) return

        const updateHeight = () => {
            setHeight(target.scrollHeight)
        }

        updateHeight()

        const observer = new ResizeObserver(updateHeight)
        observer.observe(target)

        return () => observer.disconnect()
    }, [tab])

    const touchStartX = useRef<number | null>(null)

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }, [])

    const onTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            if (touchStartX.current === null) return

            const diff = e.changedTouches[0].clientX - touchStartX.current

            if (diff > SWIPE_THRESHOLD && tab === "status") {
                setTab("mine")
            }
            if (diff < -SWIPE_THRESHOLD && tab === "mine") {
                setTab("status")
            }

            touchStartX.current = null
        },
        [tab],
    )

    const skeletons = useMemo(
        () =>
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <SkeletonMyDevice key={i} aria-hidden />
            )),
        [],
    )

    const alarmDevices = useMemo(
        () =>
            alarms.map((d) => (
                <MyDevice
                    key={`${d.type}-${d.id}`}
                    id={d.id}
                    type={d.type}
                    state={socket.stateMap.get(d.id) ?? 2}
                />
            )),
        [alarms, socket.version],
    )

    return (
        <Wrapper onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <HeaderTabBar value={tab} onChange={setTab} />

            <SlideContainer $height={height}>
                <SlideTrack $tab={tab}>
                    <SlidePage ref={mineRef}>
                        <TextContainer>
                            <Text
                                as="h1"
                                font="heading2"
                                aria-level={1}
                                role="heading"
                            >
                                알림 설정한
                                <br />
                                세탁기와 건조기
                            </Text>

                            <Text font="body1" color="Gray.OnSecondary">
                                알림을 설정하여 세탁기와 건조기를
                                <br />
                                누구보다 빠르게 사용해보세요.
                            </Text>
                        </TextContainer>

                        <DeviceGrid>
                            {renderState === "skeleton" && skeletons}

                            {renderState === "error" && (
                                <NetworkFill>
                                    <NetworkError />
                                </NetworkFill>
                            )}

                            {renderState === "content" && alarmDevices}
                        </DeviceGrid>
                    </SlidePage>

                    <SlidePage ref={statusRef}>
                        <Status loading={socket.loading} socket={socket} />
                    </SlidePage>
                </SlideTrack>
            </SlideContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100dvh - 20px);
    touch-action: pan-y;
    display: flex;
    flex-direction: column;
    gap: 28px;
`

const SlideContainer = styled.div<{ $height?: number }>`
    width: 100%;
    overflow: hidden;
    min-height: 100px;
    height: ${({ $height }) =>
        typeof $height === "number" ? `${$height}px` : "auto"};
    transition: height 0.2s ease;
`

const SlideTrack = styled.div<{ $tab: "mine" | "status" }>`
    display: flex;
    width: 200%;
    align-items: flex-start;
    transform: translateX(${({ $tab }) => ($tab === "mine" ? "0%" : "-50%")});
    transition: transform 0.2s ease-out;
    will-change: transform;
`

const SlidePage = styled.section`
    width: 50%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 28px;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`

const DeviceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding-bottom: 40px;
`

const NetworkFill = styled.div`
    grid-column: 1 / -1;
    min-height: calc(100vh - 380px);
    display: flex;
    align-items: center;
    justify-content: center;
`
