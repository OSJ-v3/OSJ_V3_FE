import type { ElementType, ComponentPropsWithoutRef } from "react"
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

type TextProps<T extends ElementType> = {
    as?: T
    font?: fontsKeyOfType
    color?: ColorKey
    ariaLabel?: string
    children?: React.ReactNode
} & ComponentPropsWithoutRef<T>

const fontToCss = (font: fontsKeyOfType) => {
    const style = Fonts[font]
    return `
        font-size: ${style.fontSize};
        font-weight: ${style.fontWeight};
        line-height: ${style.lineHeight};
    `
}

const StyledText = styled.span.withConfig({
    shouldForwardProp: (prop) => !["font", "color"].includes(prop),
})<{
    font: fontsKeyOfType
    color: ColorKey
}>`
    white-space: pre-line;
    ${({ font }) => fontToCss(font)};
    color: ${({ theme, color }) =>
        resolveColor(theme.colors, color) ?? theme.colors.System.OnSurface};
`

export const Text = <T extends ElementType = "span">({
    as,
    font = "body1",
    color = "System.InverseSurface",
    ariaLabel,
    children,
    ...props
}: TextProps<T>) => {
    return (
        <StyledText
            as={as}
            font={font}
            color={color}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </StyledText>
    )
}
