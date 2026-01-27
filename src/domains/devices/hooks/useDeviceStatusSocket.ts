import { useEffect, useRef, useState } from "react"
import { useNetworkStore } from "../../../stores"
import type { DeviceState } from "../types"

type SocketStatus = "connecting" | "connected" | "error"

const SOCKET_URL = import.meta.env.VITE_WS_BASE_URL

function isDeviceState(v: any): v is DeviceState["state"] {
    return v === 0 || v === 1 || v === 2 || v === 3
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

                const apply = (id: number, state: DeviceState["state"]) => {
                    if (map.get(id) !== state) {
                        map.set(id, state)
                        changed = true
                    }
                }

                if (Array.isArray(data)) {
                    for (const d of data) {
                        if (
                            typeof d?.id === "number" &&
                            isDeviceState(d.state)
                        ) {
                            apply(d.id, d.state)
                        }
                    }
                } else if (
                    typeof data?.id === "number" &&
                    isDeviceState(data.state)
                ) {
                    apply(data.id, data.state)
                }

                if (changed) {
                    setVersion((v) => v + 1)
                }
            } catch {
                /* ignore */
            }
        }

        ws.onerror = ws.onclose = () => setStatus("error")

        return () => ws.close()
    }, [networkStatus])

    useEffect(() => {
        const handler = (e: CustomEvent<{ id: number }>) => {
            const map = stateMapRef.current
            if (map.get(e.detail.id) !== 0) {
                map.set(e.detail.id, 0)
                setVersion((v) => v + 1)
            }
        }

        window.addEventListener("device-finished", handler as EventListener)
        return () =>
            window.removeEventListener(
                "device-finished",
                handler as EventListener,
            )
    }, [])

    return {
        stateMap: stateMapRef.current,
        version, // 렌더 트리거용
        ready: status === "connected",
        loading: status === "connecting",
        error: status === "error",
    }
}
