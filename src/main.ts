import P5 from 'p5';
import { drawGrid } from './display';
import { createGrid } from './grid';
import { Cell, Vec } from './interfaces.js';
import { reset } from './random';
import { mul, translateWithBase } from './vector';
import createGUI from './gui';
import PARAMS from './params';

let sketch = function (p: P5) {
  const DIMX = Math.min(window.innerHeight, window.innerWidth) * 0.71; //A4
  const DIMY = Math.min(window.innerHeight, window.innerWidth);
  const CENTER = { x: DIMX / 2, y: DIMY / 2 };

  const scale = Math.min(DIMX, DIMY) / 1200;

  let grid: Cell[];

  p.setup = function () {
    p.createCanvas(DIMX, DIMY);
    p.background(0, 50, 50);
    p.noStroke();
    p.pixelDensity(4);
    p.fill(255);

    resetGrid();
    draw();
    createGUI(resetGrid, draw);
  };

  p.draw = function () {
    if (PARAMS.mouseControlsSun) {
      draw();
    }
  };

  function draw() {
    const bases = getBases(PARAMS.zoom * scale);
    const invbases = getInverseBases(1 / PARAMS.zoom);
    const sun = translateWithBase(getSunPos(), invbases);
    const palettes = [PARAMS.palette1, PARAMS.palette2, PARAMS.palette3];
    const paletteLevels = [PARAMS.palette1Levels, PARAMS.palette2Levels, PARAMS.palette3Levels];

    p.push();
    p.background(0);
    p.translate(CENTER.x, CENTER.y);
    drawGrid(p, bases, sun, grid, palettes, paletteLevels, PARAMS.stroke, scale * PARAMS.zoom);
    p.pop();
  }

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
    grid = createGrid();
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
    const rot = (PARAMS.rotation * Math.PI) / 12;

    const PHI1 = -Math.PI / 6 + rot;
    const PHI2 = -(5 * Math.PI) / 6 + rot;
    const PHI3 = -Math.PI / 2 + rot;

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
