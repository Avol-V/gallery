import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
import {ViewMode} from '~/app/Root';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';
import ImageWithPreview from './ImageWithPreview';

/**
 * Component Properties.
 */
interface LoupeWindowProps
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
interface LoupeWindowState
{
	[key: string]: void;
}

/**
 * Picture window for loup view.
 */
class LoupeWindow extends StyledComponent<LoupeWindowProps, LoupeWindowState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-loupe-window';
	/**
	 * Size of the image in pixels.
	 */
	private static readonly IMAGE_SIZE: number = 1280;
	
	/**
	 * Render component.
	 */
	public render(
		{pictures, currentPictureIndex}: LoupeWindowProps,
	): JSX.Element
	{
		const picture = pictures[currentPictureIndex || 0];
		
		const pictureWidth = picture.width || 0;
		const pictureHeight = picture.height || 0;
		const landscape = ( pictureWidth > pictureHeight );
		const ratio = (
			landscape
			? pictureHeight / pictureWidth
			: pictureWidth / pictureHeight
		);
		let width: number | undefined;
		let height: number | undefined;
		
		if ( isFinite( ratio ) )
		{
			if ( landscape )
			{
				width = LoupeWindow.IMAGE_SIZE;
				height = Math.round( width * ratio );
			}
			else
			{
				height = LoupeWindow.IMAGE_SIZE;
				width = Math.round( height * ratio );
			}
		}
		
		return (
			<div class={LoupeWindow.CSS_NAME} hidden={!LoupeWindow.cssLoaded}>
				<ImageWithPreview
					src={picture.image.normal}
					preview={picture.image.thumbnail}
					width={width}
					height={height}
				/>
				<div class="controls">
					<button type="button"
						class="close"
						onClick={this.onCloseClick}
					>
						Закрыть
					</button>
					<button type="button"
						class="prev"
						disabled={currentPictureIndex === 0}
						onClick={this.onPrevClick}
					>
						←
					</button>
					<button type="button"
						class="next"
						disabled={currentPictureIndex === pictures.length}
						onClick={this.onNextClick}
					>
						→
					</button>
				</div>
			</div>
		);
	}
	
	/**
	 * On next picture click.
	 */
	private onNextClick = (): void =>
	{
		let nextIndex = ( this.props.currentPictureIndex || 0 ) + 1;
		
		if ( nextIndex > this.props.pictures.length )
		{
			nextIndex = this.props.pictures.length;
		}
		
		this.props.onSelectPicture( nextIndex );
	}
	
	/**
	 * On previous picture click.
	 */
	private onPrevClick = (): void =>
	{
		let prevIndex = ( this.props.currentPictureIndex || 0 ) - 1;
		
		if ( prevIndex < 0 )
		{
			prevIndex = 0;
		}
		
		this.props.onSelectPicture( prevIndex );
	}
	
	/**
	 * On close view click.
	 */
	private onCloseClick = (): void =>
	{
		this.props.onChangeView( ViewMode.GRID );
	}
}

/**
 * Module.
 */
export {
	LoupeWindow as default,
	LoupeWindowProps,
	LoupeWindowState,
};
