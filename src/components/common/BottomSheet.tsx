import styled from "styled-components"
import {
    type ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { createPortal } from "react-dom"
import { ChevronDown } from "lucide-react"
import { Text } from "./Text"

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
    const [mounted, setMounted] = useState(false)
    const [closing, setClosing] = useState(false)
    const closedRef = useRef(false)
    const scrollYRef = useRef(0)

    const handleClose = () => {
        if (closing) return
        setClosing(true)
    }

    useLayoutEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    useEffect(() => {
        const scrollY = window.scrollY
        scrollYRef.current = scrollY

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
            window.scrollTo(0, scrollYRef.current)
        }
    }, [])

    const portalRoot = document.getElementById("bottom-sheet-root")
    if (!portalRoot) return null

    return createPortal(
        <Overlay onClick={handleClose}>
            <Sheet
                $mounted={mounted}
                $closing={closing}
                onClick={(e) => e.stopPropagation()}
                onTransitionEnd={() => {
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

const Overlay = styled.div`
    margin: auto;
    max-width: 600px;
    width: 100%;
    position: fixed;
    inset: 0;

    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);

    display: flex;
    justify-content: center;
    align-items: flex-end;

    z-index: 999;
`

const Sheet = styled.div<{ $mounted: boolean; $closing: boolean }>`
    width: 100%;
    border-radius: 20px 20px 0 0;
    background: ${({ theme }) => theme.colors.System.OnSurface};
    padding: 16px 24px 24px;

    transform: translateY(
        ${({ $mounted, $closing }) =>
            $closing ? "100%" : $mounted ? "0%" : "100%"}
    );

    transition: transform 0.2s ease-out;
    will-change: transform;
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
