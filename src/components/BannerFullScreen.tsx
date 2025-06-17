import { Image } from "@heroui/image";
import NextImage from "next/image";
import imageTMDB from "@/utils/imageTMDB";
interface BannerFullScreenProps {
	alt: string;
	quality?: number;
	src: string;
	mobileSrc?: string;
	ImageWidth?: number;
	ImageSizes?: string;
	title?: string;
	subtitle?: string;
	className?: string;
}
export default function BannerFullScreen({
	alt,
	quality = 75,
	src,
	ImageSizes = "(max-width: 768px) 800, 1280",
	title,
	subtitle,
	className = "w-full",
}: BannerFullScreenProps) {
	return (
		<div className={`relative overflow-hidden ${className}`}>
			{src && src !== "" && alt && (
				<>
					<Image
						as={NextImage}
						priority
						loading="eager"
						removeWrapper
						alt={alt}
						fill
						className="object-cover scale-[106%] origin-top-left sm:visible"
						sizes={ImageSizes}
						quality={quality}
						radius="none"
						src={imageTMDB({ src, width: 1280 })}
						unoptimized={true}
					/>
					{/* 遮罩 */}
					<div className="absolute top-0 left-0 right-0 h-[20vh] z-10 bg-gradient-to-t from-black/0 to-black/40"></div>
					<div className="absolute left-0 right-0 h-[70vh] bottom-0 z-10 bg-gradient-to-t from-black/100 to-black/0"></div>
					{/* 文字 */}
					<div className="absolute top-0 left-0 right-0 bottom-0 z-10">
						<div className="max-w-[1280px] m-auto flex flex-col justify-center items-start h-full px-8">
							<div>
								<p className="text-white font-bold sm:text-4xl text-3xl tracking-wide max-w-[500px] break-keep">
									{title}
								</p>
								<p className="sm:text-2xl text-xl font-bold text-white/80 tracking-wide mt-4">
									{subtitle}
								</p>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
