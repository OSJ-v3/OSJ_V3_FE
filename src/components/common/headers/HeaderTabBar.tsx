import { useNavigate } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { SettingIcon } from "../../../assets"
import { LaundryTabSwitch, Notice } from ".."
import { useCallback } from "react"

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

    const goSetting = useCallback(() => {
        navigate("/setting")
    }, [navigate])

    return (
        <HeaderWrapper as="header" aria-label="상단 탭 및 설정 영역">
            <LaundryTabSwitch value={value} onChange={onChange} />

            <RightButtons>
                <Notice />

                <IconButton
                    type="button"
                    aria-label="설정 화면으로 이동"
                    onClick={goSetting}
                >
                    <SettingIcon
                        role="button"
                        aria-label="설정"
                        tabIndex={0}
                        color={theme.colors.Gray.OnSecondary}
                    />
                </IconButton>
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

const IconButton = styled.button`
    all: unset;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.Main.Primary};
        outline-offset: 2px;
    }

    &:active {
        opacity: 0.7;
    }
`
