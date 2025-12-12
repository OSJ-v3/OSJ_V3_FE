import styled, { css, useTheme } from "styled-components"
import { Header } from "../components/main/Header"
import { SettingItem } from "../components/items"
import { Text } from "../components/common/Text"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Moon, Settings, Sun } from "lucide-react"

export function Setting() {
    const theme = useTheme()
    const navigate = useNavigate()
    const [mode] = useState<"light" | "dark" | "system">("dark")

    return (
        <>
            <Wrapper>
                <Header title="설정" />

                <ItemWrapper>
                    <SettingItem
                        title="메인 세탁실 설정"
                        onClick={() => console.log("")}
                    >
                        <Text font={"subTitle2"} color="Main.Primary">
                            남자 기숙사측
                        </Text>
                    </SettingItem>

                    <SettingItem
                        title="알림음 설정"
                        onClick={() => console.log("")}
                    />

                    <SettingItem
                        title="모드 설정"
                        onClick={() => console.log("")}
                    >
                        <div style={{ color: theme.colors.Main.Primary }}>
                            {mode == "system" ? (
                                <Settings width={20} />
                            ) : mode == "light" ? (
                                <Sun width={20} />
                            ) : (
                                <Moon width={20} />
                            )}
                        </div>
                    </SettingItem>

                    <SettingItem
                        title="문의하기"
                        onClick={() => navigate("/complain")}
                    />
                </ItemWrapper>
            </Wrapper>
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
