import { create } from "zustand";

interface FCMState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useFCMStore = create<FCMState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
