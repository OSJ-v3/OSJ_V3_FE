import { api } from "../index";
import type { PushAlertRequest, PushAlertItem } from "./type";

export const createPushAlert = async (data: PushAlertRequest) => {
  const res = await api.post("/push-alerts", data);
  return res.data;
};

export const deletePushAlert = async (data: { id: number; token: string }) => {
  const res = await api.delete("/push-alerts", { data });
  return res.data;
};

export const getPushAlertList = async (token: string) => {
  if (!token) {
    throw new Error("FCM token is required");
  }

  console.log("알림 목록 조회 요청 - 토큰:", token.substring(0, 30) + "...");

  try {
    const res = await api.get<PushAlertItem[]>(`/push-alerts/list`, {
      params: { token },
    });

    console.log("알림 목록 조회 성공:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("알림 목록 조회 실패:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        params: error.config?.params,
      },
    });
    throw error;
  }
};
