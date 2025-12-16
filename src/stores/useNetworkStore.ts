import { create } from "zustand"

export type NetworkStatus = "connecting" | "online" | "offline"

interface NetworkState {
    status: NetworkStatus
    setStatus: (status: NetworkStatus) => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
    status: "connecting",
    setStatus: (status) => set({ status }),
}))
