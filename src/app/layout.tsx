import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import "./globalIcon.css";
import { Providers } from "./providers";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
	title: "電影星球 - 最新電影資訊",
	keywords: "電影, 電影資料庫, 影評, 電影資訊, 電影推薦, 電影搜尋",
	description:
		"最新電影資訊隨你看，電影星球提供最新的電影資料庫，讓你隨時隨地了解最新上映的電影、影評和推薦。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-Hant" className="dark">
			<body>
				<div className="h-[100vh] overflow-y-auto" id="global-scroll-container">
					<Providers>
						<Navbar />
						<Suspense>{children}</Suspense>
					</Providers>
				</div>
			</body>
		</html>
	);
}
