import { create } from "zustand"
import { persist } from "zustand/middleware"

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

export const useAlarmStore = create<AlarmStore>()(
    persist(
        (set, get) => ({
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
        }),
        {
            name: "alarm-store",
        }
    )
)
