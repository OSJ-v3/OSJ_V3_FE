import { useMutation, useQuery } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { instance } from ".."
import type { NoticeAlertRequest, NoticeResponse } from "./type"

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

export const useGetNoticePushStatus = () => {
    return useQuery<NoticeAlertRequest, AxiosError>({
        queryKey: ["noticePushStatus"],
        queryFn: async () => {
            const res = await instance.get<NoticeAlertRequest>(
                "/notices/push-alerts",
            )
            return res.data
        },
    })
}

export const useRegisterNoticePush = () => {
    return useMutation<void, AxiosError, string>({
        mutationFn: (token: string) =>
            instance.post("/notices/push-alerts", null, {
                params: { token },
            }),
    })
}
