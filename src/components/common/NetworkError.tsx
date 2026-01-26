import styled, { useTheme } from "styled-components"
import { DisconnectIcon } from "../../assets"
import { Text } from "./Text"

export function NetworkError() {
    const theme = useTheme()

    return (
        <Container>
            <IconWrapper $theme={theme}>
                <DisconnectIcon fill="Gray.SurfaceContainerLow" width={100} />
            </IconWrapper>

            <Text font="body1" color="Gray.SurfaceContainerLow">
                네트워크 연결이 끊겼습니다.
            </Text>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 36px;
`

const IconWrapper = styled.div<{ $theme: any }>`
    opacity: 0.6;
    color: ${({ theme }) => theme.colors.Gray.SurfaceContainerLow};
`
