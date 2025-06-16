function throttle<T extends (...args: unknown[]) => void>(
	fn: T,
	delay = 100
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return function (...args: Parameters<T>) {
		if (timer) return;
		timer = setTimeout(() => {
			fn(...args);
			timer = null;
		}, delay);
	};
}
export default throttle;
