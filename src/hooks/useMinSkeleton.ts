import { useEffect, useRef, useState } from "react"

export function useMinSkeleton(isLoading: boolean, delayMs = 500) {
    const [show, setShow] = useState(false)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        if (isLoading) {
            timerRef.current = window.setTimeout(() => {
                setShow(true)
            }, delayMs)
        } else {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
            setShow(false)
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
                timerRef.current = null
            }
        }
    }, [isLoading, delayMs])

    return show
}
