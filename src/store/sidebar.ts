import { create } from 'zustand';

type SidebarState = {
  selectedVariable: string;
  setSelectedVariable: (variable: string) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  selectedVariable: 'temperature_2m',
  setSelectedVariable: (v) => set({ selectedVariable: v }),
}));
