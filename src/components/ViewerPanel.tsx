import { Viewer, Entity } from "resium";
import { Ion, Cartesian3, Color } from "cesium";
import { useSceneStore } from "../stores/useSceneStore";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;

export const ViewerPanel = () => {
  const coords = useSceneStore((s) => s.interactiveCoords);

  return (
    <Viewer style={{ width: "100%", height: "100%" }}>
      {coords.map((c, i) => (
        <Entity
          key={i}
          position={Cartesian3.fromDegrees(c.lon, c.lat, c.height ?? 0)}
          point={{ pixelSize: 10, color: Color.YELLOW }}
        />
      ))}
    </Viewer>
  );
};
