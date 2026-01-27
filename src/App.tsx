import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { lazy, Suspense, useEffect, useState } from "react"

import { Splash } from "./components"
import { ToastProvider } from "./contexts/ToastContext"

import { useSystemTheme, useThemeColor } from "./hooks"
import {
    useInitNoticePush,
    useSyncAlarmFromServer,
    useNetworkListener,
} from "./hooks"

import { useThemeStore } from "./stores"
import { darkTheme, lightTheme, GlobalStyle, AppLayout } from "./styles"

const Main = lazy(() => import("./view/Main"))
const Notice = lazy(() => import("./view/Notice"))
const Setting = lazy(() => import("./view/Setting"))
const Complain = lazy(() => import("./view/Complain"))
const Detail = lazy(() => import("./view/Detail"))

const AlarmRenderer = lazy(() =>
    import("./components").then((m) => ({ default: m.AlarmRenderer })),
)
const ToastRenderer = lazy(() =>
    import("./components").then((m) => ({ default: m.ToastRenderer })),
)

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

function DeferredEffects() {
    useInitNoticePush()
    useSyncAlarmFromServer()
    useNetworkListener()
    return null
}

function AppInner() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            <Suspense fallback={null}>
                <AlarmRenderer />
                <ToastRenderer />
            </Suspense>

            <AppLayout>
                <Suspense fallback={<Splash />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Main />
                                    {mounted && <DeferredEffects />}
                                </>
                            }
                        />
                        <Route path="/notice" element={<Notice />} />
                        <Route path="/setting" element={<Setting />} />
                        <Route path="/complain" element={<Complain />} />
                        <Route path="/notice/:id" element={<Detail />} />
                    </Routes>
                </Suspense>
            </AppLayout>
        </>
    )
}

export default App
