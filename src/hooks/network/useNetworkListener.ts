import { useEffect, useRef } from "react"
import { useNetworkStore } from "../../stores"

const SOCKET_URL = import.meta.env.VITE_WS_BASE_URL
const TIMEOUT = 3000
const INTERVAL = 5000

export function useNetworkListener() {
    const setStatus = useNetworkStore((s) => s.setStatus)
    const getStatus = useNetworkStore.getState

    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        let mounted = true
        let intervalId: number

        const connect = () => {
            if (!mounted) return

            wsRef.current?.close()

            const ws = new WebSocket(SOCKET_URL)
            wsRef.current = ws

            const timer = setTimeout(() => {
                if (!mounted) return
                ws.close()

                if (getStatus().status === "connecting") {
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

        const id = requestIdleCallback(() => {
            setStatus("connecting")
            connect()
            intervalId = window.setInterval(connect, INTERVAL)
        })

        return () => {
            mounted = false
            cancelIdleCallback(id)
            wsRef.current?.close()
            clearInterval(intervalId)
        }
    }, [setStatus])
}
