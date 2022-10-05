import P5 from 'p5';
import { leftShape, rightShape, topShape } from './cell';
import { Cell, Shape, Vec } from './interfaces';
import { illuminanceOfShape } from './light';
import { translateWithBase } from './vector';
import chroma from 'chroma-js';
import * as tome from 'chromotome';

const number_of_colors = 50;

export function drawGrid(
  p: P5,
  bases: Vec[],
  sun: Vec,
  cells: Cell[],
  paletteNames: string[]
): void {
  const colorScales = paletteNames.map((n) => createColorScale(n));
  for (const cell of cells) {
    drawCell(p, sun, bases, cell, colorScales[cell.col]);
  }
}

export function drawCell(p: P5, sun: Vec, bases: Vec[], cell: Cell, cols: string[]): void {
  drawShape(p, bases, sun, topShape(cell), cols);
  drawShape(p, bases, sun, leftShape(cell), cols);
  drawShape(p, bases, sun, rightShape(cell), cols);
}

function drawShape(p: P5, bases: Vec[], sun: Vec, shape: Shape, cols: string[]) {
  p.fill(cols[Math.floor(illuminanceOfShape(sun, shape) * number_of_colors)]);

  const vertices = [shape.a, shape.b, shape.c, shape.d];
  p.beginShape();
  for (let vertex of vertices) {
    let t = translateWithBase(vertex, bases);
    p.vertex(t.x, t.y);
  }
  p.endShape();
}

function createColorScale(name: string) {
  const palette = tome.get(name).colors;
  palette.sort((a: string, b: string) => chroma(a).luminance() - chroma(b).luminance());
  return chroma.scale(palette).mode('lch').colors(number_of_colors);
}
