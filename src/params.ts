import { ParameterList } from './interfaces';
import { createHash } from './util';

let PARAMS: ParameterList = {
  seed: createHash(),
  sunPosition: { x: 0, y: 0 },
  mouseControlsSun: false,
  sunHeight: 250,
  scale: 1.6,
  heightRange: 10,
  slopeRange: 0.1,
  noiseMagnitude: 3,
  noiseScale: 0.05,
  mainPalette: 'ducci_q',
  secondPalette: 'hilda04',
  contrastPalette: 'tundra4',
};

export default PARAMS;
