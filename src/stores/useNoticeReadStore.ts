import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoticeReadState {
  readIds: string[];
  markAsRead: (id: string) => void;
  isRead: (id: string) => boolean;
}

export const useNoticeReadStore = create<NoticeReadState>()(
  persist(
    (set, get) => ({
      readIds: [],

      markAsRead: (id) =>
        set((state) => ({
          readIds: [...new Set([...state.readIds, id])],
        })),

      isRead: (id) => get().readIds.includes(id),
    }),
    {
      name: "notice-read-storage",
    }
  )
);
