import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "./styles/theme"
import { useThemeStore } from "./stores/useThemeStore"
import { useSystemTheme } from "./hooks/useSystemTheme"
import { useThemeColor } from "./hooks/useThemeColor"
import { GlobalStyle } from "./styles/GlobalStyle"
import { AppLayout } from "./styles/AppLayout"
import "./styles/global.css"
import { Splash } from "./components/common/Splash"
import { useEffect, useState } from "react"
import { Device } from "./components/items/Device"
import { Toast } from "./components/common/Toast"
import { useToast } from "./hooks/useToast"
import { Button } from "./components/common/Button"
import { HeaderTabBar } from "./components/main/HeaderTabBar"
import { Toggle } from "./components/common/Toggle"
import { Input } from "./components/common/Input"

function App() {
    const [tab, setTab] = useState<"mine" | "status">("mine")
    const [on, setOn] = useState<boolean>(false)
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

    const { toast, visible, showToast } = useToast()

    return (
        <ThemeProvider theme={appliedTheme}>
            <Splash />
            <GlobalStyle />
            <AppLayout>
                <button onClick={() => showToast("성공!", "success")}>
                    성공 토스트
                </button>

                <button onClick={() => showToast("오류 발생", "error")}>
                    에러 토스트
                </button>

                <button onClick={() => showToast("안내 메시지", "info")}>
                    정보 토스트
                </button>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Device id={1} type="DRY" state={2} />
                    <Device id={1} type="WASH" state={3} />
                </div>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Device id={1} type="DRY" state={0} />
                    <Device id={1} type="WASH" state={1} />
                </div>
                {toast && (
                    <Toast
                        text={toast.text}
                        type={toast.type}
                        visible={visible}
                    />
                )}
                <Button>안ㅇㄴㅇ</Button>
                <Button kind="gray">dsdf</Button>
                <HeaderTabBar value={tab} onChange={setTab} />
                <Toggle value={on} onChange={setOn} />

                <Input label="테스트" placeholder="인풋" />
                <Input
                    label="테스트"
                    placeholder="텍스트에리어"
                    variant="textarea"
                />
            </AppLayout>
        </ThemeProvider>
    )
}

export default App
