export interface NoticeResponse {
    id: number
    title: string
    content: string
    createdAt: string
}

export interface NoticeAlertRequest {
    isSubscribed: boolean
}
