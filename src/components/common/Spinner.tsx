import styled, { keyframes } from "styled-components"

export function Spinner() {
    return (
        <FullPageSpinner>
            <Wrapper>
                <Circle />
            </Wrapper>
        </FullPageSpinner>
    )
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const FullPageSpinner = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
`

const Circle = styled.div`
    width: 32px;
    height: 32px;
    border: 3px solid ${({ theme }) => theme.colors.Gray.Secondary};
    border-top: 3px solid ${({ theme }) => theme.colors.Main.Primary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`
