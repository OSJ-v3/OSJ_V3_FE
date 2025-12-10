import { useState, useCallback, useRef } from "react"
import type { ToastType } from "../components/common/Toast"

export function useToast() {
    const [toast, setToast] = useState<{
        text: string
        type: ToastType
    } | null>(null)

    const [visible, setVisible] = useState(false)

    const hideTimer = useRef<NodeJS.Timeout | null>(null)
    const removeTimer = useRef<NodeJS.Timeout | null>(null)

    const showToast = useCallback((text: string, type: ToastType) => {
        if (hideTimer.current) clearTimeout(hideTimer.current)
        if (removeTimer.current) clearTimeout(removeTimer.current)

        setToast({ text, type })
        setVisible(true)

        hideTimer.current = setTimeout(() => {
            setVisible(false)
        }, 1500)

        removeTimer.current = setTimeout(() => {
            setToast(null)
        }, 2000)
    }, [])

    return { toast, visible, showToast }
}
