import { ParameterList } from './interfaces';
import { createDimPattern } from './pattern';
import { createHash } from './util';

let PARAMS: ParameterList = {
  seed: createHash(),
  sunPosition: { x: 0, y: 0 },
  mouseControlsSun: false,
  sunHeight: 250,
  gamma: 0,
  zoom: 1.6,
  heightRange: 10,
  slopeRange: 0.1,
  xPattern: '1[50:20:10]',
  yPattern: '1[10:30]',
  xSlopePattern: '1[13]',
  ySlopePattern: '1[13]',
  randomSlopes: true,
  noiseMagnitude: 3,
  noiseScale: 0.05,
  palette1: 'ducci_q',
  palette1Levels: 3,
  palette2: 'hilda04',
  palette2Levels: 3,
  palette3: 'spatial02i', //tundra4
  palette3Levels: 3,
  palette1Lock: false,
  palette2Lock: false,
  palette3Lock: false,
  stroke: false,
  rotation: 0,
};

export default PARAMS;
