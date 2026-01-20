import { css, styled } from "styled-components"
import { Header, Input, Button, Dropdown } from "../components"
import { useState } from "react"
import { useInquiry } from "../apis/inquiry"
import { useToastContext } from "../contexts"
import { useNavigate } from "react-router-dom"

type Category = "BUG" | "IMPROVEMENT" | "ETC"

export function Complain() {
    const { showToast } = useToastContext()
    const navigate = useNavigate()

    const complainOptions: { label: string; value: Category }[] = [
        { label: "버그제보", value: "BUG" },
        { label: "개선요청", value: "IMPROVEMENT" },
        { label: "기타사항", value: "ETC" },
    ]

    const [category, setCategory] = useState<Category | undefined>(undefined)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const { mutate, isPending } = useInquiry()

    const onSubmit = () => {
        if (!category) return showToast("문의 유형을 선택해주세요.", "error")
        if (!title.trim()) return showToast("제목을 입력해주세요.", "error")
        if (!content.trim()) return showToast("내용을 입력해주세요.", "error")

        mutate(
            {
                title,
                content,
                category,
            },
            {
                onSuccess: () => {
                    showToast("문의가 접수되었습니다.", "success")
                    setTitle("")
                    setContent("")
                    setCategory(undefined)
                    navigate(-1)
                },
                onError: () => {
                    showToast("문의 접수에 실패했습니다.", "error")
                },
            },
        )
    }

    return (
        <Wrapper>
            <Header title="문의하기" />

            <InputWrapper>
                <Dropdown
                    label="문의사항"
                    placeholder="문의 사항을 선택해주세요"
                    options={complainOptions}
                    value={category}
                    onChange={setCategory}
                />

                <Input
                    label="제목"
                    placeholder="문의 제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    label="상세내용"
                    variant="textarea"
                    placeholder="상세 문의 내용을 입력해주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <Button onClick={onSubmit} disabled={isPending}>
                    {isPending ? "전송 중..." : "제출하기"}
                </Button>
            </InputWrapper>
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
    gap: 28px;
`

const InputWrapper = styled.div`
    ${common};
    gap: 20px;
`
