import { type ComponentProps } from "react"
import styled, { useTheme } from "styled-components"
import { Text } from "./Text"

type Props = ComponentProps<"input"> & {
    label?: string
    variant?: "input" | "textarea"
}

export const Input = ({
    label,
    type = "text",
    variant = "input",
    style,
    ...props
}: Props) => {
    const theme = useTheme()

    return (
        <InputFrame style={style}>
            {label && (
                <Text font="subTitle2" color="System.InverseSurface">
                    {label}
                </Text>
            )}

            <InputLabel $theme={theme}>
                {variant === "textarea" ? (
                    <TextareaContent {...(props as any)} $theme={theme} />
                ) : (
                    <InputContent {...props} type={type} $theme={theme} />
                )}
            </InputLabel>
        </InputFrame>
    )
}

const InputFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`

const sharedInputStyles = `
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    width: 100%;
    border: none;
    background: none;
    resize: none;

    &:focus {
        outline: none;
    }
`

const InputContent = styled.input<{ $theme: any }>`
    ${sharedInputStyles};
    color: ${({ $theme }) => $theme.colors.System.InverseSurface};

    &::placeholder {
        color: ${({ $theme }) => $theme.colors.Gray.OnSecondary};
    }
`

const TextareaContent = styled.textarea<{ $theme: any }>`
    ${sharedInputStyles};
    height: 400px;
    color: ${({ $theme }) => $theme.colors.System.InverseSurface};

    &::placeholder {
        color: ${({ $theme }) => $theme.colors.Gray.OnSecondary};
    }
`

const InputLabel = styled.label<{ $theme: any }>`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 16px;
    border-radius: 12px;
    transition: 200ms;

    background-color: ${({ $theme }) => $theme.colors.Gray.Secondary};
    border: 1px solid
        ${({ $theme }) => $theme.colors.Gray.SurfaceContainerLowest};

    &:focus-within {
        border: 1px solid ${({ $theme }) => $theme.colors.Main.Primary};
    }
`
