import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export const usePwaInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

    const [isInstallable, setIsInstallable] = useState(false)

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)
            setIsInstallable(true)
        }

        window.addEventListener("beforeinstallprompt", handler)
        return () => window.removeEventListener("beforeinstallprompt", handler)
    }, [])

    const promptInstall = async () => {
        if (!deferredPrompt) return null

        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        setDeferredPrompt(null)
        setIsInstallable(false)

        return outcome
    }

    return { isInstallable, promptInstall }
}
