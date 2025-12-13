import { create } from "zustand"
import { persist } from "zustand/middleware"

export type PageType = "mine" | "status"

interface StartPage {
    start: PageType
    setStart: (page: PageType) => void
}

export const useStartStore = create<StartPage>()(
    persist(
        (set) => ({
            start: "mine",
            setStart: (page) => set({ start: page }),
        }),
        {
            name: "area-storage",
        }
    )
)
