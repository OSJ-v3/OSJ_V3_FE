import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "./styles/theme"
import { useThemeStore } from "./stores/useThemeStore"
import { useSystemTheme } from "./hooks/useSystemTheme"
import { useThemeColor } from "./hooks/useThemeColor"
import { GlobalStyle } from "./styles/GlobalStyle"
import { AppLayout } from "./styles/AppLayout"
import "./styles/global.css"
import { Splash } from "./components/common/Splash"
import { useEffect } from "react"
import { Device } from "./components/items/Device"

function App() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistrations().then((regs) => {
                regs.forEach((reg) => reg.update())
            })
        }
    }, [])

    const { mode } = useThemeStore()
    const systemTheme = useSystemTheme()

    const appliedTheme =
        mode === "system"
            ? systemTheme === "dark"
                ? darkTheme
                : lightTheme
            : mode === "dark"
            ? darkTheme
            : lightTheme

    useThemeColor(appliedTheme.colors.Surface)

    return (
        <ThemeProvider theme={appliedTheme}>
            <Splash />
            <GlobalStyle />
            <AppLayout>
                <Device id={1} type="DRY" state={0} />
                <Device id={1} type="WASH" state={1} />
                <Device id={1} type="DRY" state={2} />
                <Device id={1} type="WASH" state={3} />
            </AppLayout>
        </ThemeProvider>
    )
}

export default App
