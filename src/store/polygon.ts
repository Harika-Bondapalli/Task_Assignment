import { create } from 'zustand';

export type Polygon = {
  id: string;
  name?: string;
  latlngs: [number, number][];
};

type PolygonStore = {
  polygons: Polygon[];
  addPolygon: (poly: Polygon) => void;
  removePolygon: (id: string) => void;
};

export const usePolygonStore = create<PolygonStore>((set) => ({
  polygons: [],
  addPolygon: (poly) =>
    set((state) => ({ polygons: [...state.polygons, poly] })),
  removePolygon: (id) =>
    set((state) => ({ polygons: state.polygons.filter((p) => p.id !== id) })),
}));

