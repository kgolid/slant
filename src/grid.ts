import { getRandomCell } from './cell';
import { Cell, Vec } from './interfaces';
import { rng } from './random';
import { createNoise2D } from 'simplex-noise';

export function createGrid(
  offset: Vec,
  numberOfCells: Vec,
  xpattern: number[],
  ypattern: number[]
): Cell[] {
  const noise = createNoise2D();

  const profile1 = { z: rng(), xs: rng() * 2 - 1, ys: rng() * 2 - 1, col: 0 };
  const profile2 = { z: rng(), xs: rng() * 2 - 1, ys: rng() * 2 - 1 };
  const profile3 = { z: rng(), xs: rng() * 2 - 1, ys: rng() * 2 - 1 };

  let cells: Cell[] = [];
  let accy = offset.y;
  for (var i = 0; i < numberOfCells.y; i++) {
    let accx = offset.x;
    let ch = ypattern[i % ypattern.length];
    for (var j = 0; j < numberOfCells.x; j++) {
      let cw = xpattern[j % xpattern.length];
      let hdelta = 1 + Math.max(0, noise(i / 20, j / 20)) * 3;
      cells.push(
        getRandomCell(accx, accy, cw + 2, ch + 2, hdelta * 10, hdelta * 0.1, hdelta * 0.1)
      );

      accx += cw;
    }
    accy += ch;
  }
  return cells.reverse();
}
