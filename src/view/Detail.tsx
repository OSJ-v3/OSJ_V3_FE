import { useNavigate, useParams } from "react-router-dom"
import styled, { css } from "styled-components"
import { Header, Spinner, Text } from "../components"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useNoticeDetail } from "../apis/notice"
import { useEffect } from "react"
import { useNoticeReadStore } from "../stores/useNoticeReadStore"

export default function Detail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const noticeId = Number(id)

    const { data, isLoading, error } = useNoticeDetail(noticeId)

    const markAsRead = useNoticeReadStore((s) => s.markAsRead)

    useEffect(() => {
        if (!id) return
        markAsRead(Number(id))
    }, [id])

    if (isLoading) return <Spinner />
    if (error) return <div>에러 발생</div>
    if (!data) return null

    return (
        <Wrapper>
            <Header onBack={() => navigate(-1)} />

            <Text font={"heading3"} color="System.InverseSurface">
                {data.title}
            </Text>

            <ContentWrapper>
                <Text font="button1" color="Gray.OnSecondary">
                    {data.createdAt.slice(0, 10)}
                </Text>

                <Markdown>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {data.content}
                    </ReactMarkdown>
                </Markdown>
            </ContentWrapper>
        </Wrapper>
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
