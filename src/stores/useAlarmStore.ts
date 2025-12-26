import { create } from "zustand";

export type AlarmDevice = {
  id: number;
  type: "WASH" | "DRY";
};

interface AlarmStore {
  alarms: AlarmDevice[];

  setAlarms: (alarms: AlarmDevice[]) => void;
  addAlarm: (device: AlarmDevice) => void;
  removeAlarm: (id: number) => void;

  hasAlarm: (id: number) => boolean;
  reset: () => void;
}

export const useAlarmStore = create<AlarmStore>((set, get) => ({
  alarms: [],

  setAlarms: (alarms) => {
    set({ alarms });
  },

  addAlarm: (device) => {
    const exists = get().alarms.some((d) => d.id === device.id);
    if (exists) return;

    set({
      alarms: [...get().alarms, device],
    });
  },

  removeAlarm: (id) => {
    set({
      alarms: get().alarms.filter((d) => d.id !== id),
    });
  },

  hasAlarm: (id) => {
    return get().alarms.some((d) => d.id === id);
  },

  reset: () => {
    set({ alarms: [] });
  },
}));
