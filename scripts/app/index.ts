import {h, render} from 'preact';
import Root from './Root';

const galleryName = window.location.pathname
	.split( '/' )
	.filter( Boolean )
	.pop();

if ( !galleryName )
{
	throw new Error( 'Gallery name is not specified!' );
}

const rootElement = h( Root, {galleryName} );

render( rootElement, document.body );
