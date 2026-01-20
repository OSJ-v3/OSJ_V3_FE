import { create } from "zustand"
import { persist } from "zustand/middleware"

interface NoticeReadState {
    readIds: number[]
    markAsRead: (id: number) => void
    isRead: (id: number) => boolean
}

export const useNoticeReadStore = create<NoticeReadState>()(
    persist(
        (set, get) => ({
            readIds: [],

            markAsRead: (id) =>
                set((state) => {
                    if (state.readIds.includes(id)) return state
                    return { readIds: [...state.readIds, id] }
                }),

            isRead: (id) => get().readIds.includes(id),
        }),
        {
            name: "readed-notices",
        },
    ),
)
