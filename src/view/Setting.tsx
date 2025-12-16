import { Settings, Sun, Moon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { useTheme, css } from "styled-components"
import {
    Header,
    SettingItem,
    StartPage,
    MainPage,
    ThemeSetting,
    Text,
} from "../components"
import { useThemeStore, useAreaStore, useStartStore } from "../stores"

export function Setting() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { mode, setMode } = useThemeStore()
    const { area, setArea } = useAreaStore()
    const { start, setStart } = useStartStore()
    const [themeOpen, setThemeOpen] = useState<boolean>(false)
    const [areaOpen, setAreaOpen] = useState(false)
    const [startOpen, setStartOpen] = useState<boolean>(false)

    const icon = {
        system: <Settings width={20} />,
        light: <Sun width={20} />,
        dark: <Moon width={20} />,
    }[mode]

    return (
        <>
            <Wrapper>
                <Header title="설정" />

                <ItemWrapper>
                    <SettingItem
                        title="메인 화면 설정"
                        onClick={() => setStartOpen(true)}
                    >
                        <Text font={"subTitle2"} color="Main.Primary">
                            {start == "mine" ? "내 세탁실" : "세탁실 현황"}
                        </Text>
                    </SettingItem>

                    <SettingItem
                        title="메인 세탁실 설정"
                        onClick={() => setAreaOpen(true)}
                    >
                        <Text font="subTitle2" color="Main.Primary">
                            {area}
                        </Text>
                    </SettingItem>

                    <SettingItem
                        title="테마 설정"
                        onClick={() => setThemeOpen(true)}
                    >
                        <div style={{ color: theme.colors.Main.Primary }}>
                            {icon}
                        </div>
                    </SettingItem>

                    <SettingItem
                        title="문의하기"
                        onClick={() => navigate("/complain")}
                    />
                </ItemWrapper>
            </Wrapper>

            {startOpen && (
                <StartPage
                    value={start}
                    onChange={(v) => setStart(v)}
                    onClose={() => setStartOpen(false)}
                />
            )}

            {areaOpen && (
                <MainPage
                    value={area}
                    onChange={(v) => setArea(v)}
                    onClose={() => setAreaOpen(false)}
                />
            )}

            {themeOpen && (
                <ThemeSetting
                    value={mode}
                    onChange={(v) => setMode(v)}
                    onClose={() => setThemeOpen(false)}
                />
            )}
        </>
    )
}

const common = css`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
`

const Wrapper = styled.div`
    ${common};
    gap: 28px;
`

const ItemWrapper = styled.div`
    ${common}
    gap:12px;
`
