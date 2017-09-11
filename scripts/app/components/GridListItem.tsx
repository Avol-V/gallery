import classJoin from 'classjoin';
import {h} from 'preact';

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
 * Элемент списка вида сеткой.
 */
function GridListItem(
	{image, current, onSelect}: GridListItemProps,
): JSX.Element
{
	return (
		<li
			class={classJoin( {current} )}
			onClick={onSelect}
		>
			<img src={image} alt="" />
		</li>
	);
}

/**
 * Module.
 */
export {
	GridListItem as default,
	GridListItemProps,
};
