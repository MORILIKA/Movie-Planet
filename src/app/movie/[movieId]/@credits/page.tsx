"use client";
import { useParams } from "next/navigation";
import { tmdbFetcher } from "@/apis/api";
import useSWR from "swr";
import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import AvatarCard from "@/components/AvatarCard";
import { Cast } from "@/types/base";

interface ICast extends Cast {
	cast_id: number;
	character: string;
	order: number;
}
interface ICrew extends Cast {
	department: string;
	job: string;
}

export default function Credits() {
	const movieId = useParams().movieId;
	const path = encodeURIComponent(
		`/movie/${movieId}/credits?language=zh-TW&include_adult=false`
	);
	const { data, error, isLoading } = useSWR(path, tmdbFetcher, {
		errorRetryCount: 0, // 重試次數
	});

	const isEmptyData = !data && !isLoading && !error;
	const carouselOptions: EmblaOptionsType = {
		dragFree: false,
		slidesToScroll: "auto",
	};
	return (
		<div className="relative w-full mt-8">
			<div className="px-4 container mx-auto relative">
				<h1 className="text-2xl font-bold mb-4">導演</h1>
				{isEmptyData && <p className="text-center">暫無資料。</p>}
				{isLoading && (
					<div className="flex space-x-4">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="opacity-20">
								<AvatarCard
									title="Loading..."
									subtitle="Loading..."
								></AvatarCard>
							</div>
						))}
					</div>
				)}
				{data && data?.crew && (
					<EmblaCarousel
						slides={
							data?.crew?.filter(
								(item: ICrew) => item.job === "Director"
							) as ICrew[]
						}
						options={carouselOptions}
						template={(slide) => {
							const crewSlide = slide as ICrew;
							return (
								<AvatarCard
									imagePath={crewSlide?.profile_path}
									imageAlt={crewSlide?.name}
									title={crewSlide?.name}
									subtitle={crewSlide?.job}
								></AvatarCard>
							);
						}}
					/>
				)}
			</div>

			<div className="px-4 container mx-auto relative mt-4">
				<h1 className="text-2xl font-bold mb-4">演員陣容</h1>
				{isEmptyData && <p className="text-center">暫無資料。</p>}
				{isLoading && (
					<div className="flex space-x-4">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="opacity-20">
								<AvatarCard
									title="Loading..."
									subtitle="Loading..."
								></AvatarCard>
							</div>
						))}
					</div>
				)}
				{data && data?.cast && (
					<EmblaCarousel
						slides={data?.cast as ICast[]}
						options={carouselOptions}
						template={(slide) => {
							const crewSlide = slide as ICast;
							return (
								<AvatarCard
									imagePath={crewSlide?.profile_path}
									imageAlt={crewSlide?.name}
									title={crewSlide?.character}
									subtitle={crewSlide?.name}
								></AvatarCard>
							);
						}}
					/>
				)}
			</div>
		</div>
	);
}
