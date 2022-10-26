import { getCell, getRandomCell } from './cell';
import { Cell } from './interfaces';
import { rng } from './random';
import { createNoise2D } from 'simplex-noise';
import PARAMS from './params';
import { createSlopes, parsePattern } from './pattern';
import { sum } from './util';

const TOTAL_DIM = 3000;

export function createGrid(): Cell[] {
  const noise = createNoise2D(rng);
  const slopes = createSlopes(rng);
  const xPattern = expandDimPattern(PARAMS.xPattern, TOTAL_DIM);
  const yPattern = expandDimPattern(PARAMS.yPattern, TOTAL_DIM);
  const xSlopePattern = expandSlopePattern(PARAMS.xSlopePattern, xPattern.length);
  const ySlopePattern = expandSlopePattern(PARAMS.ySlopePattern, yPattern.length);

  const xDim = sum(xPattern);
  const yDim = sum(yPattern);

  let cells: Cell[] = [];
  let accy = -yDim / 2;
  for (var i = 0; i < yPattern.length; i++) {
    let accx = -xDim / 2;
    let ch = yPattern[i];
    for (var j = 0; j < xPattern.length; j++) {
      let cw = xPattern[j];
      let nVal = noise(accx * PARAMS.noiseScale * 0.02, accy * PARAMS.noiseScale * 0.02);
      let nHeight = 1 + Math.max(0, nVal) * PARAMS.noiseMagnitude;
      let slope = slopes[ySlopePattern[i]][xSlopePattern[j]];

      if (PARAMS.randomSlopes) {
        cells.push(
          getRandomCell(
            accx - 1,
            accy - 1,
            cw + 2,
            ch + 2,
            nHeight * PARAMS.heightRange,
            nHeight * PARAMS.slopeRange,
            nHeight * PARAMS.slopeRange
          )
        );
      } else {
        cells.push(
          getCell(
            accx - 1,
            accy - 1,
            cw + 2,
            ch + 2,
            slope.z * nHeight * PARAMS.heightRange,
            slope.xslope * nHeight * PARAMS.slopeRange,
            slope.yslope * nHeight * PARAMS.slopeRange
          )
        );
      }
      accx += cw;
    }
    accy += ch;
  }
  return cells.reverse();
}

export function expandDimPattern(pattern: string, dim: number) {
  const segments = parsePattern(pattern);
  const expanded = segments.flatMap((seg) => [...new Array(seg.reps)].flatMap(() => seg.dims));
  let i = 0;
  while (sum(expanded) < dim) expanded.push(expanded[i++]);
  return expanded;
}

export function expandSlopePattern(pattern: string, num: number) {
  const segments = parsePattern(pattern);
  const expanded = segments.flatMap((seg) => [...new Array(seg.reps)].flatMap(() => seg.dims));
  let i = 0;
  while (expanded.length < num) expanded.push(expanded[i++]);
  return expanded;
}
