import { useEffect, useRef } from "react"
import { requestPermissionAndSyncToken } from "../firebase/fcm"
import { useRegisterNoticePush } from "../apis/notice"

export function useInitNoticePush() {
    const registerMutation = useRegisterNoticePush()
    const requestedRef = useRef(false)

    useEffect(() => {
        if (requestedRef.current) return
        requestedRef.current = true

        if (!("Notification" in window)) return

        requestPermissionAndSyncToken(async (token) => {
            registerMutation.mutate(token)
        })
    }, [])
}
