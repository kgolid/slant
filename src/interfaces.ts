export interface Vec {
  x: number;
  y: number;
  z: number;
}

export interface Plane {
  p0: Vec;
  x: Vec;
  y: Vec;
}

export interface Shape {
  a: Vec;
  b: Vec;
  c: Vec;
  d: Vec;
}

export interface Cell {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  xslope: number;
  yslope: number;
  col: number;
}

export interface ParameterList {
  seed: string;
  sunPosition: { x: number; y: number };
  mouseControlsSun: boolean;
  sunHeight: number;
  scale: number;

  heightRange: number;
  slopeRange: number;
  noiseMagnitude: number;
  noiseScale: number;

  mainPalette: string;
  secondPalette: string;
  contrastPalette: string;
}
