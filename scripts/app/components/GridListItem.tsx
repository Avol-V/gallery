import classJoin from 'classjoin';
import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
import {ViewMode} from '~/app/Root';

/**
 * Component Properties.
 */
interface GridListItemProps
{
	/** Index of the picture in array */
	index: number;
	/** URI of the image */
	image: string;
	/** Is this item is currently selected? */
	current: boolean;
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
interface GridListItemState
{
	[key: string]: void;
}

/**
 * Picture element for grid view.
 */
class GridListItem extends StyledComponent<GridListItemProps, GridListItemState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-grid-list-item';
	/**
	 * Element reference.
	 */
	private element: HTMLElement;
	
	/**
	 * Rendered component mounted to the DOM.
	 */
	public componentDidMount(): void
	{
		if ( !this.props.current )
		{
			return;
		}
		
		// Async wait.
		setTimeout(
			// Render wait.
			() => requestAnimationFrame(
				() =>
				{
					if ( this.element )
					{
						const top = this.element.getBoundingClientRect().top;
						
						// tslint:disable-next-line:no-non-null-assertion
						this.element.parentElement!.scrollBy( 0, top );
					}
				},
			),
			0,
		);
	}
	
	/**
	 * Render component.
	 */
	public render(
		{image, current}: GridListItemProps,
	): JSX.Element
	{
		return (
			<li
				class={classJoin( {current}, [GridListItem.CSS_NAME] )}
				hidden={!GridListItem.cssLoaded}
				onClick={this.onClick}
				ref={this.refElement}
			>
				<img src={image} alt="" />
			</li>
		);
	}
	
	/**
	 * Handle item click.
	 */
	private onClick = (): void =>
	{
		const {index, current, onSelectPicture, onChangeView} = this.props;
		
		if ( current )
		{
			onChangeView( ViewMode.LOUPE );
		}
		else
		{
			onSelectPicture( index );
		}
	}
	
	/**
	 * Save reference to component root element.
	 */
	private refElement = ( element: HTMLElement ): void =>
	{
		this.element = element;
	}
}

/**
 * Module.
 */
export {
	GridListItem as default,
	GridListItemProps,
	GridListItemState,
};
