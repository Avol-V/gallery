import {h} from 'preact';
import StyledComponent from '~/app/elements/StyledComponent';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';

/**
 * How many milliseconds in one minute.
 */
const MILLISECONDS_IN_MINUTE = 60 * 1000;

/**
 * Names of the months.
 */
const MONTHS = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
];

/**
 * Component Properties.
 */
interface MetaHeaderProps
{
	/** Picture data */
	picture: GalleryAlbumPicture;
}

/**
 * Component State.
 */
interface MetaHeaderState
{
	[key: string]: void;
}

/**
 * Header block of the picture.
 */
class MetaHeader extends StyledComponent<MetaHeaderProps, MetaHeaderState>
{
	/**
	 * Component name for CSS.
	 */
	public static readonly CSS_NAME: string = 'c-meta-header';
	
	/**
	 * Render component.
	 */
	public render(
		{
			picture: {
				title, caption, timestamp, timezoneOffset, source, width,
				height, size, image,
			},
		}: MetaHeaderProps,
	): JSX.Element
	{
		const sourceName = ( source || '' ).replace( /\.\w+$/, '' );
		const localOffset = (new Date()).getTimezoneOffset();
		const date = new Date(
			timestamp + (timezoneOffset + localOffset) * MILLISECONDS_IN_MINUTE,
		);
		const dateStr = `${date.getDate()} ${MONTHS[date.getMonth()]} ${
			date.getFullYear()}, ${date.getHours()}:${
				('0' + date.getMinutes()).slice( -2 )
			} UTC${timezoneOffset < 0 ? '' : '+'}${timezoneOffset / 60}`;
		const dateISO = (new Date( timestamp )).toISOString();
		const dimensions = (
			( width && height )
			? `${width}×${height}`
			: '?×?'
		);
		const sizeStr = (
			size
			? Math.round( size / 1024 / 1024 ) + ' М'
			: '? М'
		);
		
		return (
			<header class={MetaHeader.CSS_NAME} hidden={!MetaHeader.cssLoaded}>
				<h2>{title || sourceName}</h2>
				{
					caption
					? <p>{caption}</p>
					: ''
				}
				<time dateTime={dateISO}>{dateStr}</time>
				<div class="original">
					<a
						href={image.original}
						target="_blank"
						title={sourceName}
					>
						Открыть оригинал ({dimensions}, {sizeStr})
					</a>
				</div>
			</header>
		);
	}
}

/**
 * Module.
 */
export {
	MetaHeader as default,
	MetaHeaderProps,
	MetaHeaderState,
};
