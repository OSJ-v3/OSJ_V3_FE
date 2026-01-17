import { api } from "../..";

export interface NoticePushAlertResponse {
  isSubscribed: boolean;
}

export const getNoticePushAlert = async (token: string) => {
  const res = await api.get<{ is_subscribed: boolean }>(
    "/notices/push-alerts",
    {
      params: { token },
    }
  );

  return {
    isSubscribed: res.data.is_subscribed,
  };
};

export const subscribeNoticePushAlert = async (token: string) => {
  const res = await api.post("/notices/push-alerts", null, {
    params: { token },
  });

  return res.data;
};

export const unsubscribeNoticePushAlert = async (token: string) => {
  const res = await api.delete("/notices/push-alerts", {
    params: { token },
  });

  return res.data;
};
