import { createPortal } from "react-dom"
import styled from "styled-components"
import { useEffect } from "react"
import { useAlarmContext } from "../../contexts/AlarmContext"
import { AlarmModal } from "./AlarmModal"

export function AlarmRenderer() {
    const { alarms, closeAlarm } = useAlarmContext()

    useEffect(() => {
        if (!alarms.length) return

        const original = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = original
        }
    }, [alarms.length])

    if (!alarms.length) return null

    return createPortal(
        <Overlay>
            <StackScroll>
                {alarms.map((alarm) => (
                    <AlarmModal
                        key={alarm.id}
                        {...alarm}
                        onConfirm={() => closeAlarm(alarm.id)}
                    />
                ))}
            </StackScroll>
        </Overlay>,
        document.body
    )
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;

    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);

    display: flex;
    justify-content: center;
    align-items: flex-start;

    pointer-events: auto;

    overflow: hidden;
`

const StackScroll = styled.div`
    margin-top: 20px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    max-height: calc(100vh - 40px);
    overflow-y: auto;

    -webkit-overflow-scrolling: touch;

    pointer-events: none;

    > * {
        pointer-events: auto;
    }
`
