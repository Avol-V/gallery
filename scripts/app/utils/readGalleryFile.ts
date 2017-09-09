/**
 * Read gallery data from file.
 * 
 * @param name Name of the gallery (JSON file name without path and extension).
 */
async function readGalleryFile( name: string ): Promise<GalleryAlbum>
{
	const fileName = `data/${name}.json`;
	const response = await fetch( fileName );
	
	if ( !response.ok )
	{
		throw new URIError( `Can’t fetch file "${fileName}".` );
	}
	
	const contentType = response.headers.get( 'content-type' );
	
	if (
		!contentType
		|| ( contentType.indexOf( 'application/json' ) === -1 )
	)
	{
		throw new Error(
			`Wrong file type! "${fileName}" is "${contentType}", "application/json" is required.`,
		);
	}
	
	const json = await response.json();
	
	return json;
}

/**
 * Gallery album data.
 */
interface GalleryAlbum
{
	/** Title */
	title: string;
	/** Description */
	description?: string;
	/** Path to cover image */
	cover?: string;
	/** Pictures */
	pictures: GalleryAlbumPicture[];
}

/**
 * Gallery album picture with image variants and metadata.
 */
interface GalleryAlbumPicture
{
	/** Идентификатор */
	id: number | string;
	/** Название */
	title?: string;
	/** Описание */
	caption?: string;
	/** Автор */
	creator?: string;
	/** Метки */
	keywords?: string[];
	/** Камера */
	camera?: string;
	/** Объектив */
	lens?: string;
	/** Выдержка */
	shutter?: string;
	/** Диафрагма */
	aperture?: string;
	/** Чувствительность (ISO) */
	iso?: string;
	/** Режим съёмки */
	program?: string;
	/** Компенсация экспозиции */
	exposureBias?: string;
	/** Вспышка */
	flash?: string;
	/** Фокусное расстояние */
	focalLength?: string;
	/** Фокусное расстояние в 35 мм эквиваленте */
	focalLength35mm?: string;
	/** GPS координаты */
	gps?: GalleryAlbumPictureGps;
	/** Рейтинг, 0-5 */
	rating: number;
	/** Время съёмки */
	timestamp: number;
	/** Смещение часового пояса, минут */
	timezoneOffset: number;
	/** Ширина оригинального изображения */
	width?: number;
	/** Высота оригинального изображения */
	height?: number;
	/** Имя исходного файла */
	source?: string;
	/** Размер оригинального изображения, байт */
	size?: number;
	/** Файлы изображений */
	image: GalleryAlbumPictureImage;
}

/**
 * Файлы изображений галереи.
 */
interface GalleryAlbumPictureImage
{
	/** Изображение оригинального размера */
	original: string;
	/** Изображение, уменьшенное до 1280 пикселей */
	normal: string;
	/** Изображение, уменьшенное до 300 пикселей */
	preview: string;
	/** Изображение, уменьшенное до 150 пикселей */
	thumbnail: string;
}

/**
 * GPS координаты.
 */
interface GalleryAlbumPictureGps
{
	/** Широта */
	latitude: number;
	/** Долгота */
	longitude: number;
	/** Высота над уровнем моря, метров */
	altitude?: number;
}

/**
 * Module.
 */
export {
	readGalleryFile as default,
	GalleryAlbum,
	GalleryAlbumPicture,
	GalleryAlbumPictureGps,
	GalleryAlbumPictureImage,
};
