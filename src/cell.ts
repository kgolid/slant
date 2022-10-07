import { Cell, Shape, Vec } from './interfaces';
import { rng } from './random';

export const getCell = (
  x: number,
  y: number,
  w: number,
  h: number,
  z: number,
  xslope: number,
  yslope: number,
  col: number
): Cell => ({ x, y, z, w, h, xslope: xslope * w, yslope: yslope * h, col });

export function getRandomCell(
  x: number,
  y: number,
  w: number,
  h: number,
  zmax: number,
  xsmax: number,
  ysmax: number
): Cell {
  const z = xsmax * w + ysmax * h + rng() * zmax;
  const xs = (rng() * 2 - 1) * xsmax * w;
  const ys = (rng() * 2 - 1) * ysmax * h;

  const flip = rng();
  const col = flip < 0.6 ? 0 : flip < 0.9 ? 1 : 2;
  return { x, y, z, w, h, xslope: xs, yslope: ys, col };
}

export function cellPos(cell: Cell): Vec {
  return { x: cell.x, y: cell.y, z: cell.z };
}

export function scaleCell(cell: Cell, s: number): Cell {
  return { ...cell, z: cell.z * s, xslope: cell.xslope * s, yslope: cell.yslope * s };
}

export function cornerPos(cell: Cell): Vec {
  const cp = cellPos(cell);
  return { ...cp, z: cell.z + cell.xslope + cell.yslope };
}

export function topShape(cell: Cell): Shape {
  const cp = cellPos(cell);
  const a = { ...cp, z: cell.z + cell.xslope + cell.yslope };
  const b = { ...cp, x: cell.x + cell.w, z: cell.z - cell.xslope + cell.yslope };
  const c = {
    ...cp,
    x: cell.x + cell.w,
    y: cell.y + cell.h,
    z: cell.z - cell.xslope - cell.yslope,
  };
  const d = { ...cp, y: cell.y + cell.h, z: cell.z + cell.xslope - cell.yslope };

  return { a, b, c, d };
}

export function rightShape(cell: Cell): Shape {
  const cp = cellPos(cell);
  const a = { ...cp, z: cell.z + cell.xslope + cell.yslope };
  const b = { ...cp, z: 0 };
  const c = { ...cp, x: cell.x + cell.w, z: 0 };
  const d = { ...cp, x: cell.x + cell.w, z: cell.z - cell.xslope + cell.yslope };

  return { a, b, c, d };
}

export function leftShape(cell: Cell): Shape {
  const cp = cellPos(cell);
  const a = { ...cp, z: cell.z + cell.xslope + cell.yslope };
  const b = { ...cp, y: cell.y + cell.h, z: cell.z + cell.xslope - cell.yslope };
  const c = { ...cp, y: cell.y + cell.h, z: 0 };
  const d = { ...cp, z: 0 };

  return { a, b, c, d };
}

export function fullShape(cell: Cell): Vec[] {
  const cp = cellPos(cell);

  const b = { ...cp, x: cell.x + cell.w, z: cell.z - cell.xslope + cell.yslope };
  const c = {
    ...cp,
    x: cell.x + cell.w,
    y: cell.y + cell.h,
    z: cell.z - cell.xslope - cell.yslope,
  };
  const d = { ...cp, y: cell.y + cell.h, z: cell.z + cell.xslope - cell.yslope };
  const e = { ...cp, y: cell.y + cell.h, z: 0 };
  const f = { ...cp, z: 0 };
  const g = { ...cp, x: cell.x + cell.w, z: 0 };

  return [b, c, d, e, f, g];
}

export function frontShape(cell: Cell): Vec[] {
  const cp = cellPos(cell);

  const b = { ...cp, x: cell.x + cell.w, z: cell.z - cell.xslope + cell.yslope };
  const a = { ...cp, z: cell.z + cell.xslope + cell.yslope };

  const d = { ...cp, y: cell.y + cell.h, z: cell.z + cell.xslope - cell.yslope };
  const e = { ...cp, y: cell.y + cell.h, z: 0 };
  const f = { ...cp, z: 0 };
  const g = { ...cp, x: cell.x + cell.w, z: 0 };

  return [b, a, d, e, f, g];
}

export function corners(cell: Cell): Vec[] {
  const cp = cellPos(cell);

  // Leaving out 'a' as its the center of the shape.
  const b = { ...cp, x: cell.x + cell.w, z: cell.z - cell.xslope + cell.yslope };
  const d = { ...cp, y: cell.y + cell.h, z: cell.z + cell.xslope - cell.yslope };
  const f = { ...cp, z: 0 };

  return [b, d, f];
}
