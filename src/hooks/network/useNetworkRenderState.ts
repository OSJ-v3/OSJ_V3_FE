import { useMemo, useState, useEffect } from "react"
import type { NetworkStatus } from "../../stores"

interface Params {
    status: NetworkStatus
    loading: boolean
    showSkeleton: boolean
}

export function useNetworkRenderState({ status, loading, showSkeleton }: Params) {
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

    useEffect(() => {
        if (!loading && !hasLoadedOnce) {
            setHasLoadedOnce(true)
        }
    }, [loading, hasLoadedOnce])

    return useMemo<"skeleton" | "error" | "content">(() => {
        if (!hasLoadedOnce) {
            return "skeleton"
        }

        if (loading) {
            return showSkeleton ? "skeleton" : "content"
        }

        if (status === "offline") {
            return "error"
        }

        return "content"
    }, [status, loading, showSkeleton, hasLoadedOnce])
}
