import { css, styled } from "styled-components"
import { Header, Input, Button, Dropdown } from "../components"
import { useState } from "react"

export function Complain() {
    const complainOptions: {
        label: string
        value: "BUG" | "IMPROVEMENT" | "ETC"
    }[] = [
        { label: "버그제보", value: "BUG" },
        { label: "개선요청", value: "IMPROVEMENT" },
        { label: "기타사항", value: "ETC" },
    ]

    const [option, setOption] = useState<
        "BUG" | "IMPROVEMENT" | "ETC" | undefined
    >(undefined)

    return (
        <>
            <Wrapper>
                <Header title="문의하기" />

                <InputWrapper>
                    <Dropdown
                        label="문의사항"
                        placeholder="문의 사항을 선택해주세요"
                        options={complainOptions}
                        value={option}
                        onChange={setOption}
                    />
                    <Input
                        label="제목"
                        placeholder="문의 제목을 입력해주세요"
                    />
                    <Input
                        label="상세내용"
                        variant="textarea"
                        placeholder="상세 문의 내용을 입력해주세요"
                    />
                    <Button>제출하기</Button>
                </InputWrapper>
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
    gap: 28px;
`

const InputWrapper = styled.div`
    ${common}
    gap:20px;
`
