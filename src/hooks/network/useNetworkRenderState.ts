import { useMemo } from "react"
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
    return useMemo<"skeleton" | "error" | "content">(() => {
        if (status === "offline") return "error"

        if (status === "connecting" && loading) {
            return showSkeleton ? "skeleton" : "content"
        }

        return "content"
    }, [status, loading, showSkeleton])
}
