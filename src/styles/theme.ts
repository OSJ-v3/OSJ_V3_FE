import { lightColors } from "./colors/lightColors"
import { darkColors } from "./colors/darkColors"

export const lightTheme = {
    mode: "light",
    colors: lightColors,
}

export const darkTheme = {
    mode: "dark",
    colors: darkColors,
}

export type ThemeType = typeof lightTheme
