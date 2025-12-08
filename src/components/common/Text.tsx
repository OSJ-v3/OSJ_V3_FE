import type { ComponentProps } from "react"
import styled from "styled-components"
import type { fontsKeyOfType } from "../../styles/fonts"
import { Fonts } from "../../styles/fonts"

import { lightColors } from "../../styles/colors/lightColors"
export type Colors = typeof lightColors

type ColorKey =
    | "Surface"
    | "System.InserveSurface"
    | "System.OnSurface"
    | `Main.${keyof typeof import("../../styles/colors/lightColors").lightColors.Main}`
    | `Gray.${keyof typeof import("../../styles/colors/lightColors").lightColors.Gray}`
    | `Sub.${keyof typeof import("../../styles/colors/lightColors").lightColors.Sub}`

type Props = ComponentProps<"span"> & {
    font?: fontsKeyOfType
    color?: ColorKey
}

const fontToCss = (font: fontsKeyOfType) => {
    const style = Fonts[font]

    return `
    font-size: ${style.fontSize};
    font-weight: ${style.fontWeight};
  `
}

const StyledText = styled.span<{
    $font: fontsKeyOfType
    $color: ColorKey
}>`
    ${({ $font }) => fontToCss($font)};

    color: ${({ theme, $color }) => {
        const parts = $color.split(".")

        if (parts.length === 1) {
            const group = parts[0] as keyof typeof theme.colors
            return theme.colors[group]
        }

        const [group, key] = parts
        const groupObj = theme.colors[group as keyof typeof theme.colors]

        if (typeof groupObj === "string") {
            return groupObj
        }

        if (key in groupObj) {
            return groupObj[key as keyof typeof groupObj]
        }

        return theme.colors.System.OnSurface
    }};
`

export const Text = ({
    font = "body1",
    color = "System.InserveSurface",
    children,
    ...props
}: Props) => {
    return (
        <StyledText $font={font} $color={color} {...props}>
            {children}
        </StyledText>
    )
}
