import { useEffect, useRef, useState } from "react"
import { useNetworkStore } from "../../../stores"
import type { DeviceState } from "../types"

type SocketStatus = "connecting" | "connected" | "error"

const SOCKET_URL = import.meta.env.VITE_WS_BASE_URL

function isDeviceState(value: any): value is DeviceState["state"] {
    return value === 0 || value === 1 || value === 2 || value === 3
}

export function useDeviceStatusSocket() {
    const networkStatus = useNetworkStore((s) => s.status)

    const stateMapRef = useRef<Map<number, DeviceState["state"]>>(new Map())
    const [version, setVersion] = useState(0)

    const [status, setStatus] = useState<SocketStatus>("connecting")
    const [attemptFinished, setAttemptFinished] = useState(false)

    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        if (networkStatus !== "online") {
            setStatus("connecting")
            setAttemptFinished(false)
            return
        }

        setStatus("connecting")
        setAttemptFinished(false)

        const ws = new WebSocket(SOCKET_URL)
        wsRef.current = ws

        ws.onopen = () => {
            setStatus("connected")
            setAttemptFinished(true)
        }

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data)
            let changed = false
            const map = stateMapRef.current

            const apply = (d: any) => {
                if (typeof d?.id === "number" && isDeviceState(d.state)) {
                    if (map.get(d.id) !== d.state) {
                        map.set(d.id, d.state)
                        changed = true
                    }
                }
            }

            Array.isArray(data) ? data.forEach(apply) : apply(data)

            if (changed) setVersion((v) => v + 1)
        }

        const fail = () => {
            setStatus("error")
            setAttemptFinished(true)
        }

        ws.onerror = fail
        ws.onclose = fail

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close()
            }
        }
    }, [networkStatus])

    return {
        stateMap: stateMapRef.current,
        version,

        loading: !attemptFinished,
        error: attemptFinished && status === "error",
    }
}
