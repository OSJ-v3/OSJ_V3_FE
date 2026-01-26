import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FcmState {
    token: string | null
    setToken: (token: string) => void
    clearToken: () => void
}

export const useFcmStore = create<FcmState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),
            clearToken: () => set({ token: null }),
        }),
        {
            name: "fcm-token",
        },
    ),
)
