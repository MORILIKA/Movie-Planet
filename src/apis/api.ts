import tmdb from "@/apis/axios-tmdb";

const tmdbFetcher = (url: string) => tmdb.get(url).then((res) => res.data);

export { tmdbFetcher };
