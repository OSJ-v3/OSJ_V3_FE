import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AreaType = "남자 학교측" | "남자 기숙사측" | "여자";

interface AreaState {
  area: AreaType;
  setArea: (area: AreaType) => void;
}

export const useAreaStore = create<AreaState>()(
  persist(
    (set) => ({
      area: "남자 학교측",
      setArea: (area) => set({ area }),
    }),
    {
      name: "area-storage",
    }
  )
);
