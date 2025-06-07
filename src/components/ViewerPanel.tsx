import { useEffect, useRef } from "react";
import { CesiumController } from "../lib/CesiumController";
import type { ClickCoord } from "../lib/CesiumController";
import { useSceneStore } from "../stores/useSceneStore";

export const ViewerPanel = () => {
  const controllerRef = useRef<CesiumController | null>(null);
  const czmlPackets = useSceneStore((s) => s.czmlPackets);
  const setCoord = useSceneStore((s) => s.setInteractionCoord);

  useEffect(() => {
    controllerRef.current = new CesiumController("cesiumContainer", (coord: ClickCoord) => {
      console.log("[Cesium] 用户点击坐标：", coord);
      setCoord(coord); // 写入 store
    });

    return () => {
      controllerRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    controllerRef.current?.updateCzml(czmlPackets);
  }, [czmlPackets]);

  return <div id="cesiumContainer" style={{ width: "100%", height: "100%" }} />;
};
