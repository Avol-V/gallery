import alias from 'rollup-plugin-alias';
import minify from 'rollup-plugin-babel-minify';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

export default {
	input: './app/index.ts',
	output: {
		file: '../public/scripts/main.js',
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		sourcemaps(),
		alias(
			{
				'resolve': ['.ts', '.tsx', '.js', '.jsx'],
				'~': __dirname,
				'classjoin': '../node_modules/classjoin/es2015/index.js',
			}
		),
		nodeResolve(
			{
				jsnext: true,
				main: true,
				browser: true,
			}
		),
		typescript(
			{
				typescript: require('typescript'),
			}
		),
		minify(
			{
				comments: false,
			}
		),
	],
};
