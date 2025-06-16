"use client";
import useSWR from "swr";
import { tmdbFetcher } from "@/apis/api";
import { MovieCardVertical } from "@/components/MovieCard";
import FavoriteButton from "@/components/FavoriteButton";
import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/base";

export default function UpComing() {
	const router = useRouter();
	const path = encodeURIComponent(
		`/movie/upcoming?page=1&language=zh-TW&include_adult=false`
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
	const carouselOptions: EmblaOptionsType = {
		dragFree: true,
		slidesToScroll: "auto",
	};
	const goToDetailPage = (movieId: number) => {
		router.push(`/movie/${movieId}`);
	};
	return (
		<section className="relative mx-auto mt-8 pb-8">
			<div className="container mx-auto px-4">
				<h1 className="text-2xl font-bold mb-4 px-2">即將上映</h1>
				<div>
					<EmblaCarousel
						slides={((isLoading ? fakeData() : data?.results) as Movie[]) || []}
						options={carouselOptions}
						className="movie-carousel"
						template={(slide) => {
							const movieSlide = slide as Movie;
							return (
								<>
									<div className="relative mx-2" key={`hot-${movieSlide.id}`}>
										<MovieCardVertical
											movie={movieSlide}
											isLoading={isLoading}
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
			</div>
		</section>
	);
}
