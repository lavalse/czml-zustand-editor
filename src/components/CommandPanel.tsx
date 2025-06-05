import { useState } from "react";
import { useSceneStore } from "../stores/useSceneStore";

export const CommandPanel = () => {
  const [input, setInput] = useState("");
  const add = useSceneStore((s) => s.addInteractiveCoord);
  const clear = useSceneStore((s) => s.clearInteractiveCoords);

  const run = () => {
    const tokens = input.split(" ");
    if (tokens[0] === "AddPoint" && tokens.length === 3) {
      const lon = parseFloat(tokens[1]);
      const lat = parseFloat(tokens[2]);
      add({ lon, lat });
    }
    if (tokens[0] === "Clear") {
      clear();
    }
  };

  return (
    <div style={{ padding: 8 }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="AddPoint 135 35"
      />
      <button onClick={run}>Run</button>
    </div>
  );
};
