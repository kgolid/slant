import P5 from 'p5';
import { drawGrid } from './display';
import { createGrid } from './grid';
import { Cell, Vec } from './interfaces.js';
import { reset } from './random';
import { mul, translateWithBase } from './vector';
import createGUI from './gui';
import PARAMS from './params';

let sketch = function (p: P5) {
  const DIMX = 800;
  const DIMY = 800;
  const CENTER = { x: DIMX / 2, y: DIMY / 2 };

  const XPATTERN = [50, 20, 10];
  const YPATTERN = [10, 30];
  const XREPS = 30;
  const YREPS = 60;
  const TOTALDIMX = XPATTERN.reduce((a, c) => a + c) * XREPS;
  const TOTALDIMY = YPATTERN.reduce((a, c) => a + c) * YREPS;
  const NCELLSX = XPATTERN.length * XREPS;
  const NCELLSY = YPATTERN.length * YREPS;

  let bases: Vec[];
  let sun: Vec;
  let grid: Cell[];

  p.setup = function () {
    p.createCanvas(DIMX, DIMY);
    p.background(0, 50, 50);
    p.noStroke();
    p.pixelDensity(2);
    p.fill(255);

    createGUI(resetGrid);
    resetGrid();
  };

  p.draw = function () {
    p.background(255);
    p.translate(CENTER.x, CENTER.y);

    sun = {
      x: PARAMS.mouseControlsSun ? p.mouseX - CENTER.x : (PARAMS.sunPosition.x * DIMX) / 2,
      y: PARAMS.mouseControlsSun
        ? p.mouseY - CENTER.y - PARAMS.sunHeight
        : (PARAMS.sunPosition.y * DIMY) / 2 - PARAMS.sunHeight,
      z: PARAMS.sunHeight,
    };

    const invbases = getInverseBases().map((ibs) => mul(ibs, 1 / PARAMS.scale));
    drawGrid(
      p,
      bases.map((bs) => mul(bs, PARAMS.scale)),
      translateWithBase(sun, invbases),
      grid,
      [PARAMS.mainPalette, PARAMS.secondPalette, PARAMS.contrastPalette]
    );
  };

  p.keyPressed = function () {
    if (p.keyCode === 80) p.saveCanvas('Slant_' + Date.now(), 'jpeg'); // Press P to download image
  };

  function resetGrid() {
    reset();

    bases = getBases();
    grid = createGrid(
      { x: -TOTALDIMX / 2, y: -TOTALDIMY / 2, z: 0 },
      { x: NCELLSX, y: NCELLSY, z: 0 },
      XPATTERN,
      YPATTERN,
      PARAMS.heightRange,
      PARAMS.slopeRange,
      PARAMS.noiseMagnitude,
      PARAMS.noiseScale
    );
  }

  function getBases(): Vec[] {
    const PHI1 = -Math.PI / 6;
    const PHI2 = -(5 * Math.PI) / 6;
    const PHI3 = -Math.PI / 2;
    const b1 = { x: Math.cos(PHI1), y: Math.sin(PHI1), z: 0 };
    const b2 = { x: Math.cos(PHI2), y: Math.sin(PHI2), z: 0 };
    const b3 = { x: Math.cos(PHI3), y: Math.sin(PHI3), z: 1 };

    return [b1, b2, b3]; //[mul(b1, PARAMS.scale), mul(b2, PARAMS.scale), mul(b3, PARAMS.scale)];
  }

  function getInverseBases(): Vec[] {
    const b1 = { x: 1 / Math.sqrt(3), y: -1 / Math.sqrt(3), z: 0 };
    const b2 = { x: -1, y: -1, z: 0 };
    const b3 = { x: -1, y: -1, z: 1 };

    return [b1, b2, b3]; // [mul(b1, 1 / PARAMS.scale), mul(b2, 1 / PARAMS.scale), mul(b3, 1 / PARAMS.scale)];
  }
};

new P5(sketch);
