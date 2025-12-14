import { create } from "zustand"

interface NetworkState {
    online: boolean
    setOnline: (v: boolean) => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
    online: true,
    setOnline: (v) => set({ online: v }),
}))
