import { ParameterList } from './interfaces';
import { createHash } from './util';

let PARAMS: ParameterList = {
  seed: createHash(),
  sunPosition: { x: 0, y: 0 },
  mouseControlsSun: false,
  sunHeight: 250,
  zoom: 1,
  heightRange: 10,
  slopeRange: 0.1,
  noiseMagnitude: 3,
  noiseScale: 0.05,
  palette1: 'ducci_q',
  palette1Levels: 3,
  palette2: 'hilda04',
  palette2Levels: 3,
  palette3: 'tundra4',
  palette3Levels: 3,
  gamma: 0,
  stroke: true,
};

export default PARAMS;
