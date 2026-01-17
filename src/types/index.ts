export interface DeviceData {
  id: number;
  type: "WASH" | "DRY";
  state: 0 | 1 | 2 | 3 | "skeleton";
}

export interface DeviceState {
  id: number;
  state: 0 | 1 | 2 | 3;
}

export interface LayoutCell {
  type: "empty" | "single" | "pair";
  device?: {
    id: number;
    deviceType: "WASH" | "DRY";
  };
  devices?: Array<{
    id: number;
    deviceType: "WASH" | "DRY";
  }>;
}

export interface AlarmDevice {
  id: number;
  type: "WASH" | "DRY";
}

export interface PushAlertRequest {
  id: number;
  token: string;
  expect_state: number;
}

export interface PushAlertResponse {
  id: number;
  expect_state: number;
}

export interface DeletePushAlertRequest {
  id: number;
  token: string;
}

// FCM 알림 데이터
export interface FCMNotificationData {
  device_id: string;
  state: string;
  prevAt: string;
  now: string;
}

// ============= 기타 =============
export type ColorKey = string;
