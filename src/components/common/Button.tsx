import type { ComponentProps } from "react"
import styled from "styled-components"
import { Text } from "./Text"

type KindType = "primary" | "gray"

type Props = ComponentProps<"button"> & {
    kind?: KindType
    full?: boolean
    height?: number | string
    width?: number | string
    padding?: string
    borderRadius?: number
    border?: string
}

export const Button = ({
    kind = "primary",
    full = true,
    height = 44,
    width,
    padding = "8px 16px",
    borderRadius = 8,
    border,
    style,
    children,
    ...props
}: Props) => {
    return (
        <ButtonTag
            $kind={kind}
            $height={height}
            $width={width}
            $padding={padding}
            $borderRadius={borderRadius}
            $border={border}
            style={{
                width: full ? "100%" : width || "fit-content",
                ...style,
            }}
            {...props}
        >
            <Text
                color={
                    kind == "primary"
                        ? "System.OnSurface"
                        : "System.InverseSurface"
                }
                font={"button1"}
            >
                {children}
            </Text>
        </ButtonTag>
    )
}

const ButtonTag = styled.button<{
    $kind: "primary" | "gray"
    $height: number | string
    $width?: number | string
    $padding: string
    $borderRadius: number
    $border?: string
}>`
    border: ${({ $border }) => $border || "none"};
    cursor: pointer;
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    transition: 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    height: ${({ $height }) =>
        typeof $height === "number" ? `${$height}px` : $height};
    width: ${({ $width }) =>
        typeof $width === "number" ? `${$width}px` : $width || "fit-content"};

    padding: ${({ $padding }) => $padding};
    font-size: 16px;
    font-weight: 500;

    ${({ theme, $kind }) =>
        $kind === "primary"
            ? `
        background-color: ${theme.colors.Main.Primary};

        &:hover {
            background-color: ${theme.colors.Main.Main700};
        }
    `
            : `
        background-color: ${theme.colors.Gray.Secondary};

        &:hover {
            background-color: ${theme.colors.Gray.SurfaceContainerLowest};
        }
    `};
`
