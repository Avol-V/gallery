'use strict';

const Gulp = require( 'gulp' );

function cleanExit()
{
	process.exit();
}

// Catch ctrl-c
process.on( 'SIGINT', cleanExit );
// Catch kill
process.on( 'SIGTERM', cleanExit );

function getTask( name, extra )
{
	return require( './gulp-tasks/' + name )( Gulp, extra );
}

Gulp.task( 'component-styles', getTask( 'component-styles' ) );

Gulp.task(
	'default',
	[
		'component-styles',
	]
);
