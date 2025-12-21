import { useMutation } from "@tanstack/react-query";
import { postInquiry } from "../apis/inquiry";
import type { InquiryRequest } from "../apis/inquiry/types";
import { getApiErrorMessage } from "../utils/apiError";

export const useCreateInquiry = () => {
  return useMutation({
    mutationFn: (data: InquiryRequest) => postInquiry(data),

    onSuccess: () => {
      console.log("문의 등록 성공");
    },

    onError: (error) => {
      const message = getApiErrorMessage(error);
      console.error(message);
    },
  });
};
