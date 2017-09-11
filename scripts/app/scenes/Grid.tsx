import {Component, h} from 'preact';
import GridList from '~/app/components/GridList';
import GridSidebar from '~/app/components/GridSidebar';
import {GalleryAlbum} from '~/app/utils/readGalleryFile';

/**
 * Component Properties.
 */
interface GridProps
{
	/** Gallery album */
	album: GalleryAlbum;
	/** Index of the selected picture */
	currentPictureIndex?: number;
	/**
	 * Handle selection of the picture.
	 * 
	 * @param index Index of the picture in array.
	 */
	onSelectPicture( index: number ): void;
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
	public render(
		{album, currentPictureIndex, onSelectPicture}: GridProps,
		// state: GridState,
	): JSX.Element
	{
		return (
			<main>
				<GridSidebar
					picture={
						( currentPictureIndex != null )
						? album.pictures[currentPictureIndex]
						: undefined
					}
				/>
				<GridList
					pictures={album.pictures}
					currentPictureIndex={currentPictureIndex}
					onSelectPicture={onSelectPicture}
				/>
			</main>
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
