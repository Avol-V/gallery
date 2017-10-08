import {Component, h} from 'preact';
import Grid from '~/app/scenes/Grid';
import Loupe from '~/app/scenes/Loupe';
import readGalleryFile, {GalleryAlbum} from '~/app/utils/readGalleryFile';

/**
 * Component Properties.
 */
interface RootProps
{
	/** Internal name of the gallery */
	galleryName: string;
}

/**
 * Component State.
 */
interface RootState
{
	/** Gallery album */
	album: GalleryAlbum;
	/** Index of the selected picture */
	currentPictureIndex?: number;
	/** Current view mode */
	view: ViewMode;
}

/**
 * View modes.
 */
enum ViewMode
{
	GRID,
	LOUPE,
}

/**
 * Application root.
 */
class Root extends Component<RootProps, RootState>
{
	/**
	 * Application root.
	 */
	public constructor( props: RootProps )
	{
		super( props );
		
		this.state = {
			album: {
				title: '',
				pictures: [],
			},
			view: ViewMode.GRID,
		};
		
		this.fetchAlbum();
	}
	
	/**
	 * Rendered component mounted to the DOM.
	 */
	public componentDidMount(): void
	{
		window.addEventListener( 'keydown', this.onKeyDown );
	}
	
	/**
	 * Before component will be unmounted and destroyed.
	 */
	public componentWillUnmount(): void
	{
		window.removeEventListener( 'keydown', this.onKeyDown );
	}
	
	/**
	 * Render component.
	 */
	public render(
		_props: RootProps,
		{album, currentPictureIndex, view}: RootState,
	): JSX.Element
	{
		return (
			( view === ViewMode.GRID )
			? <Grid
				album={album}
				currentPictureIndex={currentPictureIndex}
				onSelectPicture={this.onSelectPicture}
				onChangeView={this.onChangeView}
			/>
			: <Loupe
				album={album}
				currentPictureIndex={currentPictureIndex}
				onSelectPicture={this.onSelectPicture}
				onChangeView={this.onChangeView}
			/>
		);
	}
	
	/**
	 * Handle selection of the picture.
	 * 
	 * @param currentPictureIndex Index of the picture in array.
	 */
	private onSelectPicture = ( currentPictureIndex: number ): void =>
	{
		this.setState( {currentPictureIndex} );
	}
	
	/**
	 * Handle changing of the current view mode.
	 * 
	 * @param view New view mode.
	 */
	private onChangeView = ( view: ViewMode ): void =>
	{
		this.setState( {view} );
	}
	
	/**
	 * Handle pressing keys on keyboard.
	 */
	private onKeyDown = ( event: KeyboardEvent ): void =>
	{
		if ( event.repeat )
		{
			return;
		}
		
		const picturesCount = this.state.album.pictures.length;
		// Default value is -1 to start from first picture when no one selected.
		const currentPictureIndex = (
			( this.state.currentPictureIndex == null )
			? -1
			: this.state.currentPictureIndex
		);
		
		const changeIndex = ( index: number ): void =>
		{
			if (
				!( index > picturesCount )
				&& !( index < 0 )
			)
			{
				this.onSelectPicture( index );
			}
		};
		
		const view = this.state.view;
		
		switch ( event.code || event.keyCode )
		{
			case 'ArrowRight':
			case 39:
			case 'Space':
			case 32:
				changeIndex( currentPictureIndex + 1 );
				break;
			
			case 'ArrowLeft':
			case 37:
				changeIndex( currentPictureIndex - 1 );
				break;
			
			case 'Enter':
			case 13:
				if ( view === ViewMode.GRID )
				{
					this.onChangeView( ViewMode.LOUPE );
				}
				break;
			
			case 'Escape':
			case 27:
				if ( view === ViewMode.LOUPE )
				{
					this.onChangeView( ViewMode.GRID );
				}
				break;
		}
	}
	
	/**
	 * Fetch album data.
	 */
	private async fetchAlbum(): Promise<void>
	{
		const album = await readGalleryFile( this.props.galleryName );
		
		this.setState( {album} );
	}
}

/**
 * Module.
 */
export {
	Root as default,
	RootProps,
	RootState,
	ViewMode,
};
