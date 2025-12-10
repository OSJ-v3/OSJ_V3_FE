import type React from "react"
import styled from "styled-components"

interface IProps {
    children: React.ReactNode
}

export function AppLayout({ children }: IProps) {
    return (
        <Container>
            <AppScreen>
                <Display>{children}</Display>
            </AppScreen>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.Surface};
    display: flex;
    justify-content: center;
`

const AppScreen = styled.div`
    width: 100%;
    max-width: 600px;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.Surface};
    overflow-x: hidden;

    padding-bottom: env(safe-area-inset-bottom);

    display: flex;
    justify-content: center;
    align-items: center;
`

const Display = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
