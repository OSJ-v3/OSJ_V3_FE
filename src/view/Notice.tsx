import styled from "styled-components"
import { Header } from "../components/main/Header"
import { NotcieItem } from "../components/items"
import { useNavigate } from "react-router-dom"

export function Notice() {
    const navigate = useNavigate()

    const notifications = [
        {
            id: 0,
            title: "공지사항입니다.",
            date: "2025-10-12",
            readed: true,
        },
        {
            id: 1,
            title: "공지사항입니다.",
            date: "2025-12-11",
            readed: false,
        },
        {
            id: 2,
            title: "공지사항입니다.",
            date: "2025-12-14",
            readed: true,
        },
    ]

    return (
        <>
            <Wrapper>
                <Header title="공지사항" />

                {notifications &&
                    notifications.map((v, i) => (
                        <NotcieItem
                            key={i}
                            title={v.title}
                            date={v.date}
                            readed={v.readed}
                            onClick={() => navigate(`/notice/${v.id}`)}
                        />
                    ))}
            </Wrapper>
        </>
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
