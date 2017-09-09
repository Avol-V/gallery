import {Component, h} from 'preact';
import Grid from '~/app/scenes/Grid';
import readGalleryFile, {GalleryAlbum} from '~/app/utils/readGalleryFile';

/**
 * Component Properties.
 */
interface RootProps
{
	/** Название галереи */
	galleryName: string;
}

/**
 * Component State.
 */
interface RootState
{
	/** Gallery album */
	album: GalleryAlbum;
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
	public render( _props: RootProps, {album}: RootState ): JSX.Element
	{
		return (
			<Grid album={album} />
		);
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
