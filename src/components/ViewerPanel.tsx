import { Viewer, CzmlDataSource } from "resium";
import {
  Ion,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartographic,
  Ellipsoid,
  Math as CesiumMath,
  Viewer as CesiumViewer,
} from "cesium";
import type { CesiumComponentRef } from "resium";
import { useEffect, useMemo, useRef } from "react";
import { useSceneStore } from "../stores/useSceneStore";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;

export const ViewerPanel = () => {
  const czmlPackets = useSceneStore((s) => s.czmlPackets);
  const setCoord = useSceneStore((s) => s.setinteractionCoord);

  const viewerRef = useRef<CesiumComponentRef<CesiumViewer> | null>(null);

  const czml = useMemo(() => [
    { id: "document", name: "czml Packets", version: "1.0" },
    ...czmlPackets,
  ], [czmlPackets]);

  // 👉 使用 useEffect 注册事件
  useEffect(() => {
    let cancelled = false;

    function waitForViewerReady(attempt = 0) {
      if (cancelled) return;
      const viewer = viewerRef.current?.cesiumElement;

      if (viewer) {
        console.log("[ViewerPanel] ✅ Cesium Viewer 已准备好（通过轮询）");

        const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((movement) => {
          const picked = viewer.scene.pickPosition(movement.position);
          if (!picked) {
            console.warn("[ViewerPanel] 没有拾取到地球上的位置");
            return;
          }

          const carto = Cartographic.fromCartesian(picked, Ellipsoid.WGS84);
          const lon = CesiumMath.toDegrees(carto.longitude);
          const lat = CesiumMath.toDegrees(carto.latitude);
          const height = carto.height;

          console.log("[ViewerPanel] 点击坐标：", { lon, lat, height });
          setCoord({ lon, lat, height });
        }, ScreenSpaceEventType.LEFT_CLICK);

        return;
      }

      if (attempt < 10) {
        console.log(`[ViewerPanel] 等待 Cesium Viewer 初始化... 尝试 ${attempt + 1}`);
        setTimeout(() => waitForViewerReady(attempt + 1), 100);
      } else {
        console.error("[ViewerPanel] ❌ Cesium Viewer 加载超时");
      }
    }

    waitForViewerReady();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Viewer ref={viewerRef} style={{ width: "100%", height: "100%" }}>
      <CzmlDataSource data={czml} />
    </Viewer>
  );
};
