import { useSceneStore } from "../stores/useSceneStore";

const CzmlPacketDebugger = () => {
  const czmlPackets = useSceneStore((s) => s.czmlPackets);
  const interactiveCoords = useSceneStore((s) => s.interactiveCoords);

  return (
    <div
      style={{
        maxHeight: "300px",
        overflowY: "auto",
        padding: "1em",
        color: "black",
        backgroundColor: "#eee",
        fontFamily: "monospace",
      }}
    >
      <h3>CZML Packets</h3>
      <pre>{JSON.stringify(czmlPackets, null, 2)}</pre>
      <p>
        Clicked Coord: {interactiveCoords?.lat}, {interactiveCoords?.lon},{" "}
        {interactiveCoords?.height}
      </p>
    </div>
  );
};

export const CommandPanel = () => {
  const addCzmlPacket = useSceneStore((state) => state.addCzmlPacket);

  const handleClick = () => {
    console.log("button clicked!");

    addCzmlPacket({
      id: "point-1",
      name: "Tokyo",
      position: {
        cartographicDegrees: [139.767, 35.681, 0],
      },
      point: {
        pixelSize: 10,
        color: {
          rgba: [0, 255, 255, 255],
        },
      },
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Add Point</button>
      <CzmlPacketDebugger />
    </div>
  );
};
