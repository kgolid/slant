import { Pane } from 'tweakpane';
import * as tome from 'chromotome';
import PARAMS from './params';

export default function (resetFn: Function) {
  const pane = new Pane({ title: 'Slant Settings' });
  pane.addInput(PARAMS, 'sunPosition', {
    label: 'Sun position',
    picker: 'inline',
    expanded: true,
    x: {
      min: -1,
      max: 1,
    },
    y: {
      min: -1,
      max: 1,
    },
  });
  pane.addInput(PARAMS, 'mouseControlsSun', { label: 'Mouse controls sun' });

  pane.addInput(PARAMS, 'sunHeight', {
    label: 'Sun height',
    step: 50,
    min: 50,
    max: 500,
  });

  pane.addInput(PARAMS, 'scale', {
    label: 'Scale',
    step: 0.1,
    min: 0.5,
    max: 2.5,
  });
  pane.addInput(PARAMS, 'noiseMagnitude', {
    label: 'Noise Magnitude',
    step: 0.5,
    min: 0,
    max: 5,
  });
  pane.addInput(PARAMS, 'mainPalette', {
    label: 'Main palette',
    options: Object.assign({}, ...tome.getNames().map((n) => ({ [n]: n }))),
  });
  pane.addInput(PARAMS, 'secondPalette', {
    label: 'Secondary palette',
    options: Object.assign({}, ...tome.getNames().map((n) => ({ [n]: n }))),
  });
  pane.addInput(PARAMS, 'contrastPalette', {
    label: 'Contrast palette',
    options: Object.assign({}, ...tome.getNames().map((n) => ({ [n]: n }))),
  });

  const randomize_button = pane.addButton({ title: 'Randomize Palettes' });
  randomize_button.on('click', () => {
    randomizePalettes();
    pane.refresh();
  });

  const reset_button = pane.addButton({ title: 'Reset Grid' });
  reset_button.on('click', () => resetFn());
}

function randomizePalettes() {
  PARAMS.mainPalette = tome.get().name;
  PARAMS.secondPalette = tome.get().name;
  PARAMS.contrastPalette = tome.get().name;
}
