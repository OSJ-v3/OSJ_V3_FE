import { useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import { Header, Text } from "../components"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function Detail() {
    const { id } = useParams()

    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(+today.getDate() + Number(id)).padStart(2, "0")

    const formattedDate = `${year}-${month}-${day}`

    const content = `
## 공지 안내

**오상진 선생님의 차량인 카니발**의  
연비가 잘 나온다는 소식입니다.

- 연비 향상
- 주행 안정성 개선
- 유지비 절감

> 많은 관심 부탁드립니다.
`

    return (
        <>
            <Wrapper>
                <Header />

                <Text font={"heading3"} color="System.InverseSurface">
                    {id}번 공지 제목입니다
                </Text>

                <ContentWrapper>
                    <Text font="button1" color="Gray.OnSecondary">
                        {formattedDate}
                    </Text>

                    <Markdown>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </Markdown>
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

const Markdown = styled.div`
    color: ${({ theme }) => theme.colors.System.InverseSurface};
    font-size: 15px;
    line-height: 1.6;

    h1,
    h2,
    h3 {
        margin: 16px 0 8px;
        font-weight: 700;
    }

    p {
        margin: 0;
        white-space: pre-line;
    }

    ul {
        padding-left: 20px;
    }

    li {
        margin-bottom: 6px;
    }

    blockquote {
        margin: 12px 0;
        padding-left: 12px;
        background-color: ${({ theme }) => theme.colors.Gray.Secondary};
        border-left: 3px solid
            ${({ theme }) => theme.colors.Gray.SurfaceContainerLowest};
        color: ${({ theme }) => theme.colors.System.InverseSurface};
    }

    strong {
        font-weight: 700;
    }
`
