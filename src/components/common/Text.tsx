import type { ComponentProps } from "react"
import styled, { type DefaultTheme } from "styled-components"
import { type fontsKeyOfType, Fonts } from "../../styles"
import type { Colors } from "../../types/theme"

type MainKeys = keyof Colors["Main"]
type GrayKeys = keyof Colors["Gray"]
type SubKeys = keyof Colors["Sub"]

export type ColorKey =
    | "Surface"
    | "System.InverseSurface"
    | "System.OnSurface"
    | `Main.${MainKeys}`
    | `Gray.${GrayKeys}`
    | `Sub.${SubKeys}`

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
    white-space: pre-line;
    ${({ $font }) => fontToCss($font)};
    color: ${({ theme, $color }) => {
        const colors = theme.colors as DefaultTheme["colors"]
        const parts = $color.split(".")

        if (parts.length === 1) {
            const group = parts[0] as keyof typeof colors
            return colors[group]
        }

        const [group, key] = parts
        const groupObj = colors[group as keyof typeof colors]

        if (typeof groupObj === "string") return groupObj
        if (key in groupObj) return (groupObj as Record<string, string>)[key]

        return colors.System.OnSurface
    }};
`

export const Text = ({
    font = "body1",
    color = "System.InverseSurface",
    children,
    ...props
}: Props) => {
    return (
        <StyledText $font={font} $color={color} {...props}>
            {children}
        </StyledText>
    )
}
