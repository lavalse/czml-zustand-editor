import { useSceneStore } from "../stores/useSceneStore";

const DebugPanel = () => {
  const mode = useSceneStore((s) => s.mode);
  const coord = useSceneStore((s) => s.tempCoord);
  const czml = useSceneStore((s) => s.czmlPackets);

  return (
    <div style={{ background: "#eee", color:"black",padding: "1em", fontFamily: "monospace" }}>
      <h4>SceneState</h4>
      <p>mode:{mode}</p>
      <p>tempCoord:{coord ? `${coord.lat}, ${coord.lon}, ${coord.height}` : "无"}</p>
      <p>czmlPackets:{czml.length}</p>
    </div>
  );
};

export const CommandPanel = () => {
  const mode = useSceneStore((s) => s.mode);
  const setMode = useSceneStore((s) => s.setMode);
  const tempCoord = useSceneStore((s) => s.tempCoord);
  const addCzmlPacket = useSceneStore((s) => s.addCzmlPacket);
  const setTempCoord = useSceneStore((s) => s.setTempCoord);

  return (
    <div style={{ padding: "1em" }}>
      <button onClick={() => setMode("addPoint:collecting")}>开始添加点</button>

      {mode === "addPoint:confirm" && tempCoord && (
        <div>
          <p>添加点：{tempCoord.lat.toFixed(6)}, {tempCoord.lon.toFixed(6)}</p>
          <button
            onClick={() => {
              addCzmlPacket({
                id: `point-${Date.now()}`,
                name: "Point",
                position: {
                  cartographicDegrees: [
                    tempCoord.lon,
                    tempCoord.lat,
                    tempCoord.height ?? 0,
                  ],
                },
                point: {
                  pixelSize: 10,
                  color: { rgba: [255, 0, 0, 255] },
                },
              });
              setTempCoord(null);
              setMode("idle");
            }}
          >
            确认</button>
          <button onClick={() => { setTempCoord(null); setMode("idle"); }}>取消</button>
        </div>
      )}
      <DebugPanel/>
    </div>
  );
};