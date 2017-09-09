import {h} from 'preact';

/**
 * Component Properties.
 */
interface GridListItemProps
{
	/** URI изображения */
	image: string;
}

/**
 * Элемент списка вида сеткой.
 */
function GridListItem( {image}: GridListItemProps ): JSX.Element
{
	return (
		<li>
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
