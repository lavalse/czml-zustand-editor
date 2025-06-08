import { useEffect, useRef } from "react";
import { CesiumController } from "../lib/CesiumController";
import { useSceneStore } from "../stores/useSceneStore";

export const ViewerPanel = () => {
  const controllerRef = useRef<CesiumController | null>(null);
  const czmlPackets = useSceneStore((s) => s.czmlPackets);


  useEffect(() => {
    controllerRef.current = new CesiumController("cesiumContainer", {
      onClick: (coord) => {
        const { mode, setTempCoord, setMode } = useSceneStore.getState();
        if (mode === "addPoint:collecting") {
          setTempCoord({ ...coord });
          setMode("addPoint:confirm");
        }else if (mode === "addPoint:confirm") {
          setTempCoord({ ...coord }); // ✅ 允许继续更新临时坐标
        }
      },
    });

    return () => controllerRef.current?.destroy();
  }, []);

  useEffect(() => {
    controllerRef.current?.updateCzml(czmlPackets);
  }, [czmlPackets]);

  return <div id="cesiumContainer" style={{ width: "100%", height: "100%" }} />;
};