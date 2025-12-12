import styled, { useTheme } from "styled-components"
import { LaundryTabSwitch } from "./tapbar/LaundryTabSwitch"
import { Notice } from "./tapbar/Notice"
import { SettingIcon } from "../../assets/icons/setting"
import { useNavigate } from "react-router-dom"

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
        <HeaderWrapper>
            <LaundryTabSwitch value={value} onChange={onChange} />

            <RightButtons>
                <Notice />
                <SettingIcon
                    onClick={() => navigate("/setting")}
                    color={theme.colors.Gray.OnSecondary}
                />
            </RightButtons>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    width: 100%;
    height: 57px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const RightButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`
