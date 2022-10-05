import { Vec } from './interfaces';

export function add(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function sub(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function mul(a: Vec, s: number): Vec {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}

export function dotProduct(a: Vec, b: Vec): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function crossProduct(a: Vec, b: Vec): Vec {
  const cx = a.y * b.z - a.z * b.y;
  const cy = a.z * b.x - a.x * b.z;
  const cz = a.x * b.y - a.y * b.x;
  return { x: cx, y: cy, z: cz };
}

export function mag(a: Vec): number {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
}

export function angleBetween(a: Vec, b: Vec): number {
  return Math.acos(dotProduct(a, b) / (mag(a) * mag(b)));
}

export function midpoint(a: Vec, b: Vec): Vec {
  return add(a, mul(sub(b, a), 0.5));
}

export function translateWithBase(pnt: Vec, bases: Vec[]): Vec {
  const [b1, b2, b3] = bases;

  return add(mul(b1, pnt.x), add(mul(b2, pnt.y), mul(b3, pnt.z)));
}
