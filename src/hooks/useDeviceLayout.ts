import { useEffect, useState, useRef } from "react"

interface LayoutCell {
    row: number
    col: number
    device?: {
        id: number
        type: "WASH" | "DRY"
    }
}

interface LayoutZone {
    rows: number
    cols: number
    cells: LayoutCell[]
}

interface DeviceState {
    id: number
    state: number
}

interface DeviceData {
    id: number
    type: string
    state: number
}

export function useDeviceLayout(token: string) {
    const [layout, setLayout] = useState<LayoutZone | null>(null)
    const [states, setStates] = useState<DeviceState[]>([])
    const [devices, setDevices] = useState<DeviceData[]>([])

    const layoutSocket = useRef<WebSocket | null>(null)
    const statusSocket = useRef<WebSocket | null>(null)

    const mergeLayoutAndStates = (
        layout: LayoutZone,
        states: DeviceState[]
    ) => {
        const deviceData: DeviceData[] = layout.cells
            .filter((c) => c.device)
            .map((cell) => {
                const dev = cell.device!
                const stateObj = states.find((s) => s.id === dev.id)
                return {
                    id: dev.id,
                    type: dev.type,
                    state: stateObj?.state ?? 0,
                }
            })

        return deviceData
    }

    useEffect(() => {
        const ws = new WebSocket(`나중에 api 링크 넣을 예정`)
        layoutSocket.current = ws

        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data)

            if (data.event === "layout") {
                setLayout(data.layout)
            }
        }

        return () => ws.close()
    }, [token])

    useEffect(() => {
        const ws = new WebSocket(`나중에 api 링크 넣을 예정`)
        statusSocket.current = ws

        ws.onopen = () => {
            ws.send(
                JSON.stringify({
                    event: "get-devices-status",
                    zone_id: 1,
                })
            )
        }

        ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data)

            if (data.event === "devices") {
                setStates(data.states)
            }
        }

        return () => ws.close()
    }, [token])

    useEffect(() => {
        if (layout && states.length > 0) {
            const merged = mergeLayoutAndStates(layout, states)
            setDevices(merged)
        }
    }, [layout, states])

    return {
        layout,
        devices,
        states,
        isReady: !!layout && devices.length > 0,
    }
}
