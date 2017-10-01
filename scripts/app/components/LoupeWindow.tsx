import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';

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
	 * Render component.
	 */
	public render(
		{pictures, currentPictureIndex}: LoupeWindowProps,
	): JSX.Element
	{
		const picture = pictures[currentPictureIndex || 0];
		
		return (
			<div class={LoupeWindow.CSS_NAME} hidden={!LoupeWindow.cssLoaded}>
				<img src={picture.image.normal} alt="" />
				<div class="controls">
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
}

/**
 * Module.
 */
export {
	LoupeWindow as default,
	LoupeWindowProps,
	LoupeWindowState,
};
