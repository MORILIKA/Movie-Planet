import type { Metadata } from "next";

import "./globals.css";
import "./globalIcon.css";
import { Providers } from "./providers";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
	title: "電影星球 - 最新電影資訊",
	keywords: "電影, 電影資料庫, 影評, 影單",
	description: "最新電影資訊隨你看",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-hant" className="dark">
			<body>
				<div className="h-[100vh] overflow-y-auto" id="global-scroll-container">
					<Providers>
						<Navbar />

						{children}
					</Providers>
				</div>
			</body>
		</html>
	);
}
