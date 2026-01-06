import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header, NoticeItem } from "../components";
import { useNotices } from "../hooks/useNotices";
import { useNoticeReadStore } from "../stores/useNoticeReadStore";
import { useNoticeAlarmStore } from "../stores/noticeAlarmStore";
import { useEffect } from "react";

export function Notice() {
  const navigate = useNavigate();
  const { data, isLoading } = useNotices();
  const { isRead } = useNoticeReadStore();
  const { isSubscribed } = useNoticeAlarmStore();

  useEffect(() => {
    if (
      !isLoading &&
      Notification.permission === "granted" &&
      isSubscribed === false
    ) {
      alert("공지 알림을 켜라.");
    }
  }, [isSubscribed, isLoading]);

  if (isLoading) {
    return (
      <Wrapper>
        <Header title="공지사항" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header title="공지사항" />

      {data?.map((notice) => (
        <NoticeItem
          key={notice.id}
          title={notice.title}
          date={notice.createdAt}
          readed={isRead(String(notice.id))}
          onClick={() => navigate(`/notice/${notice.id}`)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 28px;
`;
