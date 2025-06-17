// 統一處理TMDB圖片網址
interface ImageTMDB {
	src?: string;
	width?: number;
}
const noImagePlaceholder = "/No-Image-Placeholder.svg";
const imageTMDB = ({ src, width = 1280 }: ImageTMDB): string => {
	if (!src || typeof src !== "string" || src.trim() === "") {
		return noImagePlaceholder;
	}
	if (width > 1280) width = 1280;
	const imageDomain = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
	const cleanSrc = src.trim();
	const url = `${imageDomain}/t/p/w${Math.round(width)}${cleanSrc}`;
	return url;
};

export default imageTMDB;
