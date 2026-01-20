import { api } from "..";
import type { InquiryRequest } from "./types";

export const postInquiry = async (data: InquiryRequest): Promise<void> => {
  await api.post("/inquiry", data);
};
