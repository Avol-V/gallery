import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
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
 * Component State.
 */
interface GridSidebarState
{
	[key: string]: void;
}

/**
 * Sidebar for grid view.
 */
class GridSidebar extends StyledComponent<GridSidebarProps, GridSidebarState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-grid-sidebar';
	
	/**
	 * Render component.
	 */
	public render( {picture}: GridSidebarProps ): JSX.Element
	{
		return (
			<aside class={GridSidebar.CSS_NAME} hidden={!GridSidebar.cssLoaded}>
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
}

/**
 * Module.
 */
export {
	GridSidebar as default,
	GridSidebarProps,
	GridSidebarState,
};
