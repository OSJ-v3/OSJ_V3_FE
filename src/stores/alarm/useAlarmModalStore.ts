import { create } from "zustand"

export interface AlarmModalData {
    id: number
    type: "WASH" | "DRY"
    duration: string
}

interface AlarmModalStore {
    isOpen: boolean
    data: AlarmModalData | null
    triggerAt: number

    open: (data: AlarmModalData) => void
    close: () => void
}

export const useAlarmModalStore = create<AlarmModalStore>((set) => ({
    isOpen: false,
    data: null,
    triggerAt: 0,

    open: (data) =>
        set(() => ({
            isOpen: true,
            data,
            triggerAt: Date.now(),
        })),

    close: () =>
        set(() => ({
            isOpen: false,
            data: null,
            triggerAt: 0,
        })),
}))
