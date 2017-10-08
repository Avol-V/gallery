import classJoin from 'classjoin';
import {Component, h} from 'preact';

/**
 * Component Properties.
 */
interface ImageWithPreviewProps
{
	src: string;
	preview: string;
	width?: string | number;
	height?: string | number;
	alt?: string;
}

/**
 * Component State.
 */
interface ImageWithPreviewState
{
	/** Is image loaded? */
	loaded: boolean;
}

/**
 * Image with preview.
 */
class ImageWithPreview extends Component<ImageWithPreviewProps, ImageWithPreviewState>
{
	/**
	 * Instance to load image in background.
	 */
	private loadedImage: HTMLImageElement = new Image();
	
	/**
	 * Image with preview.
	 */
	public constructor( props: ImageWithPreviewProps )
	{
		super( props );
		
		this.state = {
			loaded: false,
		};
		this.loadedImage.onload = this.onImageLoaded;
	}
	
	/**
	 * Rendered component mounted to the DOM.
	 */
	public componentDidMount(): void
	{
		this.loadedImage.src = this.props.src;
	}
	
	/**
	 * Before component will be unmounted and destroyed.
	 */
	public componentWillUnmount(): void
	{
		delete this.loadedImage.onload;
		delete this.loadedImage;
	}
	
	/**
	 * Before new props get accepted.
	 */
	public componentWillReceiveProps( nextProps: ImageWithPreviewProps ): void
	{
		if ( nextProps.src !== this.props.src )
		{
			this.setState( {loaded: false} );
			this.loadedImage.src = nextProps.src;
		}
	}
	
	/**
	 * Render component.
	 */
	public render(
		{src, preview, width, height, alt}: ImageWithPreviewProps,
		{loaded}: ImageWithPreviewState,
	): JSX.Element
	{
		return (
			<img
				class={classJoin( {loading: !loaded} ) || undefined}
				src={loaded ? src : preview}
				width={width}
				height={height}
				alt={alt || ''}
			/>
		);
	}
	
	/**
	 * Handle image loading.
	 */
	private onImageLoaded = (): void =>
	{
		this.setState( {loaded: true} );
	}
}

/**
 * Module.
 */
export {
	ImageWithPreview as default,
	ImageWithPreviewProps,
	ImageWithPreviewState,
};
