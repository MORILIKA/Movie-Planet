// 電影基本資料
export interface Movie {
	id: number; // TMDB 電影 ID
	title: string; // 電影名稱
	original_title?: string; // 原始電影名稱
	release_date?: string; // 發行日期
	overview?: string; // 電影簡介
	backdrop_path?: string; // 背景圖片路徑
	poster_path?: string; // 海報圖片路徑
}

// 卡司基本資料
export interface Cast {
	adult: boolean;
	gender: number; // 性別 (0-Not set / not specified,1-Female,2-Male,3-Non-binary)
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path?: string;
	credit_id: string;
}

// 評論基本資料
export interface Review {
	id: string;
	author: string;
	author_details: {
		name: string;
		username: string;
		rating: number;
		avatar_path?: string;
	};
	content: string;
	created_at: string;
	updated_at: string;
}
// 影片基本資料
export interface Video {
	id: string;
	key: string;
	name: string;
	site: string;
	size?: number;
	type: string;
}
