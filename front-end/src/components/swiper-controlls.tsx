"use client";
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";

const SwiperControlls = ({ parentClass, prevClass, nextClass }: any) => {
  return (
    <div className={parentClass}>
      <SwiperButtonPrev
        className={prevClass}
        width={20}
        height={20}
      ></SwiperButtonPrev>
      <SwiperButtonNext
        className={nextClass}
        width={20}
        height={20}
      ></SwiperButtonNext>
    </div>
  );
};
export default SwiperControlls;
