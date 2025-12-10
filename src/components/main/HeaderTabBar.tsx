import styled, { useTheme } from "styled-components"
import { LaundryTabSwitch } from "./tapbar/LaundryTabSwitch"
import { Notice } from "./tapbar/Notice"
import { SettingIcon } from "../../assets/icons/setting"

type Option = "mine" | "status"

export function HeaderTabBar({
    value,
    onChange,
}: {
    value: Option
    onChange: (v: Option) => void
}) {
    const theme = useTheme()

    return (
        <HeaderWrapper>
            <LaundryTabSwitch value={value} onChange={onChange} />

            <RightButtons>
                <Notice />
                <SettingIcon color={theme.colors.Gray.OnSecondary} />
            </RightButtons>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    width: 90%;
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
