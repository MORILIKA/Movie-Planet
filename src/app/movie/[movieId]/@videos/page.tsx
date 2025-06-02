"use client";
import { useParams } from "next/navigation";
import { tmdbFetcher } from "@/app/apis/api";
import useSWR from "swr";
interface IVideo {
	id: string;
	key: string;
	name?: string;
	official?: boolean;
	published_at?: string;
	site: string;
	size?: number;
	type: string;
}
export default function Videos() {
	const movieId = useParams().movieId;
	const { data, isLoading } = useSWR(
		`/movie/${movieId}/videos?include_adult=false`,
		tmdbFetcher,
		{
			errorRetryCount: 0, // 重試次數
		}
	);

	const videosFiltered: IVideo[] = data?.results?.filter((item: IVideo) => {
		return item.site === "YouTube" && item.type === "Trailer";
	});
	return (
		<div className="relative w-full container mx-auto px-4 mt-8">
			{isLoading && <p className="text-center">載入中...</p>}

			<div>
				<h1 className="text-2xl font-bold mb-4">預告片</h1>
				{(!data || videosFiltered.length === 0) && <p>嗯..🤔 似乎沒有預告片</p>}
				<div className="grid grid-cols-1 gap-8">
					{videosFiltered &&
						videosFiltered?.map((video: IVideo) => (
							<div
								key={video.id}
								className="relative aspect-video w-[80%] mx-auto
                            "
							>
								<iframe
									className="w-full h-full"
									src={`https://www.youtube.com/embed/${video.key}`}
									title={video.name}
									allowFullScreen
								></iframe>
								<p className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
									{video.name}
								</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
