import { useMemo } from "react"
import type { NetworkStatus } from "../stores"

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
    return useMemo<"idle" | "skeleton" | "error" | "content">(() => {
        if (status === "offline") return "error"

        if (status === "connecting") {
            if (!loading || !showSkeleton) return "idle"
            return "skeleton"
        }

        return "content"
    }, [status, loading, showSkeleton])
}
