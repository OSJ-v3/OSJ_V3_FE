import type { ComponentProps } from "react"
import styled from "styled-components"
import type { fontsKeyOfType } from "../../styles/fonts"
import { Fonts } from "../../styles/fonts"

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
        const [group, key] = $color.split(".")

        if (!key) {
            return theme.colors[group as "Surface"]
        }

        return theme.colors[group as "System" | "Main" | "Gray" | "Sub"][
            key as never
        ]
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
