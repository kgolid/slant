import * as vector from './vector';
import { Vec, Cell, Plane, Shape } from './interfaces';

export function angleBetweenPointAndCell(pnt: Vec, cell: Cell): number {
  const cellCenter = centerOfCell(cell);
  const cellNormal = normalOfCell(cell);
  const cellToPointVec = vector.sub(cellCenter, pnt);
  return vector.angleBetween(cellNormal, cellToPointVec);
}

export function angleBetweenPointAndShape(pnt: Vec, shape: Shape): number {
  const planeCenter = centerOfShape(shape);
  const planeNormal = normalOfShape(shape);
  const cellToPointVec = vector.sub(planeCenter, pnt);
  return vector.angleBetween(planeNormal, cellToPointVec);
}

export function distanceFromPointToCell(pnt: Vec, cell: Cell): number {
  return vector.mag(vector.sub(pnt, centerOfCell(cell)));
}

function normalOfCell(cell: Cell): Vec {
  const xvec = { x: cell.w, y: 0, z: -cell.xslope * 2 };
  const yvec = { x: 0, y: cell.h, z: -cell.yslope * 2 };
  return vector.crossProduct(xvec, yvec);
}

//  Shape
//  C /\
//   /  \ B
// D \  /
//    \/ A

function normalOfShape(shape: Shape): Vec {
  const xvec = vector.sub(shape.b, shape.a);
  const yvec = vector.sub(shape.d, shape.a);
  return vector.crossProduct(xvec, yvec);
}

function centerOfCell(cell: Cell): Vec {
  return { x: cell.x + cell.w / 2, y: cell.y + cell.h / 2, z: cell.z };
}

function centerOfShape(shape: Shape): Vec {
  const ab = vector.midpoint(shape.a, shape.b);
  const dc = vector.midpoint(shape.d, shape.c);
  return vector.midpoint(ab, dc);
}
