import type { ComponentProps } from "react"
import styled from "styled-components"
import { Text } from "./Text"

type ButtonVariant = "primary" | "gray"

type Props = ComponentProps<"button"> & {
    variant?: ButtonVariant
    fullWidth?: boolean
}

export function Button({
    variant = "primary",
    fullWidth = true,
    children,
    ...props
}: Props) {
    return (
        <StyledButton $variant={variant} $fullWidth={fullWidth} {...props}>
            {typeof children === "string" ? (
                <Text
                    font="button1"
                    color={
                        variant === "primary"
                            ? "System.OnSurface"
                            : "System.InverseSurface"
                    }
                >
                    {children}
                </Text>
            ) : (
                children
            )}
        </StyledButton>
    )
}

const StyledButton = styled.button<{
    $variant: ButtonVariant
    $fullWidth: boolean
}>`
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "fit-content")};
    height: 44px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    ${({ theme, $variant }) =>
        $variant === "primary"
            ? `
        background: ${theme.colors.Main.Primary};
      `
            : `
        background: ${theme.colors.Gray.Secondary};
      `}
`
