function Icons({
	name,
	style = "material-symbols-outlined",
}: {
	name: string;
	style?: string;
}) {
	return <span className={style}>{name}</span>;
}
export default Icons;
