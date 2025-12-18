import { css, styled } from "styled-components";
import { Header, Input, Button, Dropdown } from "../components";
import { useState } from "react";
import { useCreateInquiry } from "../hooks/useCreateInquiry";

export function Complain() {
  const complainOptions: {
    label: string;
    value: "BUG" | "IMPROVEMENT" | "ETC";
  }[] = [
    { label: "버그제보", value: "BUG" },
    { label: "개선요청", value: "IMPROVEMENT" },
    { label: "기타사항", value: "ETC" },
  ];

  const [option, setOption] = useState<
    "BUG" | "IMPROVEMENT" | "ETC" | undefined
  >(undefined);

  const { mutate, isPending } = useCreateInquiry();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!option || !title.trim() || !content.trim()) {
      console.log("입력값 누락");
      return;
    }

    mutate({ title, content, category: option });
  };

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
            onChange={(value) => {
              setOption(value);
              console.log("문의사항(category):", value);
            }}
          />
          <Input
            label="제목"
            placeholder="문의 제목을 입력해주세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              console.log("제목(title):", e.target.value);
            }}
          />
          <Input
            label="상세내용"
            variant="textarea"
            placeholder="상세 문의 내용을 입력해주세요"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              console.log("내용(title):", e.target.value);
            }}
          />
          <Button onClick={handleSubmit} disabled={isPending}>
            제출하기
          </Button>
        </InputWrapper>
      </Wrapper>
    </>
  );
}

const common = css`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
`;

const Wrapper = styled.div`
  ${common};
  gap: 28px;
`;

const InputWrapper = styled.div`
  ${common}
  gap:20px;
`;
