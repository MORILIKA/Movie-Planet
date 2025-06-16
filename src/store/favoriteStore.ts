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
	// 儲存使用者喜愛的電影清單,window !== undefined 確保在client render時才取得localStorage
	favorites:
		typeof window !== "undefined"
			? JSON.parse(localStorage.getItem("favorites") || "[]")
			: [],
	// 新增電影到使用者喜愛的電影清單
	addFavorite: (movie) =>
		set((state) => {
			const updatedFavorites = [...state.favorites, movie];
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			return { favorites: updatedFavorites };
		}),
	// 從使用者喜愛的電影清單中移除電影
	removeFavorite: (id) =>
		set((state) => {
			const updatedFavorites = state.favorites.filter(
				(movie) => movie.id !== id
			);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
			return { favorites: updatedFavorites };
		}),
	// 從 localStorage 讀取使用者喜愛的電影清單
	loadFavorites: () =>
		set(() => {
			const storedFavorites = JSON.parse(
				localStorage?.getItem("favorites") || "[]"
			);
			return { favorites: storedFavorites };
		}),
}));

export default useFavoriteStore;
