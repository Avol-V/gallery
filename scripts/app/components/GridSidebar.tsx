import {h} from 'preact';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';
import MetadataList from './MetadataList';
import MetaHeader from './MetaHeader';

/**
 * Component Properties.
 */
interface GridSidebarProps
{
	/** Picture data */
	picture?: GalleryAlbumPicture;
}

/**
 * Sidebar for grid view.
 */
function GridSidebar( {picture}: GridSidebarProps ): JSX.Element
{
	return (
		<aside>
			{
				!picture
				? ''
				: [
					<figure class="preview">
						<img src={picture.image.preview} alt={picture.source} />
					</figure>,
					<MetaHeader picture={picture} />,
					<MetadataList picture={picture} />,
				]
			}
		</aside>
	);
}

/**
 * Module.
 */
export {
	GridSidebar as default,
	GridSidebarProps,
};
