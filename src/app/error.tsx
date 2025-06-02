"use client";
import { Image, Button } from "@heroui/react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		// global-error must include html and body tags
		<div>
			<div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
				<h2 className="font-bold text-2xl">Opps.. 出了點差錯</h2>
				<p className="text-gray-500">
					{error.message || "發生了一個未知的錯誤，請稍後再試。"}
				</p>
				<Image alt="HeroUI hero Image" src="/sadness.webp" width={240} />
				<Button color="primary" radius="full" onPress={() => reset()}>
					Try again
				</Button>
			</div>
		</div>
	);
}
