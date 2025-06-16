function Icons({
	name,
	style = "material-symbols-outlined",
}: {
	name: string;
	style?: string;
	[key: string]: unknown;
}) {
	return <span className={`material-symbols-outlined ${style}`}>{name}</span>;
}
export default Icons;
