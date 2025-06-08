import { create } from "zustand";

export type Coord = { lon: number; lat: number; height: number };
export type Mode = "idle" | "addPoint:collecting" | "addPoint:confirm";

export type CzmlPacket = any; // Replace with proper CZML typing later

interface SceneState {
  mode: Mode;
  tempCoord: Coord | null;
  czmlPackets: CzmlPacket[];

  setMode: (m: Mode) => void;
  setTempCoord: (c: Coord | null) => void;
  addCzmlPacket: (p: CzmlPacket) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  mode: "idle",
  tempCoord: null,
  czmlPackets: [],
  tempCzmlPackets:[],


  setMode: (mode) => set({ mode }),
  setTempCoord: (c) => set({ tempCoord: c }),
  addCzmlPacket: (p) =>
    set((state) => ({ czmlPackets: [...state.czmlPackets, p] })),
}));