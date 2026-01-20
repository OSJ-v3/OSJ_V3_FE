export interface PushAlertRequest {
  id: number;
  token: string;
  expectState: number;
}

export interface PushAlertItem {
  id: number;
  expectState: number;
}
