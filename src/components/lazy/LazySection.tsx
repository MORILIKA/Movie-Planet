"use client";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const LazyPlayNow = dynamic(() => import("@/components/sections/PlayNow"), {
	ssr: false,
});
const LazyTopRated = dynamic(() => import("@/components/sections/TopRated"), {
	ssr: false,
});
const LazyUpComing = dynamic(() => import("@/components/sections/UpComing"), {
	ssr: false,
});

export default function LazySectionHost() {
	const { ref: playRef, inView: playInView } = useInView({
		triggerOnce: true,
		threshold: 0.8,
	});
	const { ref: topRef, inView: topInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const { ref: upRef, inView: upInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<>
			<div ref={playRef}>{playInView && <LazyPlayNow />}</div>
			<div ref={topRef}>{topInView && <LazyTopRated />}</div>
			<div ref={upRef}>{upInView && <LazyUpComing />}</div>
		</>
	);
}
