import { useLayoutEffect, useRef, useState, useMemo } from "react"
import {
    HeaderTabBar,
    Text,
    MyDevice,
    SkeletonMyDevice,
    NetworkError,
} from "../components"
import styled from "styled-components"
import { Status } from "./Status"
import { useStartStore, useAlarmStore, useNetworkStore } from "../stores"
import { useMinSkeleton, useNetworkRenderState } from "../hooks"
import { useDeviceStatusSocket } from "../domains/devices"

export function Main() {
    const { start } = useStartStore()
    const { alarms } = useAlarmStore()
    const { status } = useNetworkStore()
    const [tab, setTab] = useState<"mine" | "status">(start)
    const mineRef = useRef<HTMLDivElement>(null)
    const statusRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>(0)

    const { states, loading, error } = useDeviceStatusSocket()
    const stateMap = useMemo(
        () => new Map(states.map((s) => [s.id, s.state])),
        [states],
    )
    const showSkeleton = useMinSkeleton(loading, 500)

    const renderState = useNetworkRenderState({
        status,
        loading,
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

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return

        const diff = e.changedTouches[0].clientX - touchStartX.current

        if (diff > 50 && tab === "status") {
            setTab("mine")
        }

        if (diff < -50 && tab === "mine") {
            setTab("status")
        }

        touchStartX.current = null
    }

    return (
        <Wrapper onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <HeaderTabBar value={tab} onChange={setTab} />

            <SlideContainer $height={height}>
                <SlideTrack $tab={tab}>
                    <SlidePage ref={mineRef}>
                        <TextContainer>
                            <Text font="heading2">
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
                            {renderState === "skeleton" &&
                                Array.from({ length: 6 }).map((_, i) => (
                                    <SkeletonMyDevice key={i} />
                                ))}

                            {renderState === "error" && (
                                <NetworkFill>
                                    <NetworkError />
                                </NetworkFill>
                            )}

                            {renderState === "content" &&
                                alarms.map((d) => (
                                    <MyDevice
                                        key={`${d.type}-${d.id}`}
                                        id={d.id}
                                        type={d.type}
                                        state={stateMap.get(d.id) ?? 2}
                                    />
                                ))}
                        </DeviceGrid>
                    </SlidePage>

                    <SlidePage ref={statusRef}>
                        <Status
                            states={states}
                            loading={loading}
                            error={error}
                        />
                    </SlidePage>
                </SlideTrack>
            </SlideContainer>
        </Wrapper>
    )
}

const SlideContainer = styled.div<{ $height: number }>`
    width: 100%;
    overflow: hidden;
    height: ${({ $height }) => `${$height}px`};
    transition: height 0.2s ease;
`

const SlideTrack = styled.div<{ $tab: "mine" | "status" }>`
    display: flex;
    width: 200%;
    align-items: flex-start;

    transform: translateX(${({ $tab }) => ($tab === "mine" ? "0%" : "-50%")});
    transition: transform 0.2s ease-out;
`

const SlidePage = styled.div`
    width: 50%;
    flex-shrink: 0;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 28px;
`

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100dvh - 20px);
    touch-action: pan-y;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 28px;
`

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    justify-items: start;
    align-items: start;
    flex-direction: column;
    gap: 14px;
`

const DeviceGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding-bottom: 40px;
    overflow: hidden;
`

const NetworkFill = styled.div`
    grid-column: 1 / -1;
    min-height: calc(100vh - 380px);

    display: flex;
    align-items: center;
    justify-content: center;
`
