import {
  Ion,
  Viewer,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Cartographic,
  Ellipsoid,
  Math as CesiumMath,
  CzmlDataSource,
  Entity
} from "cesium";

import type { Coord, CzmlPacket } from "../stores/useSceneStore";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

export type ClickCoord = Coord;

export interface ViewerEventHandlers {
  onClick?: (coord: ClickCoord) => void;
}

export class CesiumController {
  viewer: Viewer;
  handler: ScreenSpaceEventHandler;
  czmlDataSource: CzmlDataSource;

  constructor(containerId: string, handlers?: ViewerEventHandlers) {
    this.viewer = new Viewer(containerId, {
      animation: false,
      timeline: false,
      shouldAnimate: true,
    });

    this.czmlDataSource = new CzmlDataSource();
    this.viewer.dataSources.add(this.czmlDataSource);

    this.handler = new ScreenSpaceEventHandler(this.viewer.scene.canvas);

    if (handlers?.onClick) {
      this.handler.setInputAction((movement) => {
        const picked = this.viewer.scene.pickPosition(movement.position);
        if (!picked) return;

        const carto = Cartographic.fromCartesian(picked, Ellipsoid.WGS84);
        const coord: ClickCoord = {
          lon: CesiumMath.toDegrees(carto.longitude),
          lat: CesiumMath.toDegrees(carto.latitude),
          height: carto.height,
        };

        handlers?.onClick?.(coord);
      }, ScreenSpaceEventType.LEFT_CLICK);
    }
  }

  updateCzml(czmlPackets: CzmlPacket[]) {
    const czml = [
      { id: "document", version: "1.0" },
      ...czmlPackets,
    ];
    this.czmlDataSource.load(czml);
  }

  destroy() {
    this.handler.destroy();
    this.viewer.destroy();
  }
}