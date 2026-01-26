import { createContext, useContext } from "react"
import { useToast } from "../hooks"

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toast = useToast()
    return (
        <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
    )
}

export const useToastContext = () => {
    const ctx = useContext(ToastContext)
    if (!ctx) {
        throw new Error("useToastContext must be used within ToastProvider")
    }
    return ctx
}
