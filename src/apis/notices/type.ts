export interface NoticesRequest {
  title: string;
  contents: string;
}

export interface NoticesResponse {
  title: string;
  contents: string;
  id: string;
  createAt: string;
}
