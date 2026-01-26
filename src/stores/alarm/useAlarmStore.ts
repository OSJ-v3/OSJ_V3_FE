import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AlarmDevice = {
    id: number
    type: "WASH" | "DRY"
}

interface AlarmState {
    alarms: AlarmDevice[]
    hasAlarm: (id: number) => boolean
    addAlarm: (device: AlarmDevice) => void
    removeAlarm: (id: number) => void
    setAlarms: (devices: AlarmDevice[]) => void
}

export const useAlarmStore = create<AlarmState>()(
    persist(
        (set, get) => ({
            alarms: [],

            hasAlarm: (id) => get().alarms.some((d) => d.id === id),

            addAlarm: (device) =>
                set((state) => {
                    if (state.alarms.some((d) => d.id === device.id)) {
                        return state
                    }
                    return { alarms: [...state.alarms, device] }
                }),

            removeAlarm: (id) =>
                set((state) => ({
                    alarms: state.alarms.filter((d) => d.id !== id),
                })),

            setAlarms: (devices) => set({ alarms: devices }),
        }),
        {
            name: "alarm-store",
            version: 1,
        },
    ),
)
