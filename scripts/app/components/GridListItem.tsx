import classJoin from 'classjoin';
import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';

/**
 * Component Properties.
 */
interface GridListItemProps
{
	/** URI of the image */
	image: string;
	/** Is this item is currently selected? */
	current: boolean;
	/** Handle selection */
	onSelect(): void;
}

/**
 * Component State.
 */
interface GridListItemState
{
	[key: string]: void;
}

/**
 * Элемент списка вида сеткой.
 */
class GridListItem extends StyledComponent<GridListItemProps, GridListItemState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-grid-list-item';
	
	/**
	 * Render component.
	 */
	public render(
		{image, current, onSelect}: GridListItemProps,
	): JSX.Element
	{
		return (
			<li
				class={classJoin( {current}, [GridListItem.CSS_NAME] )}
				hidden={!GridListItem.cssLoaded}
				onClick={onSelect}
			>
				<img src={image} alt="" />
			</li>
		);
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
