import { useState, useEffect } from "react";
import { useSceneStore } from "../stores/useSceneStore";

const CzmlPacketDebugger = () => {
  const czmlPackets = useSceneStore((s) => s.czmlPackets);
  const interactiveCoords = useSceneStore((s)=>s.interactiveCoords)

  return (
    <div style={{ maxHeight: "300px", overflowY: "auto", padding: "1em",color:"black" }}>
      <h3>czml Packets</h3>
      <pre>{JSON.stringify(czmlPackets, null, 2)}</pre>
      <p>{interactiveCoords?.lat},{interactiveCoords?.lon}</p>
    </div>
  );
};

export const CommandPanel = () => {

  const addczmlPacket = useSceneStore((state)=>state.addczmlPacket);
  
  const handleClick = (()=>{
    console.log("button clicked!")
    addczmlPacket({
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
  })

  })

  return (
    <div >
      <button onClick={handleClick}>add point</button>
      <CzmlPacketDebugger/>
    </div>
  );
};