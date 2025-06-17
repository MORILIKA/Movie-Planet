import { Avatar } from "@heroui/avatar";
import imageTMDB from "@/utils/imageTMDB";
interface AvatarCardProps {
	imagePath?: string;
	imageAlt?: string;
	title?: string;
	subtitle?: string;
}
const AvatarCard = ({
	imagePath,
	imageAlt,
	title,
	subtitle,
}: AvatarCardProps) => (
	<div className="flex flex-col items-center p-4 w-[160px] max-w-[160px]">
		<div className="relative ">
			{imagePath ? (
				<Avatar
					className="w-20 h-20"
					src={imageTMDB({
						src: imagePath,
						width: 200,
					})}
					alt={imageAlt || "Avatar Image"}
				/>
			) : (
				<Avatar className="w-20 h-20" />
			)}
		</div>
		<h4 className="mt-2 font-semibold single-ellipsis text-center">{title}</h4>
		<p className="text-sm text-gray-500 single-ellipsis text-center">
			{subtitle}
		</p>
	</div>
);
export default AvatarCard;
