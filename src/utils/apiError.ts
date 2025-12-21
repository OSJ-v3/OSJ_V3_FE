import { AxiosError } from "axios";

export const getApiErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as any)?.message ??
      "요청 처리 중 오류가 발생했습니다."
    );
  }
  return "알 수 없는 오류가 발생했습니다.";
};
