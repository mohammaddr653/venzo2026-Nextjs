"use client";
// import "@/assets/css/gallery-slider.css";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import Img from "@/components/img";
import ExitSvg from "@/components/icons/exit-svg";
import { useClickedImageStore, useGalleryShowStore } from "@/store";
import ScreenWrapper from "@/components/screen-wrapper";
import { BREAK_POINTS } from "../../../../config";

const GallerySwiper = ({ object }: any) => {
  const { clickedImg } = useClickedImageStore();
  const { setGalleryShow } = useGalleryShowStore();

  return (
    <ScreenWrapper className="w-full h-full top-0 right-0 z-60 flex justify-center bg-glass-shadow">
      <div className="gallery-slider-container bg-black flex flex-col w-full justify-start h-[100vh]">
        <div className="flex flex-[1] px-3 justify-end">
          <button
            className="cursor-pointer p-2 flex justify-center items-center"
            onClick={() => setGalleryShow(false)}
          >
            <ExitSvg width={30} fill={"white"}></ExitSvg>
          </button>
        </div>
        <div className="flex flex-[9] pb-5 overflow-hidden">
          <Swiper
            style={{
              // @ts-ignore
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            initialSlide={clickedImg}
            navigation={true}
            modules={[FreeMode, Navigation]}
            className="mySwiper2"
          >
            {object
              ? object.map((item: any, index: any) => {
                  return (
                    <SwiperSlide key={index}>
                      <Img
                        // rez:1500/1500
                        pic={item}
                        alt="gallery image"
                        sizes={`
                          (max-width: ${BREAK_POINTS.sm}px) 640px,
                          (max-width: ${BREAK_POINTS.md}px) 768px,
                          (max-width: ${BREAK_POINTS.lg}px) 1024px,
                          (max-width: ${BREAK_POINTS.xl}px) 1282px,
                          1323px
                        `}
                        className="object-contain aspect-square h-full"
                      ></Img>
                    </SwiperSlide>
                  );
                })
              : null}
          </Swiper>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default GallerySwiper;
