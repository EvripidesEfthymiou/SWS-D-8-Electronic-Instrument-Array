import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';

export default {
  input: 'SWSDH8AEIA.tsx',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [css({ output: 'SWSDH8AEIA.css' }), resolve(), typescript()]
}