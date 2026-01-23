import { useEffect, useRef } from "react"
import {
    requestPermissionAndSyncToken,
    listenForegroundMessage,
} from "../firebase/fcm"
import { useRegisterNoticePush } from "../apis/notice"

export function useInitNoticePush() {
    const registerMutation = useRegisterNoticePush()
    const requestedRef = useRef(false)

    useEffect(() => {
        if (requestedRef.current) return
        requestedRef.current = true

        if (!("Notification" in window)) return

        requestPermissionAndSyncToken(async (token) => {
            await registerMutation.mutateAsync(token)
        })

        const unsubscribe = listenForegroundMessage()

        return () => unsubscribe?.()
    }, [registerMutation])
}
