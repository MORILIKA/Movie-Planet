import { Card, CardFooter, Image, Chip, Skeleton } from "@heroui/react";
import NextImage from "next/image";
import imageTMDB from "@/utils/imageTMDB";
import { Movie } from "@/types/base";

interface MovieCardComponentProps {
	movie: Movie;
	onPress?: () => void;
	imageType?: "poster" | "backdrop";
	children?: React.ReactNode;
	isLoading?: boolean;
}
const MovieCardHorizontal = ({
	movie,
	onPress,
	children,
}: MovieCardComponentProps) => {
	return (
		<Skeleton isLoaded={!!movie}>
			<Card className="flex flex-row w-full" onPress={onPress} isPressable>
				<div className="relative  w-[120px] min-h-[180px] flex-shrink-0">
					{movie.poster_path && (
						<Image
							as={NextImage}
							removeWrapper
							alt={movie?.title}
							fill
							priority
							radius="none"
							className="object-cover"
							sizes="(max-width: 768px) 400, (max-width: 1200px) 400, 400"
							quality={80}
							src={imageTMDB({ src: movie?.poster_path, width: 400 })}
						/>
					)}
				</div>
				<div className="p-4 text-left pr-8 w-full">
					<h3 className="text-lg md:text-xl font-bold double-ellipsis">
						{movie?.title}
					</h3>
					<h3 className="text-sm font-bold double-ellipsis opacity-80">
						{movie?.original_title}
					</h3>
					{movie?.release_date && (
						<Chip
							color="default"
							variant="flat"
							radius="md"
							className="mt-2 pl-0 text-sm"
						>
							{movie.release_date.toString()}
						</Chip>
					)}
					{children}
				</div>
			</Card>
		</Skeleton>
	);
};
const MovieCardVertical = ({
	movie,
	onPress,
	imageType = "poster",
	children,
	isLoading = false,
}: MovieCardComponentProps) => {
	return (
		<Card
			className="relative w-[100%] flex-shrink-0"
			key={`playnow-${movie.id}`}
			isPressable
			shadow="sm"
			onPress={onPress}
		>
			<Skeleton className="w-[100%] h-[150%] relative" isLoaded={!isLoading}>
				<div className="w-[100%] relative overflow-hidden">
					{movie.poster_path && imageType === "poster" && (
						<div className="w-full pb-[150%] relative">
							<Image
								as={NextImage}
								isZoomed
								removeWrapper
								alt={movie.title}
								fill
								priority
								radius="none"
								className="object-cover"
								sizes="(max-width: 768px) 400, (max-width: 1200px) 400, 400"
								quality={75}
								src={imageTMDB({ src: movie.poster_path, width: 400 })}
							/>
						</div>
					)}
					{movie.backdrop_path && imageType === "backdrop" && (
						<div className="w-full pb-[50%] relative">
							<Image
								as={NextImage}
								isZoomed
								removeWrapper
								alt={movie.title}
								fill
								priority
								radius="none"
								className="object-cover"
								sizes="(max-width: 768px) 400, (max-width: 1200px) 400, 400"
								quality={75}
								src={imageTMDB({ src: movie.backdrop_path, width: 400 })}
							/>
						</div>
					)}
				</div>
			</Skeleton>
			<CardFooter
				className={`${isLoading ? "text-white/0" : "text-white/80"} text-left flex-col justify-start items-start`}
			>
				<h3 className="text-ellipsis text-lg line-clamp-1">{movie.title}</h3>
				<h4 className="font-medium text-left text-ellipsis line-clamp-1">
					{movie.original_title}
				</h4>
				{children}
			</CardFooter>
		</Card>
	);
};
export { MovieCardHorizontal, MovieCardVertical };
