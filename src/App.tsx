import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { lazy, Suspense, useEffect, useState } from "react"

import { Splash } from "./components"
import { ToastProvider } from "./contexts/ToastContext"
import Main from "./view/Main"

import { useSystemTheme, useThemeColor } from "./hooks"
import { useInitNoticePush, useSyncAlarmFromServer, useNetworkListener } from "./hooks"

import { useThemeStore } from "./stores"
import { darkTheme, lightTheme, GlobalStyle, AppLayout } from "./styles"
import { useInitFCMNoticePush } from "./hooks/alarm/useInitFCMNoticePush"
import { useInitDeviceAlarm } from "./hooks/alarm/useInitDeviceAlarm"

const Notice = lazy(() => import("./view/Notice"))
const Setting = lazy(() => import("./view/Setting"))
const Complain = lazy(() => import("./view/Complain"))
const Detail = lazy(() => import("./view/Detail"))

const AlarmRenderer = lazy(() => import("./components").then((m) => ({ default: m.AlarmRenderer })))
const ToastRenderer = lazy(() => import("./components").then((m) => ({ default: m.ToastRenderer })))

function DeferredUI() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const id = requestIdleCallback(() => setReady(true))
        return () => cancelIdleCallback(id)
    }, [])

    if (!ready) return null

    return (
        <Suspense fallback={null}>
            <AlarmRenderer />
            <ToastRenderer />
        </Suspense>
    )
}

function DeferredEffects() {
    useInitFCMNoticePush()
    useInitDeviceAlarm()
    useInitNoticePush()
    useSyncAlarmFromServer()
    useNetworkListener()
    return null
}

function App() {
    const mode = useThemeStore((s) => s.mode)
    const systemTheme = useSystemTheme()

    const appliedTheme =
        mode === "system" ? (systemTheme === "dark" ? darkTheme : lightTheme) : mode === "dark" ? darkTheme : lightTheme

    useThemeColor(appliedTheme.colors.Surface)

    return (
        <BrowserRouter>
            <ThemeProvider theme={appliedTheme}>
                <GlobalStyle />
                <ToastProvider>
                    <AppInner />
                </ToastProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

function AppInner() {
    return (
        <>
            <DeferredUI />

            <AppLayout>
                <Suspense fallback={<Splash />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Main />
                                    <DeferredEffects />
                                </>
                            }
                        />
                        <Route path="/notice" element={<Notice />} />
                        <Route path="/notice/:id" element={<Detail />} />
                        <Route path="/setting" element={<Setting />} />
                        <Route path="/complain" element={<Complain />} />
                    </Routes>
                </Suspense>
            </AppLayout>
        </>
    )
}

export default App
