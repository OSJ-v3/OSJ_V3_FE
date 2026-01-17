import { api } from "../index";

export interface PushAlertRequest {
  id: number;
  token: string;
  expectState: number;
}

export interface PushAlertItem {
  id: number;
  deviceId: number;
  expectState: number;
}

export const createPushAlert = async (data: PushAlertRequest) => {
  const res = await api.post("/push-alerts", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const deletePushAlert = async (data: PushAlertRequest) => {
  const res = await api.delete("/push-alerts", {
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const getPushAlertList = async (token: string) => {
  const res = await api.get("/push-alerts/list", {
    params: { token },
  });

  return res.data;
};
