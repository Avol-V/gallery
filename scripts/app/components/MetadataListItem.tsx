import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';

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
	description: string | JSX.Element | Array<string | JSX.Element>;
}

/**
 * Component State.
 */
interface MetadataListItemState
{
	[key: string]: void;
}

/**
 * Item of the list of picture metadata.
 */
class MetadataListItem
	extends StyledComponent<MetadataListItemProps, MetadataListItemState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-metadata-list-item';
	
	/**
	 * Render component.
	 */
	public render(
		{name, title, description}: MetadataListItemProps,
	): JSX.Element
	{
		return (
			<div
				class={`${MetadataListItem.CSS_NAME} ${name}`}
				hidden={!MetadataListItem.cssLoaded}
			>
				<dt>{title}</dt>
				<dd>{description}</dd>
			</div>
		);
	}
}

/**
 * Module.
 */
export {
	MetadataListItem as default,
	MetadataListItemProps,
	MetadataListItemState,
};
