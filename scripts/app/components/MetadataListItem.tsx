import {h} from 'preact';

/**
 * Component Properties.
 */
interface MetadataListItemProps
{
	/** Internal name */
	name: string;
	/** Item title */
	title: string;
	/** Item description */
	description: string;
}

/**
 * Item of the list of picture metadata.
 */
function MetadataListItem(
	{name, title, description}: MetadataListItemProps,
): JSX.Element
{
	return (
		<div class={name}>
			<dt>{title}</dt>
			<dd>{description}</dd>
		</div>
	);
}

/**
 * Module.
 */
export {
	MetadataListItem as default,
	MetadataListItemProps,
};
