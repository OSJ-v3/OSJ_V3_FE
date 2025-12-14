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
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Complain, Detail, Main, Notice, Setting } from "./view"
import { ToastProvider } from "./contexts/ToastContext"
import { ToastRenderer } from "./components/common/ToastRenderer"
import { AlarmProvider } from "./contexts/AlarmContext"
import { AlarmRenderer } from "./components/common/AlarmRenderer"

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
        <BrowserRouter>
            <ThemeProvider theme={appliedTheme}>
                <AlarmProvider>
                    <AlarmRenderer />
                    <ToastProvider>
                        <Splash />
                        <GlobalStyle />

                        <ToastRenderer />

                        <AppLayout>
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/notice" element={<Notice />} />
                                <Route path="/setting" element={<Setting />} />
                                <Route
                                    path="/complain"
                                    element={<Complain />}
                                />
                                <Route
                                    path="/notice/:id"
                                    element={<Detail />}
                                />
                            </Routes>
                        </AppLayout>
                    </ToastProvider>
                </AlarmProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
