// 為了保護 TMDB_ACCESS_TOKEN 不暴露於前端，自定義一個 API route 來轉接TMDB API 的請求請求
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
	const baseURL = process.env.NEXT_PUBLIC_API_TMDB_URL;

	// 使用拼接的方式來獲取tmdb API路徑
	const url = `${baseURL}${request.url.split("?path=")[1]}`;
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
