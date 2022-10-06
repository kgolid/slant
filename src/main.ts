import P5 from 'p5';
import { drawGrid } from './display';
import { createGrid } from './grid';
import { Cell, Vec } from './interfaces.js';
import { reset } from './random';
import { mul, translateWithBase } from './vector';
import createGUI from './gui';
import PARAMS from './params';

let sketch = function (p: P5) {
  const DIMX = Math.min(window.innerHeight, window.innerWidth) * 0.71;
  const DIMY = Math.min(window.innerHeight, window.innerWidth);
  const CENTER = { x: DIMX / 2, y: DIMY / 2 };

  const scale = DIMX / 1200;

  const XPATTERN = [30, 40, 10];
  const YPATTERN = [10, 40, 30];
  const XREPS = 30;
  const YREPS = 30;
  const TOTALDIMX = XPATTERN.reduce((a, c) => a + c) * XREPS;
  const TOTALDIMY = YPATTERN.reduce((a, c) => a + c) * YREPS;
  const NCELLSX = XPATTERN.length * XREPS;
  const NCELLSY = YPATTERN.length * YREPS;

  let grid: Cell[];

  p.setup = function () {
    p.createCanvas(DIMX, DIMY);
    p.background(0, 50, 50);
    p.noStroke();
    p.pixelDensity(4);
    p.fill(255);

    createGUI(resetGrid);
    resetGrid();
  };

  p.draw = function () {
    p.background(255);
    p.translate(CENTER.x, CENTER.y);

    const bases = getBases(PARAMS.zoom * scale);
    const invbases = getInverseBases(1 / PARAMS.zoom);
    const sun = translateWithBase(getSunPos(), invbases);
    const palettes = [PARAMS.palette1, PARAMS.palette2, PARAMS.palette3];
    const paletteLevels = [PARAMS.palette1Levels, PARAMS.palette2Levels, PARAMS.palette3Levels];

    drawGrid(p, bases, sun, grid, palettes, paletteLevels, PARAMS.stroke, scale);
  };

  p.keyPressed = function () {
    if (p.keyCode === 80)
      p.saveCanvas(
        'Slant_' +
          PARAMS.palette1 +
          '_' +
          PARAMS.palette2 +
          '_' +
          PARAMS.palette3 +
          '_' +
          PARAMS.seed,
        'png'
      ); // Press P to download image
  };

  function resetGrid() {
    reset();
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

  function getSunPos(): Vec {
    const xpos = PARAMS.mouseControlsSun ? p.mouseX - CENTER.x : (PARAMS.sunPosition.x * DIMX) / 2;
    const ypos = PARAMS.mouseControlsSun
      ? p.mouseY - CENTER.y - PARAMS.sunHeight
      : (PARAMS.sunPosition.y * DIMY) / 2 - PARAMS.sunHeight;

    return {
      x: xpos,
      y: ypos,
      z: PARAMS.sunHeight,
    };
  }

  function getBases(scale: number): Vec[] {
    const PHI1 = -Math.PI / 6;
    const PHI2 = -(5 * Math.PI) / 6;
    const PHI3 = -Math.PI / 2;
    const b1 = { x: Math.cos(PHI1), y: Math.sin(PHI1), z: 0 };
    const b2 = { x: Math.cos(PHI2), y: Math.sin(PHI2), z: 0 };
    const b3 = { x: Math.cos(PHI3), y: Math.sin(PHI3), z: 1 };

    return [b1, b2, b3].map((b) => mul(b, scale));
  }

  function getInverseBases(scale: number): Vec[] {
    const b1 = { x: 1 / Math.sqrt(3), y: -1 / Math.sqrt(3), z: 0 };
    const b2 = { x: -1, y: -1, z: 0 };
    const b3 = { x: -1, y: -1, z: 1 };

    return [b1, b2, b3].map((b) => mul(b, scale));
  }
};

new P5(sketch);
