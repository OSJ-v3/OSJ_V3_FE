import { create } from "zustand"

export type AlarmDevice = {
    id: number
    type: "WASH" | "DRY"
}

interface AlarmStore {
    alarms: AlarmDevice[]
    hasAlarm: (id: number) => boolean
    addAlarm: (device: AlarmDevice) => void
    removeAlarm: (id: number) => void
}

export const useAlarmStore = create<AlarmStore>((set, get) => ({
    alarms: [],

    hasAlarm: (id) => get().alarms.some((device) => device.id === id),

    addAlarm: (device) =>
        set((state) => ({
            alarms: [...state.alarms, device],
        })),

    removeAlarm: (id) =>
        set((state) => ({
            alarms: state.alarms.filter((d) => d.id !== id),
        })),
}))
