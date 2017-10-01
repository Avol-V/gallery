import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';
import MetadataList from './MetadataList';
import MetaHeader from './MetaHeader';

/**
 * Component Properties.
 */
interface LoupeSidebarProps
{
	/** Picture data */
	picture?: GalleryAlbumPicture;
}

/**
 * Component State.
 */
interface LoupeSidebarState
{
	[key: string]: void;
}

/**
 * Sidebar for Loupe view.
 */
class LoupeSidebar extends StyledComponent<LoupeSidebarProps, LoupeSidebarState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-loupe-sidebar';
	
	/**
	 * Render component.
	 */
	public render( {picture}: LoupeSidebarProps ): JSX.Element
	{
		return (
			<aside class={LoupeSidebar.CSS_NAME} hidden={!LoupeSidebar.cssLoaded}>
				{
					!picture
					? ''
					: [
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
	LoupeSidebar as default,
	LoupeSidebarProps,
	LoupeSidebarState,
};
