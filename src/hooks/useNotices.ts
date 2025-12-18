import { useQuery } from "@tanstack/react-query";
import { getNoticeDetail } from "../apis/notices/index.js";
import { getNotices } from "../apis/notices/index.js";

export const useNotices = () =>
  useQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
    select: (data) => (Array.isArray(data) ? data : []),
  });

export const useNoticeDetail = (id: string) =>
  useQuery({
    queryKey: ["notices", id],
    queryFn: () => getNoticeDetail(id),
    enabled: !!id,
  });
