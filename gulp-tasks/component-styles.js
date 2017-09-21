'use strict';

/**
 * Task for build styles for components.
 * 
 * @param {gulp} Gulp Gulp instance
 * @returns Task function
 */
function main( Gulp )
{
	return () =>
	{
		const Path = require( 'path' );
		const rootDir = Path.resolve( __dirname, '..' );
		
		const importOptions = {
			root: rootDir,
			resolve: ( path ) => (
					/^~\//.test( path )
					? Path.join( rootDir, 'styles', path )
					: path
				),
			skipDuplicates: false,
		};
		const externalVarsOptions = {
			data: getJsonVars(
				Path.join( rootDir, 'styles/_globals' )
			),
			prefix: '$global.',
		};
		const renameHandler = ( path ) =>
		{
			path.dirname = '';
			path.basename = 'c-' + convertCamelToKebabCase( path.basename );
			path.extname = '.css';
		};
		
		return Gulp.src(
			Path.join( rootDir, 'scripts/app/**/*.pcss' )
		)
			.pipe( require( 'gulp-plumber' )( {errorHandler} ) )
			.pipe(
				require( 'gulp-postcss' )(
					[
						require( 'postcss-import' )( importOptions ),
						require( 'postcss-external-vars' )( externalVarsOptions ),
						require( 'postcss-sassy-mixins' ),
						require( 'postcss-advanced-variables' ),
						require( 'postcss-media-minmax' ),
						require( 'postcss-nested' ),
						require( 'postcss-color-function' ),
						require( 'postcss-font-weights' ),
						require( 'postcss-selector-matches' ),
						require( 'postcss-selector-not' ),
						require( 'postcss-calc' )( {precision: 2} ),
						require( 'postcss-round-subpixels' ),
						require( 'autoprefixer' ),
					]
				)
			)
			.pipe( require( 'gulp-csso' )( {comments: false} ) )
			.pipe( require( 'gulp-rename' )( renameHandler ) )
			.pipe( Gulp.dest( Path.join( rootDir, 'public/styles/' ) ) );
	};
}

/**
 * Handle errors in Gulp stream.
 * 
 * @param {*} error Error object.
 */
function errorHandler( error )
{
	console.error( String( error ) );
	this.emit( 'end' );
}

/**
 * Get variables from JSON files in object with filenames as keys.
 * 
 * @param {string} dir Path to directory with JSON files.
 * @returns {{[key: string]: any}}
 */
function getJsonVars( dir )
{
	const Fs = require( 'fs' );
	const Path = require( 'path' );
	
	const output = {};
	
	const files = Fs.readdirSync( dir );
	
	if ( !files || ( files.length === 0 ) )
	{
		return output;
	}
	
	for ( const file of files )
	{
		if ( file.substr( -5 ) !== '.json' )
		{
			continue;
		}
		
		const name = file.slice( 0, -5 );
		const data = require( Path.join( dir, file ) );
		
		if ( name && data )
		{
			output[name] = data;
		}
	}
	
	return output;
}

/**
 * Convert camelCase or PascalCase name to kebab-case.
 * 
 * @param {string} value Name in camelCase.
 * @returns {string} Name in kebab-case.
 */
function convertCamelToKebabCase( value )
{
	return value.replace( /(.)([A-Z][^A-Z])/g, '$1-$2' ).toLowerCase();
}

module.exports = main;
