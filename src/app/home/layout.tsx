import type { Metadata } from "next";
import LazySection from "@/components/lazy/LazySection";

export const metadata: Metadata = {
	title: "電影星球 - 最新電影資訊",
	keywords: "電影, 電影資料庫, 影評, 影單",
	description: "最新電影資訊隨你看",
};

export default function IndexLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
			<LazySection />
		</>
	);
}
