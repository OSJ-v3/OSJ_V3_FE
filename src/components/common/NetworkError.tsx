import styled, { useTheme } from "styled-components"
import { Text } from "./Text"
import { DisconnectIcon } from "../../assets/icons/disconnect"

export function NetworkError() {
    const theme = useTheme()

    return (
        <Container>
            <IconWrapper $theme={theme}>
                <DisconnectIcon fill="Gray.SurfaceContainerLow" width={120} />
            </IconWrapper>

            <Text font="heading3" color="Gray.SurfaceContainerLow">
                네트워크 연결이 끊겼습니다.
            </Text>
        </Container>
    )
}

const Container = styled.div`
    min-height: calc(100dvh - 20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
`

const IconWrapper = styled.div<{ $theme: any }>`
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.Gray.SurfaceContainerLow};
`
