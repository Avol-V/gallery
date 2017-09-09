import {Component, h} from 'preact';
import GridList from '~/app/components/GridList';
import {GalleryAlbum} from '~/app/utils/readGalleryFile';

/**
 * Component Properties.
 */
interface GridProps
{
	/** Gallery album */
	album: GalleryAlbum;
}

/**
 * Component State.
 */
interface GridState
{
	
}

/**
 * Вид сеткой.
 */
class Grid extends Component<GridProps, GridState>
{
	public constructor( props: GridProps )
	{
		super( props );
	}
	
	/**
	 * Rendered component mounted to the DOM.
	 */
	public componentDidMount(): void
	{
		
	}
	
	/**
	 * Before component will be unmounted and destroyed.
	 */
	public componentWillUnmount(): void
	{
		
	}
	
	// /**
	//  * Before render, return false to skip render.
	//  */
	// public shouldComponentUpdate( props: GridProps, state: GridState ): boolean
	// {
	// 	return true;
	// }
	
	/**
	 * Render component.
	 */
	public render( {album}: GridProps/* , state: GridState */ ): JSX.Element
	{
		return (
			<GridList pictures={album.pictures} />
		);
	}
}

/**
 * Module.
 */
export {
	Grid as default,
	GridProps,
	GridState,
};
