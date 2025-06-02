"use client";
import { useParams } from "next/navigation";
import { tmdbFetcher } from "@/app/apis/api";
import useSWR from "swr";
import EmblaCarousel from "@/app/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import AvatarCard from "@/app/components/AvatarCard";
import { Spinner } from "@heroui/react";

interface ICast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}
interface ICrew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	department: string;
	credit_id: string;
	job: string;
}

export default function Credits() {
	const movieId = useParams().movieId;
	const { data, error, isLoading } = useSWR(
		`/movie/${movieId}/credits?language=zh-TW&include_adult=false`,
		tmdbFetcher,
		{
			errorRetryCount: 0, // 重試次數
		}
	);

	const isEmptyData = !data && !isLoading && !error;
	const carouselOptions: EmblaOptionsType = {
		dragFree: false,
		slidesToScroll: "auto",
	};
	return (
		<div className={`relative w-full`}>
			{isLoading && (
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

			<div className="px-4 container mx-auto relative">
				<h1 className="text-2xl font-bold mb-4">導演</h1>
				{isEmptyData && <p className="text-center">暫無資料。</p>}
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
