"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { useSWRConfig } from "swr";
import { tmdbFetcher } from "@/apis/api";
import throttle from "@/utils/throttle";
import { MovieCardHorizontal } from "@/components/MovieCard";
import { ScrollShadow, Button, Spinner } from "@heroui/react";
import Icons from "@/components/Icons";
import FavoriteButton from "@/components/FavoriteButton";

interface Movie {
	id: number;
	title: string;
	original_title: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
	poster_path: string;
	vote_average: number;
}

export default function SearchPage() {
	// 取得 keyword
	const searchParams = useSearchParams();
	const keyword = useMemo(() => {
		return searchParams.get("keyword") || "";
	}, [searchParams]);

	// 清理 SWR cache
	const { cache } = useSWRConfig();
	const clearCache = () =>
		[...cache.keys()].forEach((key) => cache.delete(key));
	const [allPages, setAllPages] = useState<number>(0);

	// SWR Infinite API 分頁規則,previousPageData 是上一頁的資料
	const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
		if (!keyword) return null;

		if (
			previousPageData &&
			previousPageData.total_pages === previousPageData.page
		) {
			return null;
		}
		if (pageIndex >= allPages && allPages > 0) {
			return null; // reached the end
		}
		const path = encodeURIComponent(
			`search/movie?query=${keyword}&include_adult=false&language=zh-TW&page=${pageIndex + 1}`
		);
		return path;
	};

	const { data, isValidating, setSize, error, size } = useSWRInfinite(
		getKey,
		tmdbFetcher,
		{
			revalidateFirstPage: true,
			revalidateAll: false,
			onSuccess: (data) => {
				console.log("onSuccess", data[0]?.total_pages);
				setAllPages(data[0].total_pages);
				isValidatingRef.current = false; // 重置 isValidating 狀態
			},
		}
	);
	// data 是一個陣列, 每一個元素都是一個 API 回傳的資料

	const isEnd = useRef(false); // 是否已經到達最後一頁
	// movies 是一個 Movie 陣列, 把每一頁資料合併成一個陣列
	const [movies, setMovies] = useState<Movie[]>([]);
	useEffect(() => {
		isEnd.current = size >= allPages;
		setMovies(
			data?.reduce((acc: Movie[], movie) => {
				if (movie && movie.results) {
					return [...acc, ...movie.results];
				}
				return acc;
			}, []) ?? []
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const isValidatingRef = useRef(isValidating);
	useEffect(() => {
		if (isValidating) isValidatingRef.current = true;
	}, [isValidating]);

	const [isScrolledToTopButtonVisible, setIsScrolledToTopButtonVisible] =
		useState(false);
	const scrollToTop = () => {
		const scrollEl = document.getElementById("global-scroll-container");
		scrollEl?.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		clearCache();
		isEnd.current = false;
		setSize(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword]);
	const setPage = () => {
		setSize((prevSize) => {
			console.log("setSize", prevSize + 1);
			return prevSize + 1;
		});
	};
	useEffect(() => {
		const scrollEl = document.getElementById("global-scroll-container");
		const handlerScroll = throttle(() => {
			const scrollTop: number = scrollEl?.scrollTop || 0;
			const scrollHeight: number = scrollEl?.scrollHeight || 0;
			const clientHeight: number = scrollEl?.clientHeight || 0;
			if (
				scrollTop + clientHeight >= scrollHeight - 100 &&
				!isValidatingRef.current &&
				!isEnd.current
			) {
				console.log(
					"page++",
					"isValidatingRef",
					isValidatingRef.current,
					"isEnd",
					isEnd.current
				);
				console.log(data, isValidating, size, allPages);
				setPage();
			}
			setIsScrolledToTopButtonVisible(scrollTop >= clientHeight);
		}, 200);
		if (scrollEl) scrollEl.addEventListener("scroll", handlerScroll);
		return () => {
			scrollEl?.removeEventListener("scroll", handlerScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const goToDetailPage = (movieId: number) => {
		window.location.href = `/movie/${movieId}`;
	};

	return (
		<div className="pt-24 container px-4 mx-auto" id="search-page">
			<ScrollShadow className="overflow-y-auto w-full py-4">
				<h3 className="text-xl font-bold mb-4">
					輸入<span className="text-primary"> {keyword} </span>的搜尋結果
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{movies &&
						movies.map((movie: Movie, index: number) => {
							return (
								<div
									key={`movie-${movie.id}-${index}`}
									className="relative hover:-translate-y-2 duration-300"
								>
									<MovieCardHorizontal
										movie={movie}
										onPress={() => goToDetailPage(movie.id)}
									></MovieCardHorizontal>
									<FavoriteButton
										className="absolute top-1 right-1"
										movieId={movie.id}
										title={movie.title}
									/>
								</div>
							);
						})}
				</div>
				{isValidating && (
					<div className="flex flex-col items-center justify-center w-full mt-4">
						<Spinner
							size="md"
							color="primary"
							labelColor="primary"
							variant="gradient"
							label="Loading..."
						/>
					</div>
				)}
				{error && <p>發生錯誤，{error}，請稍候再試！</p>}
			</ScrollShadow>

			<Button
				className={`fixed bottom-[20px] right-[24px] z-50 rounded-full duration-300 hover:scale-110 transition-opacity ${
					isScrolledToTopButtonVisible
						? "opacity-100 visible"
						: "opacity-0 invisible"
				}`}
				isIconOnly
				color="default"
				variant="faded"
				onPress={scrollToTop}
			>
				<Icons name="keyboard_arrow_up" />
			</Button>
		</div>
	);
}
