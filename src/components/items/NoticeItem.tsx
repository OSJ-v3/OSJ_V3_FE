import styled, { useTheme } from "styled-components"
import { MessageIcon } from "../../assets/icons/message"
import { Text } from "../common/Text"

interface Props {
    title: string
    date: string
    readed?: boolean
    onClick?: () => void
}

export function NoticeItem({ title, date, readed = false, onClick }: Props) {
    const theme = useTheme()

    return (
        <>
            <Wrapper onClick={onClick}>
                <ContentWrapper>
                    <MessageIcon color={theme.colors.Main.Primary} />
                    <TitleWrapper>
                        <Text font={"subTitle2"} color="System.InverseSurface">
                            {title}
                        </Text>
                        <Text font={"label"} color="Gray.SurfaceContainer">
                            {date.slice(0, 10)}
                        </Text>
                    </TitleWrapper>
                </ContentWrapper>

                <Text font={"body3"} color={"Gray.OnSecondary"}>
                    {readed ? "읽음" : ""}
                </Text>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ContentWrapper = styled.div`
    display: flex;
    align-items: start;
    gap: 24px;
`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
