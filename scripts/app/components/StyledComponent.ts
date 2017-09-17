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
	public static get cssName(): string
	{
		return convertCamelToKebabCase( this.name );
	}
	
	/**
	 * Is CSS file already loaded?
	 */
	private static cssLoaded: boolean = false;
	
	/**
	 * Component with personal stylesheet file.
	 */
	public constructor( props: TProps )
	{
		super( props );
		
		const self = this.constructor as typeof StyledComponent;
		
		if ( !self.cssLoaded )
		{
			loadCss( self.cssName )
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
 * Memoized results of convertCamelToKebabCase function.
 */
const camelToKebabMemo = new Map<string, string>();

/**
 * Convert camelCase or PascalCase name to kebab-case.
 * 
 * @param value Name in camelCase.
 * @returns Name in kebab-case.
 */
function convertCamelToKebabCase( value: string ): string
{
	if ( camelToKebabMemo.has( value ) )
	{
		// tslint:disable-next-line:no-non-null-assertion
		return camelToKebabMemo.get( value )!;
	}
	
	const result = value.replace( /(.)([A-Z][^A-Z])/g, '$1-$2' ).toLowerCase();
	
	camelToKebabMemo.set( value, result );
	
	return result;
}

/**
 * Module.
 */
export {
	StyledComponent as default,
};
