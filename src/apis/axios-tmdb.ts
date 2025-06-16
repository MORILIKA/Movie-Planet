import axios from "axios";
import { addToast } from "@heroui/react";

const baseURL =
	typeof window === "undefined"
		? "http://localhost:3000/api/tmdb?path="
		: window.location.protocol +
			"//" +
			window.location.host +
			"/api/tmdb?path=";
const tmdb = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 60000,
});

tmdb.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error)
);

tmdb.interceptors.response.use(
	(response) => {
		// 資料結構驗證處理
		if (Array.isArray(response.data)) {
			// 如果資料是陣列，轉換為物件格式
			response.data = { results: response.data };
		} else if (typeof response.data !== "object" || response.data === null) {
			// 如果資料不是物件或為 null，提供預設值
			response.data = { results: [] };
		}
		return response;
	},
	(error) => {
		// 統一錯誤處理
		errorHandler(error.response?.status);
		return Promise.reject(error);
	}
);
const errorHandler = (errorCode: number) => {
	switch (errorCode) {
		case 401:
			addToast({
				title: "憑證過期或遺失，請重新領取憑證。",
				color: "danger",
			});
			break;
		case 404:
			addToast({
				title: "找不到資源，請檢查您的請求。",
				color: "warning",
			});
			break;
		case 500:
			addToast({
				title: "伺服器連線錯誤，請檢查您的網路連線。",
				color: "danger",
			});
			break;
		default:
			addToast({
				title: `發生錯誤，錯誤代碼 ${errorCode}，請稍候再試！`,
				color: "danger",
			});
	}
};
export default tmdb;
