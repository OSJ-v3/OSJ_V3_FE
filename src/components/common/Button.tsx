import { memo, type ComponentProps } from "react"
import styled from "styled-components"
import { Text } from "./Text"

type ButtonVariant = "primary" | "gray"

type Props = ComponentProps<"button"> & {
    variant?: ButtonVariant
    fullWidth?: boolean
}

/**
 * 접근성 & 성능 최적화 Button
 * - 기본 type="button"
 * - focus-visible 지원
 * - disabled 상태 명확화
 * - memo 적용
 */
export const Button = memo(function Button({
    variant = "primary",
    fullWidth = true,
    type = "button",
    children,
    disabled,
    ...props
}: Props) {
    return (
        <StyledButton
            type={type}
            $variant={variant}
            $fullWidth={fullWidth}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        >
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
})

const StyledButton = styled.button<{
    $variant: ButtonVariant
    $fullWidth: boolean
}>`
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "fit-content")};
    height: 44px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition:
        background-color 0.2s ease,
        opacity 0.2s ease;

    ${({ theme, $variant }) =>
        $variant === "primary"
            ? `background: ${theme.colors.Main.Primary};`
            : `background: ${theme.colors.Gray.Secondary};`}

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.Main.Primary};
        outline-offset: 2px;
    }
`
