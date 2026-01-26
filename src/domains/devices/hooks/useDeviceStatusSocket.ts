import { useEffect, useRef, useState } from "react"
import { useNetworkStore } from "../../../stores"
import type { DeviceState } from "../types"

type SocketStatus = "connecting" | "connected" | "error"

const SOCKET_URL = import.meta.env.VITE_WS_BASE_URL

export function useDeviceStatusSocket() {
    const networkStatus = useNetworkStore((s) => s.status)

    const [states, setStates] = useState<DeviceState[]>([])
    const [status, setStatus] = useState<SocketStatus>("connecting")
    const socketRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        if (networkStatus !== "online") {
            socketRef.current?.close()
            socketRef.current = null
            setStates([])
            setStatus("error")
            return
        }

        const ws = new WebSocket(SOCKET_URL)
        socketRef.current = ws
        setStatus("connecting")

        ws.onopen = () => setStatus("connected")

        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data)
                setStates((prev) => normalizeDeviceStates(prev, data))
            } catch {}
        }

        ws.onerror = ws.onclose = () => {
            setStatus("error")
        }

        return () => {
            ws.close()
        }
    }, [networkStatus])

    useEffect(() => {
        const handler = (e: CustomEvent<{ id: number }>) => {
            setStates((prev) =>
                prev.map((s) =>
                    s.id === e.detail.id ? { ...s, state: 0 } : s,
                ),
            )
        }

        window.addEventListener("device-finished", handler as EventListener)
        return () =>
            window.removeEventListener(
                "device-finished",
                handler as EventListener,
            )
    }, [])

    return {
        states,
        ready: status === "connected",
        loading: status === "connecting",
        error: status === "error",
    }
}

function normalizeDeviceStates(prev: DeviceState[], data: any): DeviceState[] {
    if (Array.isArray(data)) return data

    if (typeof data?.id === "number") {
        const map = new Map(prev.map((s) => [s.id, s.state]))
        map.set(data.id, data.state)

        return Array.from(map, ([id, state]) => ({ id, state }))
    }

    return prev
}
