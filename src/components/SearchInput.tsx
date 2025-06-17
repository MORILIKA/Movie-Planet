"use client";
import { Input } from "@heroui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import debounce from "@/utils/debouce";

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
					<Search />
				</div>
			</div>
			{/* 手機裝置改為彈出式搜尋 */}
			<div className="mr-2 sm:hidden">
				<Popover showArrow offset={10} placement="bottom" size="sm">
					<PopoverTrigger>
						<Button className="bg-transparent" isIconOnly size="sm">
							<Search />
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
