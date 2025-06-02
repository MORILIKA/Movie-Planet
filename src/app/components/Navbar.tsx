"use client";
import { useEffect, useState } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import SearchInput from "@/app/components/SearchInput";
import Icons from "@/app/components/Icons";
import throttle from "@/app/utils/throttle";

export const IconPlanet = () => {
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
				d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
			/>
		</svg>
	);
};

export default function Nav() {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [isNavBgShow, setIsNavBgShow] = useState(false);

	useEffect(() => {
		const scrollEl = document.getElementById("global-scroll-container");
		const handlerScroll = throttle(() => {
			const scrollEl = document.getElementById("global-scroll-container");
			const scrollTop: number = scrollEl?.scrollTop || 0;
			const navHeight = document.getElementById("navbar")?.clientHeight || 0;
			// 當滾動超過 nav高度時，顯示背景
			setIsNavBgShow(scrollTop > navHeight);
		}, 500);
		scrollEl?.addEventListener("scroll", handlerScroll);
		return () => {
			scrollEl?.removeEventListener("scroll", handlerScroll);
		};
	}, []);

	return (
		<Navbar
			className={`fixed top-0  z-50 w-full duration-300 ${isNavBgShow ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"}`}
			maxWidth="xl"
			isBlurred={false}
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
			id="navbar"
		>
			<NavbarContent justify="start">
				<NavbarBrand>
					<Link className="text-white" href="/">
						<IconPlanet />
						<p className="font-medium text-inherit ml-2">電影星球</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<div className="flex flex-row items-center">
						<SearchInput />

						<Button
							className="font-medium hidden sm:inline-flex"
							color="danger"
							size="md"
							onPress={() => router.push("/favorite")}
						>
							<Icons name="favorite" />
							待看清單
						</Button>
						<Button
							className="font-medium text-xs sm:hidden"
							color="danger"
							size="sm"
							onPress={() => router.push("/favorite")}
						>
							<Icons name="favorite" />
							待看清單
						</Button>
					</div>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
