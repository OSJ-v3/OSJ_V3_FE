import { useEffect, useRef, useState } from "react"

export function useMinSkeleton(isLoading: boolean, minMs = 1000) {
    const [show, setShow] = useState<boolean>(false)
    const startRef = useRef<number | null>(null)
    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        if (isLoading) {
            setShow(true)
            startRef.current = Date.now()
        } else {
            const started = startRef.current ?? Date.now()
            const elapsed = Date.now() - started
            const remaining = Math.max(0, minMs - elapsed)

            if (remaining > 0) {
                timeoutRef.current = window.setTimeout(() => {
                    setShow(false)
                    startRef.current = null
                    timeoutRef.current = null
                }, remaining)
            } else {
                setShow(false)
                startRef.current = null
            }
        }

        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [isLoading, minMs])

    return show
}
