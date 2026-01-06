import { create } from "zustand";

interface NoticeAlarmState {
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
}

export const useNoticeAlarmStore = create<NoticeAlarmState>(() => ({
  isSubscribed: true,
  setSubscribed: () => {},
}));
