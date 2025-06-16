"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { tmdbFetcher } from "@/apis/api";
import { MovieCardHorizontal } from "@/components/MovieCard";
import { ScrollShadow, Button, Spinner } from "@heroui/react";
import Icons from "@/components/Icons";
import FavoriteButton from "@/components/FavoriteButton";
import InfiniteScroll from "react-infinite-scroll-component";
import { Movie } from "@/types/base";

export default function SearchPage() {
	// 取得 keyword
	const searchParams = useSearchParams();
	const keyword = useMemo(() => {
		return searchParams.get("keyword") || "";
	}, [searchParams]);

	const [allPages, setAllPages] = useState<number>(0);
	// SWR Infinite API 分頁規則,previousPageData 是上一頁的資料
	const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
		if (!keyword) return null; // 如果沒有關鍵字，則不需要請求 API
		// 如果上一頁的資料已經是最後一頁，則不需要請求下一頁
		if (
			previousPageData &&
			previousPageData.total_pages === previousPageData.page
		) {
			return null;
		}

		// 請求下一頁的資料
		const path = encodeURIComponent(
			`search/movie?query=${keyword}&include_adult=false&language=zh-TW&page=${pageIndex + 1}`
		);
		return path;
	};

	// data 是一個陣列, 每一個元素都是一個 API 回傳的資料
	const { data, isValidating, setSize, error, size } = useSWRInfinite(
		getKey,
		tmdbFetcher,
		{
			revalidateFirstPage: false,
			revalidateAll: false,
			onSuccess: (data) => {
				setAllPages(data[0]?.total_pages || 0);
			},
		}
	);

	// 當前頁數加一, 這個函式會在 InfiniteScroll 的 next 屬性中使用
	const setPage = () => {
		setSize((prevSize) => {
			return prevSize + 1;
		});
	};

	const isEnd = useRef(false); // 是否已經到達最後一頁

	// movies 是一個 Movie 陣列, 把data每一頁資料合併成一個陣列方便渲染使用
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

	// 是否顯示回到頂部按鈕
	const [isScrolledToTopButtonVisible, setIsScrolledToTopButtonVisible] =
		useState(false);
	// 回到頁面頂部
	const scrollToTop = () => {
		const scrollEl = document.getElementById("scroll-container");
		scrollEl?.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// 點擊電影卡片，跳轉到電影詳細頁面
	const goToDetailPage = (movieId: number) => {
		window.location.href = `/movie/${movieId}`;
	};

	return (
		<>
			<ScrollShadow
				className="overflow-y-auto w-full pt-24 container px-4 mx-auto h-screen"
				id="scroll-container"
			>
				<InfiniteScroll
					dataLength={movies.length}
					next={setPage}
					hasMore={!isEnd.current}
					loader={
						<div className="flex flex-col items-center justify-center w-full mt-4">
							<Spinner
								size="md"
								color="primary"
								labelColor="primary"
								variant="gradient"
								label="Loading..."
							/>
						</div>
					}
					endMessage={
						isValidating ? (
							""
						) : (
							<p className="text-center py-12">已經到底囉！</p>
						)
					}
					scrollableTarget="scroll-container"
					onScroll={(e: Event) => {
						setIsScrolledToTopButtonVisible(
							(e?.target as HTMLElement)?.scrollTop > 100
						);
					}}
				>
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
					{error && <p>發生錯誤，{error}，請稍候再試！</p>}
				</InfiniteScroll>
			</ScrollShadow>
			{/* 回到頂部按鈕 */}
			<Button
				className={`fixed bottom-[20px] right-[24px] z-50 rounded-full duration-300 hover:scale-110 ${
					isScrolledToTopButtonVisible ? " visible" : " invisible"
				}`}
				isIconOnly
				color="default"
				variant="faded"
				onPress={scrollToTop}
			>
				<Icons name="keyboard_arrow_up" />
			</Button>
		</>
	);
}
