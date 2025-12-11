import styled from "styled-components"
import { type ReactNode, useEffect } from "react"

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
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [onClose])

    return (
        <Overlay onClick={onClose}>
            <Sheet onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Title>{title}</Title>
                    {caption && <Caption>{caption}</Caption>}
                </Header>

                <Content>{children}</Content>

                {actions && <ActionArea>{actions}</ActionArea>}
            </Sheet>
        </Overlay>
    )
}

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: flex-end;
    z-index: 999;
`

const Sheet = styled.div`
    width: 100%;
    border-radius: 20px 20px 0 0;
    background: ${({ theme }) => theme.colors.System.OnSurface};
    padding: 24px;
    animation: slideUp 0.25s ease-out;

    @keyframes slideUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
`

const Header = styled.div`
    margin-bottom: 20px;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.System.InverseSurface};
`

const Caption = styled.div`
    margin-top: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.System.InverseSurface};
    opacity: 0.8;
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
