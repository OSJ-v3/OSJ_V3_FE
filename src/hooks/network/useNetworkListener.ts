import { useEffect } from "react"
import { useNetworkStore } from "../../stores"

const SOCKET_URL = import.meta.env.VITE_WS_BASE_URL
const TIMEOUT = 3000

export function useNetworkListener() {
    const status = useNetworkStore((s) => s.status)
    const setStatus = useNetworkStore((s) => s.setStatus)

    useEffect(() => {
        let mounted = true
        let ws: WebSocket | null = null

        if (status === "connecting") {
            // 이미 초기 상태면 굳이 다시 안 바꿈. 비워둔 코드
        } else if (!status) {
            setStatus("connecting")
        }

        const update = () => {
            ws = new WebSocket(SOCKET_URL)

            const timer = setTimeout(() => {
                if (!mounted) return
                ws?.close()

                if (status === "connecting") {
                    setStatus("offline")
                }
            }, TIMEOUT)

            ws.onopen = () => {
                if (!mounted) return
                clearTimeout(timer)
                setStatus("online")
            }

            ws.onerror = () => {
                if (!mounted) return
                clearTimeout(timer)
                setStatus("offline")
            }
        }

        update()
        const interval = setInterval(update, 5000)

        return () => {
            mounted = false
            ws?.close()
            clearInterval(interval)
        }
    }, [setStatus, status])
}
