import {h} from 'preact';
import {GalleryAlbumPicture} from '~/app/utils/readGalleryFile';
import MetadataListItem, {MetadataListItemProps} from './MetadataListItem';

/**
 * Titles for metadata items.
 */
const METADATA_TITLES = {
	camera: 'Камера',
	lens: 'Объектив',
	shutter: 'Выдержка',
	aperture: 'Диафрагма',
	iso: 'Чувствительность (ISO)',
	program: 'Режим съёмки',
	exposureBias: 'Компенсация экспозиции',
	flash: 'Вспышка',
	focalLength: 'Фокусное расстояние',
	focalLength35mm: 'для 35 мм',
	gps: 'GPS координаты',
};

/**
 * Component Properties.
 */
interface MetadataListProps
{
	/** Picture data */
	picture: GalleryAlbumPicture;
}

/**
 * List of the picture metadata.
 */
function MetadataList( {picture}: MetadataListProps ): JSX.Element
{
	const items = getMetadata( picture );
	
	return (
		<dl>
			{items.map(
				( item ) => <MetadataListItem {...item} />,
			)}
		</dl>
	);
}

/**
 * Get prepared list of the picture metadata.
 * 
 * @param picture Picture data.
 */
function getMetadata( picture: GalleryAlbumPicture ): MetadataListItemProps[]
{
	const items: MetadataListItemProps[] = [];
	
	if ( picture.camera )
	{
		items.push(
			{
				name: 'camera',
				title: METADATA_TITLES.camera,
				description: picture.camera,
			},
		);
	}
	
	if ( picture.lens )
	{
		items.push(
			{
				name: 'lens',
				title: METADATA_TITLES.lens,
				description: picture.lens,
			},
		);
	}
	
	if ( picture.aperture )
	{
		items.push(
			{
				name: 'aperture',
				title: METADATA_TITLES.aperture,
				description: picture.aperture,
			},
		);
	}
	
	if ( picture.shutter )
	{
		items.push(
			{
				name: 'shutter',
				title: METADATA_TITLES.shutter,
				description: picture.shutter,
			},
		);
	}
	
	if ( picture.focalLength )
	{
		let focalLength: string = picture.focalLength;
		
		if (
			( picture.focalLength35mm )
			&& ( picture.focalLength35mm !== picture.focalLength )
		)
		{
			focalLength += ` (${picture.focalLength35mm} ${METADATA_TITLES.focalLength35mm})`;
		}
		
		items.push(
			{
				name: 'focalLength',
				title: METADATA_TITLES.focalLength,
				description: focalLength,
			},
		);
	}
	
	if ( picture.iso )
	{
		items.push(
			{
				name: 'iso',
				title: METADATA_TITLES.iso,
				description: picture.iso,
			},
		);
	}
	
	if ( picture.exposureBias )
	{
		items.push(
			{
				name: 'exposureBias',
				title: METADATA_TITLES.exposureBias,
				description: picture.exposureBias,
			},
		);
	}
	
	if ( picture.flash )
	{
		items.push(
			{
				name: 'flash',
				title: METADATA_TITLES.flash,
				description: picture.flash,
			},
		);
	}
	
	if ( picture.program )
	{
		items.push(
			{
				name: 'program',
				title: METADATA_TITLES.program,
				description: picture.program,
			},
		);
	}
	
	return items;
}

/**
 * Module.
 */
export {
	MetadataList as default,
	MetadataListProps,
};
