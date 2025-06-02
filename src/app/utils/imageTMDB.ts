// 統一處理TMDB圖片網址
interface ImageTMDB {
	src: string;
	width?: number;
}
const imageTMDB = ({ src, width = 1280 }: ImageTMDB): string => {
	if (width > 1280) width = 1280;
	const imageDomain = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
	const url = `${imageDomain}/t/p/w${width}${src}`;
	return url;
};

export default imageTMDB;
