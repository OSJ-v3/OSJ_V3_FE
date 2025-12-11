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
import { Toast } from "./components/common/Toast"
import { useToast } from "./hooks/useToast"
import { Button } from "./components/common/Button"
import { HeaderTabBar } from "./components/main/HeaderTabBar"
import { Toggle } from "./components/common/Toggle"
import { Input } from "./components/common/Input"
import { DeviceLayout } from "./components/main/device/DeviceLayout"
import type { DeviceData } from "./components/main/device/type"
import { femaleLayout } from "./layouts/female"
import { maleDormLayout } from "./layouts/maleDorm"
import { maleSchoolLayout } from "./layouts/maleSchool"

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

    // 더미데이터
    const femaleDummyDevices: DeviceData[] = femaleLayout
        .flat()
        .filter((c) => c.type !== "empty")
        .flatMap((cell) => {
            if (cell.type === "single") {
                return [
                    {
                        id: cell.device.id,
                        type: cell.device.deviceType,
                        state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
                    },
                ]
            }
            return cell.devices.map((d) => ({
                id: d.id,
                type: d.deviceType,
                state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
            }))
        })

    const maleDormDummyDevices: DeviceData[] = maleDormLayout
        .flat()
        .filter((c) => c.type !== "empty")
        .flatMap((cell) =>
            cell.type === "single"
                ? [
                      {
                          id: cell.device.id,
                          type: cell.device.deviceType,
                          state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
                      },
                  ]
                : cell.devices.map((d) => ({
                      id: d.id,
                      type: d.deviceType,
                      state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
                  }))
        )

    const maleSchoolDummyDevices: DeviceData[] = maleSchoolLayout
        .flat()
        .filter((c) => c.type !== "empty")
        .flatMap((cell) =>
            cell.type === "single"
                ? [
                      {
                          id: cell.device.id,
                          type: cell.device.deviceType,
                          state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
                      },
                  ]
                : cell.devices.map((d) => ({
                      id: d.id,
                      type: d.deviceType,
                      state: Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3,
                  }))
        )

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

                {tab && (
                    <>
                        <DeviceLayout
                            layout={femaleLayout}
                            devices={femaleDummyDevices}
                        />
                        dsf
                        <DeviceLayout
                            layout={maleDormLayout}
                            devices={maleDormDummyDevices}
                        />
                        sdf
                        <DeviceLayout
                            layout={maleSchoolLayout}
                            devices={maleSchoolDummyDevices}
                        />
                    </>
                )}
            </AppLayout>
        </ThemeProvider>
    )
}

export default App
