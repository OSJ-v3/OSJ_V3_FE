import { useEffect, useRef, useState } from "react"
import { useNetworkStore } from "../stores/useNetworkStore"

export interface DeviceState {
    id: number
    state: 0 | 1 | 2 | 3
}

type SocketStatus = "connecting" | "connected" | "error"

const SOCKET_URL = import.meta.env.VITE_WS_BASE_URL

export function useDeviceStatusSocket() {
    const networkStatus = useNetworkStore((s) => s.status)

    const [states, setStates] = useState<DeviceState[]>([])
    const [status, setStatus] = useState<SocketStatus>("connecting")
    const socketRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        const handler = (e: Event) => {
            const { id } = (e as CustomEvent<{ id: number }>).detail
            setStates((prev) =>
                prev.map((s) => (s.id === id ? { ...s, state: 0 } : s)),
            )
        }

        window.addEventListener("device-finished", handler)
        return () => {
            window.removeEventListener("device-finished", handler)
        }
    }, [])

    useEffect(() => {
        if (networkStatus === "connecting") {
            setStatus("connecting")
            return
        }

        if (networkStatus === "offline") {
            socketRef.current?.close()
            socketRef.current = null
            setStatus("error")
            setStates([])
            return
        }

        setStatus("connecting")

        const ws = new WebSocket(SOCKET_URL)
        socketRef.current = ws

        const timeout = setTimeout(() => {
            if (ws.readyState !== WebSocket.OPEN) {
                ws.close()
                setStatus("error")
            }
        }, 3000)

        ws.onopen = () => {
            clearTimeout(timeout)
            setStatus("connected")
        }

        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data)

                if (Array.isArray(data)) {
                    setStates(data)
                    return
                }

                if (typeof data?.id === "number") {
                    setStates((prev) => {
                        const map = new Map(prev.map((s) => [s.id, s.state]))
                        map.set(data.id, data.state)

                        return Array.from(map, ([id, state]) => ({
                            id,
                            state,
                        }))
                    })
                }
            } catch {}
        }

        ws.onerror = () => {
            clearTimeout(timeout)
            setStatus("error")
        }

        ws.onclose = () => {
            clearTimeout(timeout)
            setStatus("error")
        }

        return () => {
            clearTimeout(timeout)
            ws.close()
        }
    }, [networkStatus])

    useEffect(() => {
        const handler = (e: any) => {
            const { id } = e.detail

            setStates((prev) =>
                prev.map((s) => (s.id === id ? { ...s, state: 0 } : s)),
            )
        }

        window.addEventListener("device-finished", handler)
        return () => {
            window.removeEventListener("device-finished", handler)
        }
    }, [])

    return {
        states,
        status,
        ready: status === "connected",
        loading: status === "connecting",
        error: status === "error",
    }
}
