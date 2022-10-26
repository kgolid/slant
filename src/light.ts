import { angleBetweenPointAndShape } from './geometry';
import { Shape, Vec } from './interfaces';

const BRIGHTNESS = 1;

export function illuminanceOfShape(sun: Vec, shape: Shape): number {
  const angle = angleBetweenPointAndShape(sun, shape);
  return BRIGHTNESS * Math.max(0, -Math.cos(angle));
}
