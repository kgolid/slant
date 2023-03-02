import { ParameterList } from './interfaces';
import { createHash } from './util';

let PARAMS: ParameterList = {
  seed: createHash(),
  sunPosition: { x: 0, y: 0 },
  mouseControlsSun: false,
  sunHeight: 600,
  gamma: 0,
  zoom: 1.6,
  heightRange: 10,
  slopeRange: 0.1,
  xPattern: '1[70:30:15]',
  yPattern: '1[15:50]',
  xSlopePattern: '1[1:2:3:4]',
  ySlopePattern: '1[1:2:3]',
  randomSlopes: true,
  noiseMagnitude: 3,
  noiseScale: 0.05,
  palette1: 'rag-belur',
  palette1Levels: 3,
  palette1Lock: false,
  palette2: 'cc238',
  palette2Levels: 1,
  palette2Lock: false,
  palette3: 'dale_paddle',
  palette3Levels: 2,
  palette3Lock: false,
  stroke: false,
  rotation: 0,
};

export default PARAMS;
