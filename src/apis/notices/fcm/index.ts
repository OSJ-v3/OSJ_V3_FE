import { api } from "../..";
export interface NoticePushAlertResponse {
  isSubscribed: boolean;
}

export const getNoticePushAlert = async (token: string) => {
  if (!token) {
    throw new Error("FCM 토큰 필요함");
  }

  alert(`공지 알림 상태 조회\n\n토큰: ${token.substring(0, 30)}...`);

  try {
    const res = await api.get<{ is_subscribed: boolean }>(
      `/notices/push-alerts`,
      {
        params: { token },
      }
    );

    alert(
      `공지 알림 상태 조회 성공\n\n서버 응답: ${JSON.stringify(
        res.data
      )}\nis_subscribed: ${res.data.is_subscribed}`
    );

    const result: NoticePushAlertResponse = {
      isSubscribed: res.data.is_subscribed,
    };

    alert(`변환 완료\n\nisSubscribed: ${result.isSubscribed}`);

    return result;
  } catch (error: any) {
    alert(
      `공지 알림 상태 조회 실패ㅠㅜ\n\nStatus: ${
        error.response?.status
      }\nData: ${JSON.stringify(error.response?.data)}`
    );
    throw error;
  }
};

export const subscribeNoticePushAlert = async (token: string) => {
  if (!token) {
    throw new Error("FCM token 필요");
  }

  alert(`공지 알림 구독 요청\n\n토큰: ${token.substring(0, 30)}...`);

  try {
    const res = await api.post(`/notices/push-alerts`, null, {
      params: { token },
    });

    alert(`공지 알림 구독 성공!`);
    return res.data;
  } catch (error: any) {
    alert(
      `공지 알림 구독 실패ㅠ\n\nStatus: ${error.response?.status}\nMessage: ${error.message}`
    );
    throw error;
  }
};

export const unsubscribeNoticePushAlert = async (token: string) => {
  if (!token) {
    throw new Error("FCM token 팔요");
  }

  alert(`공지 알림 구독 해제 요청\n\n토큰: ${token.substring(0, 30)}...`);

  try {
    const res = await api.delete(`/notices/push-alerts`, {
      params: { token },
    });

    alert(`공지 알림 구독 해제 성공!`);
    return res.data;
  } catch (error: any) {
    alert(
      `공지 알림 구독 해제 실패\n\nStatus: ${error.response?.status}\nMessage: ${error.message}`
    );
    throw error;
  }
};
