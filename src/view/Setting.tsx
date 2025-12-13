import styled, { css, useTheme } from "styled-components"
import { Header } from "../components/main/Header"
import { SettingItem } from "../components/items"
import { Text } from "../components/common/Text"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Moon, Settings, Sun } from "lucide-react"
import { useThemeStore } from "../stores/useThemeStore"
import { BottomSheet } from "../components/common/BottomSheet"
import { ModeItem } from "../components/items/ModeItem"
import { useAreaStore } from "../stores/useAreaStore"

export function Setting() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { mode, setMode } = useThemeStore()
    const [open, setOpen] = useState<boolean>(false)
    const { area, setArea } = useAreaStore()
    const [areaOpen, setAreaOpen] = useState(false)

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
                        title="메인 세탁실 설정"
                        onClick={() => setAreaOpen(true)}
                    >
                        <Text font="subTitle2" color="Main.Primary">
                            {area}
                        </Text>
                    </SettingItem>

                    <SettingItem
                        title="알림음 설정"
                        onClick={() => console.log("")}
                    />

                    <SettingItem
                        title="모드 설정"
                        onClick={() => setOpen(true)}
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

            {open && (
                <BottomSheet
                    title="화면 모드 설정"
                    caption="앱에서 보여질 모드를 선택해보세요."
                    onClose={() => setOpen(false)}
                >
                    <ModeItem
                        label="라이트 모드"
                        value="light"
                        current={mode}
                        onSelect={setMode}
                    />
                    <ModeItem
                        label="다크 모드"
                        value="dark"
                        current={mode}
                        onSelect={setMode}
                    />
                    <ModeItem
                        label="시스템 모드"
                        value="system"
                        current={mode}
                        onSelect={setMode}
                    />
                </BottomSheet>
            )}

            {areaOpen && (
                <BottomSheet
                    title="메인 세탁실 설정"
                    caption="기본으로 보여질 세탁실을 선택하세요."
                    onClose={() => setAreaOpen(false)}
                >
                    <ModeItem
                        label="남자 학교측"
                        value="남자 학교측"
                        current={area}
                        onSelect={(v) => setArea(v)}
                    />
                    <ModeItem
                        label="남자 기숙사측"
                        value="남자 기숙사측"
                        current={area}
                        onSelect={(v) => setArea(v)}
                    />
                    <ModeItem
                        label="여자"
                        value="여자"
                        current={area}
                        onSelect={(v) => setArea(v)}
                    />
                </BottomSheet>
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
