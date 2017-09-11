import {h} from 'preact';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';

/**
 * Component Properties.
 */
interface MetaHeaderProps
{
	/** Picture data */
	picture: GalleryAlbumPicture;
}

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
 * Header block of the picture.
 */
function MetaHeader(
	{
		picture: {title, caption, timestamp, timezoneOffset, source},
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
	
	return (
		<header>
			<h2>{title || sourceName}</h2>
			{
				caption
				? <p>{caption}</p>
				: ''
			}
			<time dateTime={dateISO}>{dateStr}</time>
		</header>
	);
}

/**
 * Module.
 */
export {
	MetaHeader as default,
	MetaHeaderProps,
};
