import { useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { instance } from ".."
import type { NoticeResponse } from "./type"

export const useNotices = () => {
    return useQuery<NoticeResponse[], AxiosError>({
        queryKey: ["notices"],
        queryFn: async () => {
            const res = await instance.get("/notices")
            return res.data
        },
    })
}

export const useNoticeDetail = (id: number) => {
    return useQuery<NoticeResponse, AxiosError>({
        queryKey: ["notices", id],
        queryFn: async () => {
            const res = await instance.get(`/notices/${id}`)
            return res.data
        },
        enabled: !!id,
    })
}
