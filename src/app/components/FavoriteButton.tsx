import React from "react";
import { Button, addToast } from "@heroui/react";
import useFavoriteStore from "@/store/favoriteStore";
import Icons from "@/app/components/Icons";

interface FavoriteButtonProps {
	movieId: number;
	title: string;
	onRemove?: () => void;
	[key: string]: unknown;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
	movieId,
	title,
	onRemove,
	...props
}) => {
	const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
	const isFavorite = favorites.some((movie) => movie.id === movieId);

	const handleToggleFavorite = () => {
		if (isFavorite) {
			removeFavorite(movieId);
			addToast({
				title: `${title ?? ""} 已從待看清單移除`,
				color: "danger",
			});
			if (onRemove) onRemove();
		} else {
			addFavorite({
				id: movieId,
				title,
				joinAt: new Date().toISOString(),
			});
			addToast({
				title: `${title ?? ""} 已加入待看清單`,
				color: "success",
			});
		}
	};

	return (
		<Button
			onPress={handleToggleFavorite}
			color={isFavorite ? "danger" : "default"}
			size="sm"
			isIconOnly
			className="duration-300"
			{...props}
		>
			<Icons name="favorite" />
		</Button>
	);
};

export default FavoriteButton;
