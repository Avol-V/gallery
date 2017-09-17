/**
 * Already loaded CSS files.
 */
const alreadyLoaded = new Set<string>();

/**
 * Dynamically load CSS file.
 * 
 * @param name CSS file name (without path end extension).
 */
function loadCss( name: string ): Promise<void>
{
	if ( alreadyLoaded.has( name ) )
	{
		return Promise.resolve();
	}
	
	alreadyLoaded.add( name );
	
	const link = document.createElement( 'link' );
	const promise = new Promise<void>(
		( resolve, reject ) =>
		{
			// tslint:disable-next-line:no-unnecessary-callback-wrapper
			link.onload = () => resolve();
			// tslint:disable-next-line:no-unnecessary-callback-wrapper
			link.onerror = () => reject();
		},
	);
	
	link.href = `styles/${name}.css`;
	link.rel = 'stylesheet';
	document.head.appendChild( link );
	
	return promise;
}

/**
 * Module.
 */
export {
	loadCss as default,
};
