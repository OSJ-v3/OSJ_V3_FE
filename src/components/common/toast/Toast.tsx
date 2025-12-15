import { CircleCheck, CircleAlert, Info } from "lucide-react"
import type { ReactNode } from "react"
import styled, { type DefaultTheme, useTheme } from "styled-components"
import { Text } from "../Text"

export type ToastType = "success" | "error" | "info"

const toastIcon: Record<ToastType, ReactNode> = {
    success: <CircleCheck size={24} />,
    error: <CircleAlert size={24} />,
    info: <Info size={24} />,
}

const toastColor = (theme: DefaultTheme, type: ToastType) => {
    switch (type) {
        case "success":
            return theme.colors.Main.Primary
        case "error":
            return theme.colors.Sub.Error
        case "info":
            return theme.colors.Gray.Gray400
        default:
            return theme.colors.System.OnSurface
    }
}

interface ToastProps {
    text: string
    type: ToastType
    visible?: boolean
}

export function Toast({ text, type, visible = true }: ToastProps) {
    const theme = useTheme()

    return (
        <Wrapper>
            <Container $visible={visible}>
                <IconWrapper $color={toastColor(theme, type)}>
                    {toastIcon[type]}
                </IconWrapper>
                <Text font={"body1"}>{text}</Text>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    z-index: 9999;
    position: fixed;
    bottom: 58px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    pointer-events: none;
`

const Container = styled.div<{ $visible: boolean }>`
    background: ${({ theme }) => theme.colors.Gray.Secondary};
    border-radius: 20px;

    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;

    pointer-events: auto;

    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.25s ease;
`

const IconWrapper = styled.div<{ $color: string }>`
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
`
