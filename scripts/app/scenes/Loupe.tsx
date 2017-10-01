import {h} from 'preact';
import LoupeSidebar from '~/app/components/LoupeSidebar';
import LoupeWindow from '~/app/components/LoupeWindow';
import StyledComponent from '~/app/elements/StyledComponent';
import {GalleryAlbum} from '~/app/utils/readGalleryFile';

/**
 * Component Properties.
 */
interface LoupeProps
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
interface LoupeState
{
	[key: string]: void;
}

/**
 * Loupe view.
 */
class Loupe extends StyledComponent<LoupeProps, LoupeState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-loupe';
	
	/**
	 * Render component.
	 */
	public render(
		{album, currentPictureIndex, onSelectPicture}: LoupeProps,
	): JSX.Element
	{
		return (
			<main class={Loupe.CSS_NAME} hidden={!Loupe.cssLoaded}>
				<LoupeSidebar
					picture={
						( currentPictureIndex != null )
						? album.pictures[currentPictureIndex]
						: undefined
					}
				/>
				<LoupeWindow
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
	Loupe as default,
	LoupeProps,
	LoupeState,
};
