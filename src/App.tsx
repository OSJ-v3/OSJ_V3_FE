import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { AlarmProvider, ToastProvider } from "./contexts"
import { useSystemTheme, useThemeColor } from "./hooks"
import { useThemeStore } from "./stores"
import { darkTheme, lightTheme, GlobalStyle, AppLayout } from "./styles"
import { Main, Setting, Complain, Detail, Notice } from "./view"
import { useNetworkListener } from "./hooks/useNetworkListener"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AlarmRenderer, Splash, ToastRenderer } from "./components/common"

function App() {
    useNetworkListener()

    const { mode } = useThemeStore()
    const systemTheme = useSystemTheme()
    const queryClient = new QueryClient()

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
        <QueryClientProvider client={queryClient}>
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
                                    <Route
                                        path="/notice"
                                        element={<Notice />}
                                    />
                                    <Route
                                        path="/setting"
                                        element={<Setting />}
                                    />
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
        </QueryClientProvider>
    )
}

export default App
