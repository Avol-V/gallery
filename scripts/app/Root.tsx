import {Component, h} from 'preact';
import Grid from '~/app/scenes/Grid';
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
		};
		
		this.fetchAlbum();
	}
	
	/**
	 * Rendered component mounted to the DOM.
	 */
	public componentDidMount(): void
	{
		
	}
	
	/**
	 * Before component will be unmounted and destroyed.
	 */
	public componentWillUnmount(): void
	{
		
	}
	
	/**
	 * Render component.
	 */
	public render(
		_props: RootProps,
		{album, currentPictureIndex}: RootState,
	): JSX.Element
	{
		return (
			<Grid
				album={album}
				currentPictureIndex={currentPictureIndex}
				onSelectPicture={this.onSelectPicture}
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
	 * Fetch album data.
	 */
	private async fetchAlbum(): Promise<void>
	{
		const album = await readGalleryFile( this.props.galleryName );
		
		this.setState( {album} );
	}
}

// /**
//  * Корневой элемент приложения.
//  */
// // tslint:disable-next-line:variable-name
// const RootElement = <Root />;

/**
 * Module.
 */
export {
	Root as default,
	RootProps,
	RootState,
	// RootElement,
};
