"use client";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { CirclePlay, Heart } from "lucide-react";
import throttle from "@/utils/throttle";

export default function Nav() {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [isNavBgShow, setIsNavBgShow] = useState(false);

	useEffect(() => {
		const scrollEl = document.getElementById("global-scroll-container");
		const handlerScroll = throttle(() => {
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
						<CirclePlay />
						<p className="font-medium text-inherit ml-2">電影星球</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<div className="flex flex-row items-center">
						<SearchInput />

						<Button
							className="font-medium hidden sm:inline-flex flex-shrink-0"
							color="danger"
							size="md"
							onPress={() => router.push("/favorite")}
						>
							<Heart size={20} />
							待看清單
						</Button>
						<Button
							className="font-medium text-xs sm:hidden flex-shrink-0 gap-1"
							color="danger"
							size="sm"
							onPress={() => router.push("/favorite")}
						>
							<Heart size={14} />
							待看清單
						</Button>
					</div>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
