import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'lib/index.js',
  output: {
    file: 'docs/cardy.js',
    format: 'iife',
    name: 'cardy',
  },
  plugins: [
    resolve(),
    commonjs(),
  ],
};
