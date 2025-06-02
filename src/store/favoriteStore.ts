import { create } from "zustand";

interface FavoriteMovie {
	id: number;
	title: string;
	joinAt: string;
}

interface FavoriteStore {
	favorites: FavoriteMovie[];
	addFavorite: (movie: FavoriteMovie) => void;
	removeFavorite: (id: number) => void;
	loadFavorites: () => void;
}

const useFavoriteStore = create<FavoriteStore>((set) => ({
	favorites:
		typeof window !== "undefined"
			? JSON.parse(localStorage.getItem("favorites") || "[]")
			: [],
	addFavorite: (movie) =>
		set((state) => {
			const updatedFavorites = [...state.favorites, movie];
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			return { favorites: updatedFavorites };
		}),
	removeFavorite: (id) =>
		set((state) => {
			const updatedFavorites = state.favorites.filter(
				(movie) => movie.id !== id
			);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			return { favorites: updatedFavorites };
		}),
	loadFavorites: () =>
		set(() => {
			const storedFavorites = JSON.parse(
				localStorage?.getItem("favorites") || "[]"
			);
			return { favorites: storedFavorites };
		}),
}));

export default useFavoriteStore;
