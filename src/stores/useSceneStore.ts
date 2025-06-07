import { create } from "zustand";

type czmlPacket = {
  id: string;
  name?: string;
  position?: {
    cartographicDegrees: [number, number, number];
  };
  point?: {
    pixelSize: number;
    color: {
      rgba: [number, number, number, number];
    };
  };
  [key: string]: any; // 保持灵活性
};

type Coord = { lon: number; lat: number; height: number }| null;

type SceneState = {
  czmlPackets: czmlPacket[];
  selectedPacketId: string | null;

  interactiveCoords: Coord;

  addczmlPacket: (packet: czmlPacket) => void;
  updateczmlPacket: (Packet: czmlPacket) => void;
  removeczmlPacket: (id: string) => void;
  selectPacket: (id: string | null) => void;
  setinteractionCoord: (coord: Coord) => void;
};

export const useSceneStore = create<SceneState>((set, get) => ({
  czmlPackets: [],
  selectedPacketId: null,
  interactiveCoords:null,

  addczmlPacket: (Packet) =>
    set((state) => ({
      czmlPackets: [...state.czmlPackets, Packet],
    })),

  updateczmlPacket: (updated) =>
    set((state) => ({
      czmlPackets: state.czmlPackets.map((e) =>
        e.id === updated.id ? updated : e
      ),
    })),

  removeczmlPacket: (id) =>
    set((state) => ({
      czmlPackets: state.czmlPackets.filter((e) => e.id !== id),
    })),

  selectPacket: (id) => set({ selectedPacketId: id }),

  setinteractionCoord: (coord) =>
  set(() => ({ interactiveCoords: coord })),
}));
