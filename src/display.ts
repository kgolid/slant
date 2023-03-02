import P5 from 'p5';
import chroma from 'chroma-js';
import * as tome from 'chromotome';
import { cornerPos, corners, frontShape, fullShape, leftShape, rightShape, topShape } from './cell';
import { Cell, Shape, Vec } from './interfaces';
import { illuminanceOfShape } from './light';
import { translateWithBase } from './vector';
import PARAMS from './params';

export function drawGrid(
  p: P5,
  bases: Vec[],
  sun: Vec,
  cells: Cell[],
  paletteNames: string[],
  paletteLevels: number[],
  outline: boolean,
  scale: number
): void {
  const colorScales = paletteNames.map((n, i) => createColorScale(n, paletteLevels[i]));

  for (const cell of cells) {
    drawCell(p, sun, bases, cell, colorScales[cell.col], outline, scale);
  }
}

export function drawCell(
  p: P5,
  sun: Vec,
  bases: Vec[],
  cell: Cell,
  cols: string[],
  outline: boolean,
  scale: number
): void {
  const top = topShape(cell);
  const highFront = translateWithBase(top.a, bases).y < translateWithBase(top.c, bases).y;

  if (!highFront) drawShape(p, bases, sun, topShape(cell), cols);
  drawShape(p, bases, sun, leftShape(cell), cols);
  drawShape(p, bases, sun, rightShape(cell), cols);
  if (outline) {
    if (!highFront) outlineCell(p, bases, fullShape(cell), '#000', (scale * 3) / 2);
    else outlineCell(p, bases, frontShape(cell), '#000', (scale * 3) / 2);
    innerLinesCell(p, bases, corners(cell), cornerPos(cell), '#000', scale / 2);
  }
}

function drawShape(p: P5, bases: Vec[], sun: Vec, shape: Shape, cols: string[]) {
  p.fill(cols[Math.floor(illuminanceOfShape(sun, shape) * cols.length)]);
  p.noStroke();

  const vertices = [shape.a, shape.b, shape.c, shape.d];
  p.beginShape();
  for (let vertex of vertices) {
    let t = translateWithBase(vertex, bases);
    p.vertex(t.x, t.y);
  }
  p.endShape(p.CLOSE);
}

function outlineCell(p: P5, bases: Vec[], vertices: Vec[], col: string, weight: number) {
  p.stroke(col);
  p.strokeWeight(weight);
  p.noFill();

  p.beginShape();
  for (let vertex of vertices) {
    let t = translateWithBase(vertex, bases);
    p.vertex(t.x, t.y);
  }
  p.endShape(p.CLOSE);
}

function innerLinesCell(
  p: P5,
  bases: Vec[],
  vertices: Vec[],
  center: Vec,
  col: string,
  weight: number
) {
  p.stroke(col);
  p.strokeWeight(weight);
  p.noFill();

  let c = translateWithBase(center, bases);
  for (let vertex of vertices) {
    let t = translateWithBase(vertex, bases);
    p.line(c.x, c.y, t.x, t.y);
  }
}

function createColorScale(name: string, levels: number) {
  const palette = tome.get(name).colors;
  palette.sort((a: string, b: string) => chroma(a).luminance() - chroma(b).luminance());
  return chroma
    .scale(palette)
    .mode('lch')
    .colors(levels * palette.length - levels + 1);
}
