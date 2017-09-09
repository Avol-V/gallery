import {h} from 'preact';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';
import GridListItem from './GridListItem';

/**
 * Component Properties.
 */
interface GridListProps
{
	pictures: GalleryAlbumPicture[];
}

/**
 * Список изображений вида сеткой.
 */
function GridList( {pictures}: GridListProps ): JSX.Element
{
	return (
		<ul>
			{pictures.map(
				( picture ) => <GridListItem image={picture.image.thumbnail} />,
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
