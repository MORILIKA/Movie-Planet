import { redirect } from "next/navigation";

export default function HomePage() {
	redirect("/home"); // 使用 Next.js 提供的 redirect 函數進行重導向
	return null; // 此頁面不會被渲染，因為已經重導向
}
