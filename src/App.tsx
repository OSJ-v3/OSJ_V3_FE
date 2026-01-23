import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { ToastProvider } from "./contexts"
import { useSystemTheme, useThemeColor } from "./hooks"
import { useThemeStore } from "./stores"
import { darkTheme, lightTheme, GlobalStyle, AppLayout } from "./styles"
import { Main, Setting, Complain, Detail, Notice } from "./view"
import { useNetworkListener } from "./hooks/useNetworkListener"
import { AlarmRenderer, Splash, ToastRenderer } from "./components/common"
import { useInitNoticePush } from "./hooks/useInitNoticePush"
import { useSyncAlarmFromServer } from "./hooks/useSyncAlarmFromServer"
import { useEffect } from "react"
import { initFCM } from "./firebase/initFCM"

function App() {
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

    useEffect(() => {
        initFCM()
    }, [])

    return (
        <BrowserRouter>
            <ThemeProvider theme={appliedTheme}>
                <ToastProvider>
                    <AppInner />
                </ToastProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

function AppInner() {
    useInitNoticePush()
    useSyncAlarmFromServer()
    useNetworkListener()

    return (
        <>
            <Splash />
            <GlobalStyle />
            <AlarmRenderer />
            <ToastRenderer />

            <AppLayout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/complain" element={<Complain />} />
                    <Route path="/notice/:id" element={<Detail />} />
                </Routes>
            </AppLayout>
        </>
    )
}

export default App
