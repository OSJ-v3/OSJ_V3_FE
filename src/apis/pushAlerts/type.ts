import { api } from "../index";

export interface PushAlertRequest {
  id: number;
  token: string;
  expect_state: number;
}

export interface PushAlertItem {
  id: number;
  deviceId: number;
  expect_state: number;
}
