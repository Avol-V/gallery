import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
import {ViewMode} from '~/app/Root';
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
	/**
	 * Handle changing of the current view mode.
	 * 
	 * @param view New view mode.
	 */
	onChangeView( view: ViewMode ): void;
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
		{
			pictures, currentPictureIndex, onSelectPicture, onChangeView,
		}: GridListProps,
	): JSX.Element
	{
		return (
			<ul class={GridList.CSS_NAME} hidden={!GridList.cssLoaded}>
				{pictures.map(
					( picture, index ) => (
						<GridListItem
							index={index}
							image={picture.image.thumbnail}
							current={currentPictureIndex === index}
							onSelectPicture={onSelectPicture}
							onChangeView={onChangeView}
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
