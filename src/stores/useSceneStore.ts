import { create } from "zustand";

type Coord = { lon: number; lat: number; height?: number };

interface SceneState {
  interactiveCoords: Coord[];
  setInteractiveCoords: (coords: Coord[]) => void;
  addInteractiveCoord: (coord: Coord) => void;
  clearInteractiveCoords: () => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  interactiveCoords: [],
  setInteractiveCoords: (coords) => set({ interactiveCoords: coords }),
  addInteractiveCoord: (coord) =>
    set((state) => ({
      interactiveCoords: [...state.interactiveCoords, coord],
    })),
  clearInteractiveCoords: () => set({ interactiveCoords: [] }),
}));
