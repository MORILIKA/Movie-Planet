const debounce = (fn: (...args: unknown[]) => void, delay: number = 500) => {
	let timer: NodeJS.Timeout;
	return (...args: unknown[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};
export default debounce;
