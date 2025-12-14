import { createContext, useContext, type ReactNode } from "react"
import { useAlarmModal } from "../hooks/useAlarmModal"

type AlarmContextType = ReturnType<typeof useAlarmModal>

const AlarmContext = createContext<AlarmContextType | null>(null)

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
    const value = useAlarmModal()
    return (
        <AlarmContext.Provider value={value}>{children}</AlarmContext.Provider>
    )
}

export const useAlarmContext = () => {
    const ctx = useContext(AlarmContext)
    if (!ctx) throw new Error("AlarmProvider 없음")
    return ctx
}
