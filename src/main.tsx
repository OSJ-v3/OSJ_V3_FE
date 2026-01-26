import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { initFCM } from "./firebase/initFCM"
import { initFCMTokenIfNeeded } from "./firebase/initFCMToken"

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/firebase-messaging-sw.js")
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
    await initFCM()
}

bootstrap()

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <App />
        </StrictMode>
    </QueryClientProvider>,
)
