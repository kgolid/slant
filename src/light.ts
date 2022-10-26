import { angleBetweenPointAndShape } from './geometry';
import { Shape, Vec } from './interfaces';
import PARAMS from './params';

const BRIGHTNESS = 1;

export function illuminanceOfShape(sun: Vec, shape: Shape): number {
  const angle = angleBetweenPointAndShape(sun, shape);
  const illuminance = Math.max(0, -Math.cos(angle));
  return Math.pow(illuminance, Math.pow(2, -PARAMS.gamma));
}
