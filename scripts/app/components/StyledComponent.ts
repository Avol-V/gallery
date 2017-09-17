import {Component} from 'preact';
import loadCss from '~/app/utils/loadCss';

/**
 * Component with personal stylesheet file.
 */
abstract class StyledComponent<TProps, TState>
	extends Component<TProps, TState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string;
	
	/**
	 * Is CSS file already loaded?
	 */
	protected static cssLoaded: boolean = false;
	
	/**
	 * Component with personal stylesheet file.
	 */
	public constructor( props: TProps )
	{
		super( props );
		
		const self = this.constructor as typeof StyledComponent;
		
		if ( !self.cssLoaded )
		{
			loadCss( self.CSS_NAME )
				.then(
					() =>
					{
						self.cssLoaded = true;
						this.forceUpdate();
					},
				)
				.catch( ( reason ) => console.error( reason ) );
		}
	}
	
}

/**
 * Module.
 */
export {
	StyledComponent as default,
};
