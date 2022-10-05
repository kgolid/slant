import {
  angleBetweenPointAndCell,
  angleBetweenPointAndShape,
  distanceFromPointToCell,
} from './geometry';
import { Cell, Shape, Vec } from './interfaces';

const BRIGHTNESS = 1;

export function illuminanceOfCell(sun: Vec, cell: Cell): number {
  const distance = distanceFromPointToCell(sun, cell);
  const angle = angleBetweenPointAndCell(sun, cell);
  if (angle < 0) console.log(angle);
  return (BRIGHTNESS * Math.abs(Math.cos(angle))) / 200; //(distance * distance);
}

export function illuminanceOfShape(sun: Vec, shape: Shape): number {
  const angle = angleBetweenPointAndShape(sun, shape);
  if (angle < 0) console.log(angle);
  return BRIGHTNESS * Math.max(0, -Math.cos(angle));
}
