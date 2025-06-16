"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { tmdbFetcher } from "@/apis/api";
import { Button, Card, User, Spinner } from "@heroui/react";
import imageTMDB from "@/utils/imageTMDB";
import { Review } from "@/types/base";

export default function Reviews() {
	const movieId = useParams().movieId;
	const [allPages, setAllPages] = useState<number>(0);
	const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
		if (!movieId) return null;

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
			`/movie/${movieId}/reviews?include_adult=false&page=${pageIndex + 1}`
		);
		return path;
	};

	const { data, isValidating, setSize, size } = useSWRInfinite(
		getKey,
		tmdbFetcher,
		{
			revalidateFirstPage: true,
			revalidateAll: false,
			onSuccess: (data) => {
				setAllPages(data[0]?.total_pages || 0);
			},
		}
	);
	const nextPage = () => {
		setSize((prev) => prev + 1);
	};

	return (
		<div className="relative w-full container mx-auto px-4 mt-8">
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

			<div>
				<h1 className="text-2xl font-bold mb-4">看看大家怎麼說</h1>
				{(!data || allPages === 0) && <p>嗯..🤔 目前還沒有人有想法</p>}
				{data &&
					data.map((page) => (
						<div key={page.id} className="mb-8">
							{page.results.map((review: Review) => (
								<Card key={review.id} className=" p-4 rounded-lg mb-4">
									<div className="flex justify-between items-center">
										<User
											avatarProps={{
												src: imageTMDB({
													src: review.author_details?.avatar_path || "",
													width: 200,
												}),
											}}
											name={
												review.author_details?.name ||
												review.author_details?.username ||
												"Unknown"
											}
										/>
										<span className="text-sm opacity-50">
											{new Date(review.created_at).toLocaleDateString("zh-TW", {
												year: "numeric",
												month: "2-digit",
												day: "2-digit",
											})}
										</span>
									</div>

									<p className="opacity-80 text-sm whitespace-pre-wrap mt-8">
										{review.content}
									</p>
								</Card>
							))}
						</div>
					))}
				{!isValidating && allPages > size && (
					<div>
						<Button onPress={nextPage}>See More</Button>
					</div>
				)}
			</div>
		</div>
	);
}
