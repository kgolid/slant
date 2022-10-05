import { Pane } from 'tweakpane';
import * as tome from 'chromotome';
import PARAMS from './params';
import { createHash } from './util';

export default function (resetFn: Function) {
  const pane = new Pane({ title: 'Slant Settings' });
  const seedPane = pane.addFolder({ title: 'Seed Settings' });

  seedPane.addInput(PARAMS, 'seed', { label: 'Seed' }).on('change', () => resetFn());

  const seed_button = seedPane.addButton({ title: 'Randomize Seed' });
  seed_button.on('click', () => {
    randomizeSeed();
    pane.refresh();
  });

  const sunPane = pane.addFolder({ title: 'Sun Settings' });
  sunPane.addInput(PARAMS, 'sunPosition', {
    label: 'Sun position',
    picker: 'inline',
    expanded: true,
    x: {
      step: 0.1,
      min: -1,
      max: 1,
    },
    y: {
      step: 0.1,
      min: -1,
      max: 1,
    },
  });
  sunPane.addInput(PARAMS, 'mouseControlsSun', { label: 'Mouse controls sun' });

  sunPane.addInput(PARAMS, 'sunHeight', {
    label: 'Sun height',
    step: 50,
    min: 50,
    max: 500,
  });

  const cellPane = pane.addFolder({ title: 'Cell Settings' });
  cellPane.addInput(PARAMS, 'scale', {
    label: 'Scale',
    step: 0.1,
    min: 0.6,
    max: 2.5,
  });
  cellPane
    .addInput(PARAMS, 'heightRange', {
      label: 'Height Range',
      step: 1,
      min: 0,
      max: 20,
    })
    .on('change', () => resetFn());
  cellPane
    .addInput(PARAMS, 'slopeRange', {
      label: 'Slope Range',
      step: 0.01,
      min: 0,
      max: 0.2,
    })
    .on('change', () => resetFn());

  const noisePane = pane.addFolder({ title: 'Noise Settings' }).on('change', () => resetFn());
  noisePane.addInput(PARAMS, 'noiseMagnitude', {
    label: 'Noise Magnitude',
    step: 0.2,
    min: 0,
    max: 5,
  });

  noisePane.addInput(PARAMS, 'noiseScale', {
    label: 'Noise Scale',
    step: 0.01,
    min: 0.01,
    max: 0.1,
  });

  const colorPane = pane.addFolder({ title: 'Color Settings' }).on('change', () => resetFn());
  colorPane.addInput(PARAMS, 'mainPalette', {
    label: 'Main palette',
    options: Object.assign({}, ...tome.getNames().map((n) => ({ [n]: n }))),
  });
  colorPane.addInput(PARAMS, 'secondPalette', {
    label: 'Secondary palette',
    options: Object.assign({}, ...tome.getNames().map((n) => ({ [n]: n }))),
  });
  colorPane.addInput(PARAMS, 'contrastPalette', {
    label: 'Contrast palette',
    options: Object.assign({}, ...tome.getNames().map((n) => ({ [n]: n }))),
  });

  const palette_button = colorPane.addButton({ title: 'Randomize Colors' });
  palette_button.on('click', () => {
    randomizePalettes();
    pane.refresh();
  });
}

function randomizePalettes() {
  PARAMS.mainPalette = tome.get().name;
  PARAMS.secondPalette = tome.get().name;
  PARAMS.contrastPalette = tome.get().name;
}

function randomizeSeed() {
  PARAMS.seed = createHash();
}
