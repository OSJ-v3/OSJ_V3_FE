import { useEffect, useRef } from "react"
import { useRegisterNoticePush } from "../../apis/notice"
import { requestPermissionAndGetToken } from "../../firebase"

const FCM_SYNCED_KEY = "fcm_notice_synced"

export function useInitFCMNoticePush() {
    const registerNoticePush = useRegisterNoticePush()
    const syncingRef = useRef(false)

    useEffect(() => {
        const init = async () => {
            if (syncingRef.current) return
            syncingRef.current = true

            const token = await requestPermissionAndGetToken()
            if (!token) return

            const synced = localStorage.getItem(FCM_SYNCED_KEY)
            if (synced === "true") return

            try {
                await registerNoticePush.mutateAsync(token)
                localStorage.setItem(FCM_SYNCED_KEY, "true")
            } catch (err: any) {
                if (err?.response?.status === 409) {
                    localStorage.setItem(FCM_SYNCED_KEY, "true")
                    return
                }

                console.error("❌ notice push register failed", err)
            }
        }

        init()
    }, [])
}
