"use client";

import { useMemo } from "react";
import { Skeleton } from "@heroui/skeleton";
import BannerFullScreen from "@/components/BannerFullScreen";
import useSWR from "swr";
import { tmdbFetcher } from "@/apis/api";
import { MovieCardVertical } from "@/components/MovieCard";
import FavoriteButton from "@/components/FavoriteButton";
import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/base";

export default function IndexPage() {
	const router = useRouter();
	const path = encodeURIComponent(
		"movie/popular?page=1&language=zh-TW&include_adult=false"
	);
	const { data, isLoading } = useSWR(path, tmdbFetcher, {
		errorRetryCount: 0, // 重試次數
	});
	const fakeData = () => {
		return Array.from({ length: 20 }, (_, i) => ({
			id: i + 1,
			title: "Loading...",
			original_title: "Loading...",
			backdrop_path: " ",
			overview: " ",
			release_date: " ",
			poster_path: " ",
			vote_average: 0,
		}));
	};
	const movies = useMemo(() => {
		return data?.results || fakeData();
	}, [data]);

	const movieRandom = useMemo(() => {
		if (movies && movies.length > 0 && !isLoading) {
			return movies[Math.floor(Math.random() * movies.length)];
		}
		return null;
	}, [movies, isLoading]);

	const carouselOptions: EmblaOptionsType = {
		dragFree: true,
		slidesToScroll: "auto",
	};
	const goToDetailPage = (movieId: number) => {
		router.push(`/movie/${movieId}`);
	};
	return (
		<main>
			<Skeleton className="w-full h-[50vh] sm:h-[100vh]" isLoaded={!isLoading}>
				{movieRandom && (
					<BannerFullScreen
						alt={movieRandom?.title}
						src={movieRandom?.backdrop_path}
						title={movieRandom?.original_title}
						subtitle={movieRandom?.title}
						ImageSizes="(max-width: 768px) 400, 1280"
						className="h-[50vh] sm:h-[100vh]"
					/>
				)}
			</Skeleton>
			<section className="relative sm:-mt-[16vh] z-10 mx-auto">
				<div className="container mx-auto px-4">
					<h1 className="text-2xl font-bold mb-4 px-2">熱門電影</h1>
					<EmblaCarousel
						slides={movies as Movie[]}
						options={carouselOptions}
						className="movie-carousel"
						template={(slide, index) => {
							const movieSlide = slide as Movie;
							return (
								<>
									<div className="relative mx-2" key={`hot-${movieSlide.id}`}>
										<MovieCardVertical
											movie={movieSlide}
											isLoading={isLoading}
											priority={index <= 5}
											onPress={() => goToDetailPage(movieSlide.id)}
										/>

										<FavoriteButton
											movieId={movieSlide.id}
											title={movieSlide.title}
											className="absolute right-0 top-0 z-10"
										/>
									</div>
								</>
							);
						}}
					/>
				</div>
			</section>
		</main>
	);
}
