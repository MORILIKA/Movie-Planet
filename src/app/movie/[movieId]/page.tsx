"use client";

import { useParams } from "next/navigation";
import { tmdbFetcher } from "@/app/apis/api";
import imageTMDB from "@/app/utils/imageTMDB";
import useSWR from "swr";
import NextImage from "next/image";
import { Image, Chip, Skeleton, CircularProgress } from "@heroui/react";

interface Movie {
	id: number;
	title: string;
	original_title: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
	poster_path: string;
	vote_average: number;
	vote_count: number;
	genres?: { id: number; name: string }[];
}
export default function Movie() {
	const movieId = useParams().movieId;
	const {
		data: baseData,
		error,
		isLoading,
	} = useSWR<Movie>(
		`/movie/${movieId}?language=zh-TW&include_adult=false`,
		tmdbFetcher,
		{
			errorRetryCount: 0, // 重試次數
		}
	);

	const isEmptyData = !baseData && !isLoading && !error;

	return (
		<div className="relative w-full">
			<Skeleton className="w-full relative" isLoaded={!isLoading}>
				<div
					className="p-6 w-full mx-auto pt-24 flex flex-row justify-center items-center z-10 w-full relative"
					style={{
						backgroundImage: baseData
							? `url(${imageTMDB({ src: baseData.backdrop_path, width: 1280 })})`
							: undefined,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="absolute left-0 right-0 h-[100%] top-0 z-10 bg-gradient-to-t from-black/100 to-black/70"></div>

					<div className="container mx-auto relative flex flex-wrap md:flex-nowrap z-10">
						<div className="w-[100%] h-[0px] pb-[150%] relative flex-shrink-0 md:w-[300px] md:h-[450px] md:pb-0">
							{baseData?.poster_path && (
								<Image
									as={NextImage}
									removeWrapper
									alt={baseData?.title || "Movie Poster"}
									fill
									priority
									radius="none"
									className="object-cover"
									sizes="(max-width: 768px) 400, (max-width: 1200px) 400, 400"
									quality={90}
									src={
										baseData
											? imageTMDB({ src: baseData.poster_path, width: 400 })
											: ""
									}
								/>
							)}
						</div>
						<div className="pl-0 pt-8 md:pl-8 md:pt-0 ">
							<h1 className="text-2xl font-bold">{baseData?.title || ""}</h1>
							<h2 className="mt-2">{baseData?.original_title || ""}</h2>
							<div className="mt-2">
								<CircularProgress
									aria-label="Loading..."
									formatOptions={{ style: "percent" }}
									color="warning"
									showValueLabel={true}
									label={`${baseData?.vote_count || 0} 投票`}
									size="lg"
									value={
										baseData?.vote_average ? baseData.vote_average * 10 : 0
									}
								/>
								{baseData?.genres?.map((genre) => (
									<Chip
										key={genre.id}
										color="default"
										variant="flat"
										radius="md"
										className="mt-2 mr-2"
									>
										{genre.name}
									</Chip>
								))}
							</div>

							<div className="mt-2"></div>
							<p className="mt-4 leading-[1.75]">{baseData?.overview || ""}</p>
						</div>
					</div>
				</div>
			</Skeleton>
			{error?.status === 404 && <p>找不到這部電影耶！</p>}
			{isEmptyData && <p className="text-center">暫無資料。</p>}
		</div>
	);
}
