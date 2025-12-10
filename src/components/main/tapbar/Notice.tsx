import styled, { useTheme } from "styled-components"
import { BellIcon } from "../../../assets/icons/bell"

export function Notice() {
    const theme = useTheme()

    // 읽지 않은 알림 여부 (테스트용)
    const hasUnread = true

    return (
        <BellWrapper>
            <BellIcon color={theme.colors.Gray.OnSecondary} />

            {hasUnread && <UnreadDot />}
        </BellWrapper>
    )
}

const BellWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const UnreadDot = styled.div`
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.colors.Main.Primary};
    border-radius: 50%;

    position: absolute;
    top: 0px;
    right: 0px;
`
