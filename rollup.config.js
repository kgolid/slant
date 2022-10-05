import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/main.ts',
    output: {
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
];
