import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'client/build/client/django-formset.js',
  output: {
    file: 'formset/static/formset/js/django-formset.js',
    format: 'cjs',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    commonjs(),
    replace({
        'Reflect.decorate': 'undefined',
        'preventAssignment': true,
    }),
    resolve(),
    scss({
      include: ["/**/*.css", "/**/*.scss"],
      output: "formset/static/css/bundle.css",
      failOnError: true,
    }),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
