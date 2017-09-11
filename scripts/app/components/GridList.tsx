import {h} from 'preact';
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
 * Список изображений вида сеткой.
 */
function GridList(
	{pictures, currentPictureIndex, onSelectPicture}: GridListProps,
): JSX.Element
{
	return (
		<ul>
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

/**
 * Module.
 */
export {
	GridList as default,
	GridListProps,
};
