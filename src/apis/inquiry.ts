import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { instance } from "."

interface InquiryRequest {
    title: string
    content: string
    category: "BUG" | "IMPROVEMENT" | "ETC"
}

export const useInquiry = () => {
    return useMutation<number, AxiosError, InquiryRequest>({
        mutationFn: async (data) => {
            const res = await instance.post("/inquiry", data)
            return res.status
        },
    })
}
