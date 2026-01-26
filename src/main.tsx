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
    navigator.serviceWorker.addEventListener("message", (event) => {
        const { type, id, prevAt, now } = event.data || {}

        if (type !== "DEVICE" || typeof id !== "number") return

        const removeAlarm = useAlarmStore.getState().removeAlarm
        const openAlarmModal = useAlarmModalStore.getState().open

        removeAlarm(id)

        openAlarmModal({
            id,
            type: getDeviceType(id),
            duration: prevAt && now ? calcDuration(prevAt, now) : "작동 완료",
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
