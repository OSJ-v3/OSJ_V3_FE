import { useEffect } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { useAlarmModalStore } from "../../../stores"
import { AlarmModal } from "./AlarmModal"

export function AlarmRenderer() {
    const { isOpen, close, triggerAt } = useAlarmModalStore()

    useEffect(() => {
        if (!isOpen) return

        const original = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = original
        }
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <Overlay>
            <AlarmModal key={triggerAt} onConfirm={close} />
        </Overlay>,
        document.body,
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
