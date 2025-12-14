import { useEffect } from "react"
import { useNetworkStore } from "../stores/useNetworkStore"
import { checkInternet } from "../utils/checkInternet"

export function useNetworkListener() {
    const setOnline = useNetworkStore((s) => s.setOnline)

    useEffect(() => {
        let mounted = true

        const update = async () => {
            const ok = await checkInternet()
            if (mounted) setOnline(ok)
        }

        const handleOnline = () => update()
        const handleOffline = () => setOnline(false)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        update()

        const interval = setInterval(update, 5000)

        return () => {
            mounted = false
            clearInterval(interval)
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [setOnline])
}
