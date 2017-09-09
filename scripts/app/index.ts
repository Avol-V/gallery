import {h, render} from 'preact';
import Root from './Root';

const rootElement = h( Root, {galleryName: 'gallery'} );

render( rootElement, document.body );
