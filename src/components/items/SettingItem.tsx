import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { Text } from "../common/Text"
import styled, { useTheme } from "styled-components"

interface Props {
    title: string
    children?: ReactNode
    onClick: () => void
}

export function SettingItem({ title, children, onClick }: Props) {
    const theme = useTheme()

    return (
        <>
            <Wrapper>
                <Text font={"subTitle2"} color="System.InverseSurface">
                    {title}
                </Text>

                <RightWrapper>
                    {children}

                    <ChevronRight
                        width={24}
                        onClick={onClick}
                        color={theme.colors.Gray.SurfaceTint}
                    />
                </RightWrapper>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
`

const RightWrapper = styled.div`
    display: flex;
    gap: 8px;
`
