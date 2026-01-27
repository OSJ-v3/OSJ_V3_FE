import { create } from "zustand"
import { persist } from "zustand/middleware"

export type PageType = "mine" | "status"

interface StartPageState {
    start: PageType
    isLoading: boolean
    setStart: (page: PageType) => void
    setLoading: (loading: boolean) => void
}

export const useStartStore = create<StartPageState>()(
    persist(
        (set) => ({
            start: "mine",
            isLoading: true,
            hydrated: false,

            setStart: (page) => set({ start: page }),
            setLoading: (loading) => set({ isLoading: loading }),
        }),
        {
            name: "area-storage",
            partialize: (state) => ({ start: state.start }),

            onRehydrateStorage: () => (state) => {
                state?.setLoading(false)
            },
        },
    ),
)
