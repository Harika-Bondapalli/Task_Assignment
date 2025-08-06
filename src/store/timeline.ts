import { create } from 'zustand';

type TimelineStore = {
  range: [number, number];
  setRange: (range: [number, number]) => void;
};

export const useTimelineStore = create<TimelineStore>((set) => ({
  range: [360, 360],
  setRange: (range) => set({ range }),
}));

