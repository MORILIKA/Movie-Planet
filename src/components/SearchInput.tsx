"use client";
import {
	Input,
	Popover,
	PopoverTrigger,
	Button,
	PopoverContent,
} from "@heroui/react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import debounce from "@/utils/debouce";
import Icons from "@/components/Icons";
export const IconSearch = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-6 cursor-pointer"
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
	const searchParams = useSearchParams();
	const keyword = searchParams.get("keyword") || "";
	const [searchKeyword, setSearchKeyword] = useState(keyword);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [inputSpinner, setInputSpinner] = useState(false);
	const router = useRouter();
	const searchMovie = debounce((keyword) => {
		router.push(keyword ? `/search?keyword=${keyword}` : "/");
		setInputSpinner(false);
	}, 2000);
	const searchHandler = (value: string) => {
		setInputSpinner(true);
		setSearchKeyword(value);
		searchMovie(value);
	};

	return (
		<>
			<div className="flex flex-row items-center mr-4 hidden sm:flex">
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
					defaultValue={searchKeyword || keyword}
				></Input>
				<div
					className="ml-2 flex-shrink-0 flex justify-center items-center cursor-pointer"
					onClick={() => setIsSearchOpen(!isSearchOpen)}
				>
					<Icons name="Search" style="text-[24px]" />
				</div>
			</div>
			{/* 手機裝置改為彈出式搜尋 */}
			<div className="mr-2 sm:hidden">
				<Popover showArrow offset={10} placement="bottom" size="sm">
					<PopoverTrigger>
						<Button className="bg-transparent" isIconOnly size="sm">
							<Icons name="Search" style="text-[24px]" />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						{() => (
							<div className="flex flex-col items-center justify-center  py-2">
								<Input
									className="w-[200px]"
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
									defaultValue={searchKeyword || keyword}
								></Input>
							</div>
						)}
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}
