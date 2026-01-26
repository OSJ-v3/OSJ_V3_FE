import { ChevronLeft } from "lucide-react"
import styled, { useTheme } from "styled-components"
import { Text } from "../Text"

interface Props {
    title?: string
    onBack?: () => void
}

export function Header({ title, onBack }: Props) {
    const theme = useTheme()

    return (
        <Wrapper>
            <LeftArea>
                {onBack && (
                    <BackButton onClick={onBack}>
                        <ChevronLeft
                            color={theme.colors.System.InverseSurface}
                            size={24}
                        />
                    </BackButton>
                )}
            </LeftArea>

            <CenterArea>
                {title && <Text font="subTitle2">{title}</Text>}
            </CenterArea>

            <RightArea />
        </Wrapper>
    )
}

const Wrapper = styled.header`
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.Surface};
`

const LeftArea = styled.div`
    display: flex;
    justify-content: flex-start;
`

const CenterArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`

const RightArea = styled.div`
    width: 40px;
`

const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
`
