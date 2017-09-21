import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';
import GridListItem from './GridListItem';

/**
 * Component Properties.
 */
interface GridListProps
{
	/** Album pictures */
	pictures: GalleryAlbumPicture[];
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
interface GridListState
{
	[key: string]: void;
}

/**
 * Picture list for grid view.
 */
class GridList extends StyledComponent<GridListProps, GridListState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-grid-list';
	
	/**
	 * Render component.
	 */
	public render(
		{pictures, currentPictureIndex, onSelectPicture}: GridListProps,
	): JSX.Element
	{
		return (
			<ul class={GridList.CSS_NAME} hidden={!GridList.cssLoaded}>
				{pictures.map(
					( picture, index ) => (
						<GridListItem
							image={picture.image.thumbnail}
							current={currentPictureIndex === index}
							onSelect={() => onSelectPicture( index )}
						/>
					),
				)}
			</ul>
		);
	}
}

/**
 * Module.
 */
export {
	GridList as default,
	GridListProps,
	GridListState,
};
