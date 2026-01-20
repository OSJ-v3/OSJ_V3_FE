import { api } from "..";
import type { PushAlertItem, PushAlertRequest } from "./type";

export const createPushAlert = (data: PushAlertRequest) =>
  api.post("/push-alerts", data);

export const deletePushAlert = (data: Omit<PushAlertRequest, "expectState">) =>
  api.delete("/push-alerts", { data });

export const getPushAlertList = (token: string) =>
  api.get<PushAlertItem[]>(`/push-alerts/list?token=${token}`);
