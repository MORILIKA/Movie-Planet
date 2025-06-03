"use client";
import { useEffect, useState } from "react";
import { tmdbFetcher } from "@/app/apis/api";
import { MovieCardHorizontal } from "@/app/components/MovieCard";
import FavoriteButton from "@/app/components/FavoriteButton";
import useFavoriteStore from "@/store/favoriteStore";
import { ScrollShadow, Select, SelectItem } from "@heroui/react";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";
import { useRouter } from "next/navigation";

dayjs.locale("zh-tw");

interface Movie {
	id: number;
	title: string;
	original_title?: string;
	backdrop_path?: string;
	overview?: string;
	release_date?: string;
	poster_path?: string;
	vote_average?: number;
	joinAt: string;
}
const fetchMovieDetails = async (id: number, joinAt: string) => {
	const path = encodeURIComponent(
		`/movie/${id}?language=zh-TW&include_adult=false`
	);
	const response = await tmdbFetcher(path);
	return { joinAt, ...response };
};

const FavoritePage = () => {
	const router = useRouter();
	const { favorites, loadFavorites, removeFavorite } = useFavoriteStore();
	const [movies, setMovies] = useState<Movie[]>([]);
	const [sortKey, setSortKey] = useState<string>("joinAt");
	const sortKeyOptions = [
		{
			key: "joinAt",
			label: "加入時間",
		},
		{ key: "title", label: "片名" },
		{ key: "release_date", label: "發行日期" },
	];
	useEffect(() => {
		loadFavorites(); // 由store取得favorites
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 取得清單詳細資料
	useEffect(() => {
		if (!favorites) return;
		Promise.all(
			favorites.map((movie) => fetchMovieDetails(movie.id, movie.joinAt))
		).then((res) => {
			setMovies(res);
		});
	}, [favorites]); // 當 favorites 改變時重新執行

	const goToDetailPage = (movieId: number) => {
		router.push(`/movie/${movieId}`);
	};
	const sortedMovies = [...movies].sort((a, b) => {
		if (sortKey === "joinAt") {
			return new Date(a.joinAt).getTime() - new Date(b.joinAt).getTime();
		} else if (sortKey === "title") {
			return a.title.localeCompare(b.title);
		} else if (sortKey === "release_date") {
			return (
				new Date(a.release_date || "").getTime() -
				new Date(b.release_date || "").getTime()
			);
		}
		return 0;
	});
	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortKey(e.target.value);
	};
	return (
		<div className="container mx-auto pt-24 px-4">
			<h1 className="mb-8">待看清單</h1>
			<div className="mb-8">
				<Select
					className="max-w-xs"
					label="排序依據"
					selectedKeys={[sortKey]}
					onChange={handleSelectionChange}
				>
					{sortKeyOptions.map((sortkey) => (
						<SelectItem key={sortkey.key}>{sortkey.label}</SelectItem>
					))}
				</Select>
			</div>

			<div className="pb-8">
				<ScrollShadow>
					{sortedMovies.length === 0 ? (
						<p>目前沒有待看的電影哦！</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							{sortedMovies.map((movie, index) => (
								<div
									key={`movie-${movie.id}-${index}`}
									className="relative duration-400"
								>
									<MovieCardHorizontal
										movie={{
											id: movie.id,
											title: movie.title,
											original_title: movie.original_title,
											poster_path: movie.poster_path,
											release_date: movie.release_date,
										}}
										onPress={() => goToDetailPage(movie.id)}
									>
										<p className="text-sm mt-4">
											加入時間 {dayjs(movie.joinAt).format("YYYY-MM-DD HH:ss")}
										</p>
									</MovieCardHorizontal>
									<FavoriteButton
										className="absolute top-1 right-1"
										movieId={movie.id}
										title={movie.title}
										onRemove={() => removeFavorite(movie.id)}
									/>
								</div>
							))}
						</div>
					)}
				</ScrollShadow>
			</div>
		</div>
	);
};
export default FavoritePage;
