import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { initFCMTokenIfNeeded } from "./firebase/initFCMToken"
import { listenForegroundMessage } from "./firebase/fcm"
import { useAlarmStore } from "./stores"
import { useAlarmModalStore } from "./stores/useAlarmModalStore"
import { calcDuration } from "./utils/calcDuration"
import { getDeviceType } from "./utils/deviceType"

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
            scope: "/",
        })
    })
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", (e) => {
        const { type, payload } = e.data || {}
        if (type !== "DEVICE") return

        const id = Number(payload.device_id)
        if (Number.isNaN(id)) return

        useAlarmStore.getState().removeAlarm(id)

        useAlarmModalStore.getState().open({
            id,
            type: getDeviceType(id),
            duration: calcDuration(payload.prevAt, payload.now),
        })
    })
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
})

async function bootstrap() {
    await initFCMTokenIfNeeded()
    await listenForegroundMessage()
}

bootstrap()

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <App />
        </StrictMode>
    </QueryClientProvider>,
)
