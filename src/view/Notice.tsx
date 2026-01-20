import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Header, Spinner, NoticeItem } from "../components"
import { useNotices } from "../apis/notice"
import { useNoticeReadStore } from "../stores/useNoticeReadStore"

export function Notice() {
    const navigate = useNavigate()
    const { data, isLoading, error } = useNotices()
    const isRead = useNoticeReadStore((s) => s.isRead)

    if (isLoading) return <Spinner />
    if (error) return <div>에러 발생</div>

    return (
        <Wrapper>
            <Header title="공지사항" />

            {data?.map((v) => (
                <NoticeItem
                    key={v.id}
                    title={v.title}
                    date={v.createdAt}
                    readed={isRead(v.id)}
                    onClick={() => navigate(`/notice/${v.id}`)}
                />
            ))}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 28px;
`
