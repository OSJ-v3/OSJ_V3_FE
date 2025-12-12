import { useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import { Header } from "../components/main/Header"
import { Text } from "../components/common/Text"

export function Detail() {
    const { id } = useParams()

    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(+today.getDate() + Number(id)).padStart(2, "0")

    const formattedDate = `${year}-${month}-${day}`
    console.log(formattedDate)

    return (
        <>
            <Wrapper>
                <Header />

                <Text font={"heading3"} color="System.InverseSurface">
                    {id}번 공지 제목입니다
                </Text>

                <ContentWrapper>
                    <Text font={"button1"} color="Gray.OnSecondary">
                        {formattedDate}
                    </Text>
                    <Text font={"body1"} color="Gray.SurfaceContainerHigh">
                        오상진 선생님의 차량인 카니발의 연비가 잘 나온다는
                        소식입니다.오상진 선생님의 차량인 카니발의 연비가 잘
                        나온다는 소식입니다.오상진 선생님의 차량인 카니발의
                        연비가 잘 나온다는 소식입니다.오상진 선생님의 차량인
                        카니발의 연비가 잘 나온다는 소식입니다.오상진 선생님의
                        차량인 카니발의 연비가 잘 나온다는 소식입니다.
                    </Text>
                </ContentWrapper>
            </Wrapper>
        </>
    )
}

const common = css`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
`

const Wrapper = styled.div`
    ${common};
    gap: 12px;
`

const ContentWrapper = styled.div`
    ${common}
    gap: 24px;
`
