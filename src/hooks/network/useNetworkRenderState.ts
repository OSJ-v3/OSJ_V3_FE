import { useMemo, useRef, useEffect } from "react"
import type { NetworkStatus } from "../../stores"

interface Params {
    status: NetworkStatus
    loading: boolean
    showSkeleton: boolean
}

export function useNetworkRenderState({
    status,
    loading,
    showSkeleton,
}: Params) {
    const hasLoadedOnce = useRef(false)

    useEffect(() => {
        if (!loading) {
            hasLoadedOnce.current = true
        }
    }, [loading])

    return useMemo<"skeleton" | "error" | "content">(() => {
        if (!hasLoadedOnce.current) {
            return "skeleton"
        }

        if (loading) {
            return showSkeleton ? "skeleton" : "content"
        }

        if (status === "offline") {
            return "error"
        }

        return "content"
    }, [status, loading, showSkeleton])
}
