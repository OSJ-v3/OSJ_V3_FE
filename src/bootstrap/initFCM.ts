import { initFCMTokenIfNeeded, listenForegroundMessage } from "../firebase"

export async function initFCM() {
    await initFCMTokenIfNeeded()
    await listenForegroundMessage()
}
