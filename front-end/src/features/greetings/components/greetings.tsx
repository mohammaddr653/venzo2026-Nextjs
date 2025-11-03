"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Scrollbar,
  Pagination,
  A11y,
  EffectFade,
} from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import SwiperButtonPrev from "@/components/swiper-button-prev";
import SwiperButtonNext from "@/components/swiper-button-next";
import Image from "next/image";

const Greetings = () => {
  return (
    <div className="relative w-full aspect-[1508/377]">
      <Swiper
        modules={[Pagination, EffectFade, Navigation, Scrollbar, A11y]}
        initialSlide={0}
        loop={true}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={500}
      >
        <div className="swiperjs-controlls flex justify-between items-stretch top-0 h-full w-full absolute text-black">
          <SwiperButtonPrev
            className={
              "cursor-pointer flex z-40 hover:shadow transition-all duration-300 text-white justify-center items-center px-3 rounded-r-2xl"
            }
            width={30}
            height={30}
          ></SwiperButtonPrev>
          <SwiperButtonNext
            className={
              "cursor-pointer flex z-40 hover:shadow transition-all duration-300 text-white justify-center items-center px-3 rounded-l-2xl"
            }
            width={30}
            height={30}
          ></SwiperButtonNext>
        </div>
        <SwiperSlide className="relative md:rounded-2xl overflow-hidden">
          <Image
            alt="main-slider"
            src={"/Gaming Consoles slider pc v1 copy-1600x400.jpg"}
            width={1508}
            height={377}
          ></Image>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Greetings;
