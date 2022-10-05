import { getRandomCell } from './cell';
import { Cell, Vec } from './interfaces';
import { rng } from './random';
import { createNoise2D } from 'simplex-noise';

export function createGrid(
  offset: Vec,
  numberOfCells: Vec,
  xpattern: number[],
  ypattern: number[],
  heightRange: number,
  slopeRange: number,
  noiseMagnitude: number,
  noiseScale: number
): Cell[] {
  const noise = createNoise2D(rng);

  let cells: Cell[] = [];
  let accy = offset.y;
  for (var i = 0; i < numberOfCells.y; i++) {
    let accx = offset.x;
    let ch = ypattern[i % ypattern.length];
    for (var j = 0; j < numberOfCells.x; j++) {
      let cw = xpattern[j % xpattern.length];
      let hdelta = 1 + Math.max(0, noise(i * noiseScale, j * noiseScale)) * noiseMagnitude;
      cells.push(
        getRandomCell(
          accx,
          accy,
          cw + 2,
          ch + 2,
          hdelta * heightRange,
          hdelta * slopeRange,
          hdelta * slopeRange
        )
      );
      accx += cw;
    }
    accy += ch;
  }
  return cells.reverse();
}
