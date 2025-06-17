"use client";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
export default function NotFound() {
	const router = useRouter();
	return (
		<div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
			<h2 className="font-bold text-2xl">Opps.. 頁面不存在</h2>
			<Image alt="HeroUI hero Image" src="/sadness.webp" width={240} />
			<Button color="primary" radius="full" onPress={() => router.push("/")}>
				回到首頁
			</Button>
		</div>
	);
}
