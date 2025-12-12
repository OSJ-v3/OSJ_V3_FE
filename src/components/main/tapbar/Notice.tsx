import styled, { useTheme } from "styled-components"
import { BellIcon } from "../../../assets/icons/bell"
import { useNavigate } from "react-router-dom"

export function Notice() {
    const theme = useTheme()
    const navigate = useNavigate()

    // 읽지 않은 알림 여부
    const hasUnread = true

    return (
        <BellWrapper onClick={() => navigate("/notice")}>
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
