import { NextRequest } from "next/server"; // 引入 NextRequest

// 為了保護 TMDB_ACCESS_TOKEN 不暴露於前端，自定義一個 API route 來轉接TMDB API 的請求請求
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
	// 使用 NextRequest 類型
	const baseURL = process.env.NEXT_PUBLIC_API_TMDB_URL;

	// 使用 request.nextUrl 來解析查詢參數，避免路徑問題
	const path = request.nextUrl.searchParams.get("path");
	if (!path) {
		return new Response(JSON.stringify({ error: "Path is required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	const url = `${baseURL}${path}`;
	const tmdbRes = await fetch(url, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
		},
		cache: "force-cache",
		next: { revalidate: 3600 },
	});

	const data = await tmdbRes.json();
	return new Response(JSON.stringify(data), {
		status: tmdbRes.status,
		headers: { "Content-Type": "application/json" },
	});
}
