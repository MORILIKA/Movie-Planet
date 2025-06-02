import type { Metadata } from "next";

type Props = {
	params: Promise<{ movieId: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const movieId = (await params).movieId;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
		},
	};

	const keywordResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/keywords?language=zh-TW`,
		options
	);
	const { keywords } = await keywordResponse.json();
	const keywordsArr = keywords
		?.map((keyword: { name: string; id: number }) => keyword.name)
		.join(", ");

	const movieResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?language=zh-TW`,
		options
	);
	const movieData = await movieResponse.json();
	const description = movieData.overview || "No description available";
	const title = `電影星球 ${movieData.title || movieData.original_title}`;
	return {
		title: title,
		description: description,
		keywords: keywordsArr,
	};
}

export default function Layout({
	children,
	credits,
	videos,
	reviews,
}: {
	children: React.ReactNode;
	credits: React.ReactNode;
	videos: React.ReactNode;
	reviews: React.ReactNode;
}) {
	return (
		<main>
			{children}
			<div className="">{credits}</div>
			{videos}
			{reviews}
		</main>
	);
}
