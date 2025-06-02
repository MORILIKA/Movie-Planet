import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "電影星球 - 最新電影資訊",
	keywords: "電影, 電影資料庫, 影評, 影單",
	description: "最新電影資訊隨你看",
};
export default function IndexLayout({
	playnow,
	topRated,
	upComing,
	children,
}: Readonly<{
	playnow: React.ReactNode;
	topRated: React.ReactNode;
	upComing: React.ReactNode;
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
			{playnow}
			{topRated}
			{upComing}
		</>
	);
}
