import { Input } from "@heroui/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";
import debounce from "@/app/utils/debouce";

export const IconSearch = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-6"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>
	);
};

export default function SearchInput() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const router = useRouter();
	const searchKeyword = debounce((keyword) => {
		if (keyword) {
			router.push(`/search?keyword=${keyword}`);
		} else {
			router.push("/");
		}
		setInputSpinner(false);
	}, 2000);
	// 這邊改成把keyword跟是否在搜尋的狀態放在狀態管理工具,音響要於跳轉並得到api結果之後才關閉spinner，也為了讓keyword與route同步
	const [inputSpinner, setInputSpinner] = useState(false);
	const searchHandler = (value: string) => {
		setInputSpinner(true);
		searchKeyword(value);
	};

	return (
		<div className="flex flex-row items-center rounded-full mr-4">
			<Input
				className={`${isSearchOpen ? "w-[200px]" : "w-[0px]"} overflow-hidden 
										duration-300`}
				classNames={{
					input: ["bg-transparent"],
					inputWrapper: ["bg-black/60"],
					innerWrapper: ["bg-transparent"],
				}}
				placeholder="搜尋電影"
				onValueChange={searchHandler}
				endContent={
					inputSpinner && (
						<Spinner size="sm" color="primary" variant="gradient" />
					)
				}
			></Input>
			<div
				className="ml-2 flex-shrink-0"
				onClick={() => setIsSearchOpen(!isSearchOpen)}
			>
				<IconSearch />
			</div>
		</div>
	);
}
