import { BellIcon } from "../../../assets"
import { useNavigate } from "react-router-dom"
import styled, { useTheme } from "styled-components"

export function Notice() {
    const theme = useTheme()
    const navigate = useNavigate()

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
