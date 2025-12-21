import { api } from "../index";
import type { NoticesResponse } from "./types";
import { MOCK_NOTICES } from "./mockData";
import { getMockNoticeById } from "./mockData";

export const getNotices = async (): Promise<NoticesResponse[]> => {
  const res = await api.get("/notices");

  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (Array.isArray(res.data.data)) {
    return res.data.data;
  }

  return [];
};
/* export const getNotices = async (): Promise<NoticesResponse[]> => {
  return MOCK_NOTICES;
}; */

export const getNoticeDetail = async (id: string): Promise<NoticesResponse> => {
  const res = await api.get<NoticesResponse>(`/notices/${id}`);
  return res.data;
};

/* export const getNoticeDetail = async (id: string): Promise<NoticesResponse> => {
  const notice = getMockNoticeById(Number(id));

  if (!notice) {
    throw new Error("공지 없음");
  }

  return notice;
};
 */
