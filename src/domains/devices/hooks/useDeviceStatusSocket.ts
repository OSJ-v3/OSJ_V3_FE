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

    useEffect(() => {
        if (networkStatus !== "online") {
            stateMapRef.current.clear()
            setStatus("error")
            return
        }

        const ws = new WebSocket(SOCKET_URL)
        setStatus("connecting")

        ws.onopen = () => setStatus("connected")

        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data)
                let changed = false

                const map = stateMapRef.current

                if (Array.isArray(data)) {
                    for (const d of data) {
                        if (
                            typeof d?.id === "number" &&
                            isDeviceState(d.state)
                        ) {
                            if (map.get(d.id) !== d.state) {
                                map.set(d.id, d.state)
                                changed = true
                            }
                        }
                    }
                } else if (
                    typeof data?.id === "number" &&
                    isDeviceState(data.state)
                ) {
                    if (map.get(data.id) !== data.state) {
                        map.set(data.id, data.state)
                        changed = true
                    }
                }

                if (changed) {
                    setVersion((v) => v + 1)
                }
            } catch {
                // 무시
            }
        }

        ws.onerror = ws.onclose = () => setStatus("error")

        return () => ws.close()
    }, [networkStatus])

    return {
        stateMap: stateMapRef.current,
        version, // 🔥 의존성용
        ready: status === "connected",
        loading: status === "connecting",
        error: status === "error",
    }
}
