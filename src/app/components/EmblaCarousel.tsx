import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
	PrevButton,
	NextButton,
	usePrevNextButtons,
} from "@/app/components/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";

type PropType<T = unknown> = {
	slides: Array<T>; // 使用泛型 T，預設為 any，支援多種資料類型
	options?: EmblaOptionsType;
	template?: (slide: T) => React.ReactNode; // 使用泛型 T，確保 template 函數的類型一致
	className?: string; // 新增 className 屬性
	[key: string]: unknown; // 允許其他屬性
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options, template, className } = props; // 接收 className
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	return (
		<div className={` relative ${className}`}>
			<section className="embla">
				<div className="embla__viewport" ref={emblaRef}>
					<div className="embla__container ">
						{slides.map((slide, index) => (
							<div className="embla__slide" key={index}>
								{template && template(slide)} {/* 使用 template 函數渲染內容 */}
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
