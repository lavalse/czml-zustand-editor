export type CzmlColor = {
  rgba: [number, number, number, number];
};

export type CzmlPosition = {
  cartographicDegrees: [number, number, number];
};

export type CzmlPoint = {
  pixelSize: number;
  color: CzmlColor;
};

export type CzmlLabel = {
  text: string;
  font?: string;
  fillColor?: CzmlColor;
};

export type CzmlPacket = {
  id: string;
  name?: string;
  description?: string;
  position?: CzmlPosition;
  point?: CzmlPoint;
  label?: CzmlLabel;
  polyline?: any; // 你可以逐步细化
  [key: string]: unknown; // 允许灵活扩展
};
