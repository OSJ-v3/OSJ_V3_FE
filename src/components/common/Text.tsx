import type { ComponentProps } from "react"
import styled from "styled-components"
import { type fontsKeyOfType, Fonts } from "../../styles"
import type { Colors } from "../../types/theme"
import { resolveColor } from "../../utils"

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
    color: ${({ theme, $color }) =>
        resolveColor(theme.colors, $color) ?? theme.colors.System.OnSurface};
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
