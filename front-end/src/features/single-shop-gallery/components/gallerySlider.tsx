"use client"
import "@/assets/css/gallery-slider.css";
import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import Img from "@/components/img";
import ExitSvg from "@/components/icons/exit-svg";

const GallerySlider = ({ object, setGalleryShow }: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="gallery-slider-container bg-black flex flex-col w-full justify-start h-full">
      <div className="flex px-3 flex-1 flex-row justify-end">
        <button
          className="cursor-pointer p-2 flex justify-center items-center"
          onClick={() => setGalleryShow(false)}
        >
          <ExitSvg width={30} fill={"white"}></ExitSvg>
        </button>
      </div>
      <div className="flex px-7 pb-5 flex-9 justify-end h-full items-center flex-col">
        <Swiper
          style={{
            // @ts-ignore
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 flex-8"
        >
          {object
            ? object.map((item: any, index: any) => {
                return (
                  <SwiperSlide key={index}>
                    <Img
                      pic={item}
                      sizes={"500px"}
                      className="object-cover h-full"
                    ></Img>
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper flex-2"
        >
          {object
            ? object.map((item: any, index: any) => {
                return (
                  <SwiperSlide key={index}>
                    <Img
                      pic={item}
                      sizes={"500px"}
                      className="object-cover h-full"
                    ></Img>
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
      </div>
    </div>
  );
};

export default GallerySlider;
