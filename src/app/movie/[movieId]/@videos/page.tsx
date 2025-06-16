"use client";
import { useParams } from "next/navigation";
import { tmdbFetcher } from "@/apis/api";
import useSWR from "swr";
import { Video } from "@/types/base";

export default function Videos() {
	const movieId = useParams().movieId;
	const path = encodeURIComponent(
		`/movie/${movieId}/videos?include_adult=false`
	);
	const { data, isLoading } = useSWR(path, tmdbFetcher, {
		errorRetryCount: 0, // 重試次數
	});

	const videosFiltered: Video[] = data?.results?.filter((item: Video) => {
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
						videosFiltered?.map((video: Video) => (
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
