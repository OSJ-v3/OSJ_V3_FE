import { useNavigate } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { SettingIcon } from "../../../assets"
import { LaundryTabSwitch, Notice } from ".."

type Option = "mine" | "status"

export function HeaderTabBar({
    value,
    onChange,
}: {
    value: Option
    onChange: (v: Option) => void
}) {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <HeaderWrapper role="navigation" aria-label="메인 상단 메뉴">
            <TabArea role="tablist" aria-label="세탁기 상태 탭">
                <LaundryTabSwitch value={value} onChange={onChange} />
            </TabArea>

            <RightButtons>
                <Notice />

                <IconButton
                    type="button"
                    aria-label="설정 화면으로 이동"
                    onClick={() => navigate("/setting")}
                >
                    <SettingIcon
                        color={theme.colors.Gray.OnSecondary}
                        aria-hidden="true"
                    />
                </IconButton>
            </RightButtons>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
    width: 100%;
    height: 57px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TabArea = styled.div`
    display: flex;
    align-items: center;
`

const RightButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`

const IconButton = styled.button`
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.Main.Primary};
        outline-offset: 4px;
        border-radius: 6px;
    }
`
