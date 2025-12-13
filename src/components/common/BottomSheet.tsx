import styled, { keyframes } from "styled-components"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { Text } from "./Text"
import { ChevronDown } from "lucide-react"
import { createPortal } from "react-dom"

interface BottomSheetProps {
    title: string
    caption?: string
    children?: ReactNode
    actions?: ReactNode
    onClose: () => void
}

export function BottomSheet({
    title,
    caption,
    children,
    actions,
    onClose,
}: BottomSheetProps) {
    const [top, setTop] = useState(0)
    const [closing, setClosing] = useState(false)
    const closedRef = useRef(false)

    const handleClose = () => {
        if (closing) return
        setClosing(true)
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    useEffect(() => {
        setTop(window.scrollY)
    }, [])

    useEffect(() => {
        const scrollY = window.scrollY

        document.body.style.position = "fixed"
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = "0"
        document.body.style.right = "0"
        document.body.style.width = "100%"

        return () => {
            document.body.style.position = ""
            document.body.style.top = ""
            document.body.style.left = ""
            document.body.style.right = ""
            document.body.style.width = ""

            window.scrollTo(0, scrollY)
        }
    }, [])

    const portalRoot = document.getElementById("bottom-sheet-root")
    if (!portalRoot) return null

    return createPortal(
        <Overlay $top={top} $closing={closing} onClick={handleClose}>
            <Sheet
                $closing={closing}
                onClick={(e) => e.stopPropagation()}
                onAnimationEnd={() => {
                    if (closing && !closedRef.current) {
                        closedRef.current = true
                        onClose()
                    }
                }}
            >
                <Handle onClick={handleClose}>
                    <ChevronDown size={24} />
                </Handle>

                <Header>
                    <Text font="heading4" color="System.InverseSurface">
                        {title}
                    </Text>
                    {caption && (
                        <Text font="body2" color="Gray.SurfaceContainer">
                            {caption}
                        </Text>
                    )}
                </Header>

                <Content>{children}</Content>

                {actions && <ActionArea>{actions}</ActionArea>}
            </Sheet>
        </Overlay>,
        portalRoot
    )
}

const slideUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`

const slideDown = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
`

const Overlay = styled.div<{
    $closing: boolean
    $top: number
}>`
    position: absolute;
    left: 0;
    right: 0;
    top: ${({ $top }) => `${$top}px`};
    height: 100vh;
    overflow: hidden;

    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);

    display: flex;
    align-items: flex-end;
    z-index: 999;
`

const Sheet = styled.div<{ $closing: boolean }>`
    will-change: transform;
    width: 100%;
    border-radius: 20px 20px 0 0;
    background: ${({ theme }) => theme.colors.System.OnSurface};
    padding: 16px 24px 24px;

    animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.2s
        ease-out;
    animation-fill-mode: forwards;
`

const Handle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0 8px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.Gray.SurfaceContainer};
`

const Header = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const Content = styled.div`
    margin-bottom: 24px;
`

const ActionArea = styled.div`
    display: flex;
    gap: 14px;
    width: 100%;

    & > * {
        flex: 1;
    }
`
