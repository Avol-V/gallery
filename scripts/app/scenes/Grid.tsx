import {h} from 'preact';
import GridList from '~/app/components/GridList';
import GridSidebar from '~/app/components/GridSidebar';
import StyledComponent from '~/app/elements/StyledComponent';
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
	[key: string]: void;
}

/**
 * Вид сеткой.
 */
class Grid extends StyledComponent<GridProps, GridState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-grid';
	
	/**
	 * Render component.
	 */
	public render(
		{album, currentPictureIndex, onSelectPicture}: GridProps,
		// state: GridState,
	): JSX.Element
	{
		return (
			<main class={Grid.CSS_NAME} hidden={!Grid.cssLoaded}>
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
