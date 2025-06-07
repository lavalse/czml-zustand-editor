import { create } from "zustand";
import type { CzmlPacket } from "../types/czml";

type Coord = { lon: number; lat: number; height: number } | null;

type SceneState = {
  czmlPackets: CzmlPacket[];
  selectedPacketId: string | null;

  interactiveCoords: Coord;

  addCzmlPacket: (packet: CzmlPacket) => void;
  updateCzmlPacket: (packet: CzmlPacket) => void;
  removeCzmlPacket: (id: string) => void;
  selectPacket: (id: string | null) => void;
  setInteractionCoord: (coord: Coord) => void;
};

export const useSceneStore = create<SceneState>((set, get) => ({
  czmlPackets: [],
  selectedPacketId: null,
  interactiveCoords: null,

  addCzmlPacket: (packet) =>
    set((state) => ({
      czmlPackets: [...state.czmlPackets, packet],
    })),

  updateCzmlPacket: (updated) =>
    set((state) => ({
      czmlPackets: state.czmlPackets.map((e) =>
        e.id === updated.id ? updated : e
      ),
    })),

  removeCzmlPacket: (id) =>
    set((state) => ({
      czmlPackets: state.czmlPackets.filter((e) => e.id !== id),
    })),

  selectPacket: (id) => set({ selectedPacketId: id }),

  setInteractionCoord: (coord) =>
    set(() => ({ interactiveCoords: coord })),
}));
