import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'lib/index.js',
  format: 'umd',
  moduleName: 'cardy',
  plugins: [
    resolve(),
    commonjs(),
  ],
  dest: 'examples/cardy.js',
};
