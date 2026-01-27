import { useId, type ComponentProps } from "react"
import styled, { css } from "styled-components"
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
    const id = useId()

    return (
        <InputFrame style={style}>
            {label && (
                <Label htmlFor={id}>
                    <Text font="subTitle2" color="System.InverseSurface">
                        {label}
                    </Text>
                </Label>
            )}

            <InputWrapper>
                {variant === "textarea" ? (
                    <TextareaContent
                        id={id}
                        {...(props as ComponentProps<"textarea">)}
                    />
                ) : (
                    <InputContent id={id} type={type} {...props} />
                )}
            </InputWrapper>
        </InputFrame>
    )
}

const InputFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`

const Label = styled.label`
    cursor: text;
`

const sharedInputStyles = css`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    width: 100%;
    border: none;
    background: none;
    resize: none;

    color: ${({ theme }) => theme.colors.System.InverseSurface};

    &::placeholder {
        color: ${({ theme }) => theme.colors.Gray.OnSecondary};
    }

    &:focus-visible {
        outline: none;
    }
`

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 12px;
    transition: border-color 0.2s ease;

    background-color: ${({ theme }) => theme.colors.Gray.Secondary};
    border: 1px solid ${({ theme }) => theme.colors.Gray.SurfaceContainerLowest};

    &:focus-within {
        border-color: ${({ theme }) => theme.colors.Main.Primary};
    }
`

const InputContent = styled.input`
    ${sharedInputStyles};
`

const TextareaContent = styled.textarea`
    ${sharedInputStyles};
    height: 400px;
`
