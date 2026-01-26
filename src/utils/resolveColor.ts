import type { DefaultTheme } from "styled-components"

export function resolveColor(colors: DefaultTheme["colors"], key: string) {
    const parts = key.split(".")
    return parts.reduce<any>((acc, cur) => acc?.[cur], colors)
}
