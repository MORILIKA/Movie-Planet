import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "@/components/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";

type PropType<T = unknown> = {
	slides: Array<T>; // 使用泛型 T，預設為 any，支援多種資料類型
	options?: EmblaOptionsType;
	template?: (slide: T, index: number) => React.ReactNode; // 使用泛型 T，確保 template 函數的類型一致
	className?: string; // 新增 className 屬性
	[key: string]: unknown; // 允許其他屬性
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options, template, className } = props; // 接收 className
	const [emblaRef, emblaApi] = useEmblaCarousel(options);
	const [slidesInView, setSlidesInView] = useState<number[]>([]);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
		setSlidesInView((slidesInView) => {
			if (slidesInView.length === emblaApi.slideNodes().length) {
				emblaApi.off("slidesInView", updateSlidesInView);
			}
			const inView = emblaApi
				.slidesInView()
				.filter((index) => !slidesInView.includes(index));
			return slidesInView.concat(inView);
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		updateSlidesInView(emblaApi);
		emblaApi.on("slidesInView", updateSlidesInView);
		emblaApi.on("reInit", updateSlidesInView);
	}, [emblaApi, updateSlidesInView]);

	return (
		<div className={` relative ${className}`}>
			<section className="embla">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container ">
						{slides.map((slide, index) => (
							<div className="embla__slide" key={index}>
								{/* 使用 template 函數渲染內容 */}
								<div className="embla__lazy-load">
									{slidesInView.includes(index) && (
										<div className="embla__lazy-load__img">
											{template && template(slide, index)}{" "}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<div className="embla__controls">
				<div className="embla__buttons">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default EmblaCarousel;
