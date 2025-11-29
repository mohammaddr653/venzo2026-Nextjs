"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Scrollbar,
  Pagination,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import Image from "next/image";
import { useWidthStore } from "@/store";
import { BREAK_POINTS, DEFAULT_IMAGE } from "../../../../config";
import slides from "@/data/greetings-slides.json";
import Skeleton from "@/components/skeleton";
import SwiperControlls from "@/components/swiper-controlls";

const Greetings = () => {
  const { width } = useWidthStore();
  return (
    <div className="relative w-full aspect-[840/500] md:aspect-[1356/339] md:rounded-2xl overflow-hidden">
      {width ? (
        <Swiper
          modules={[
            Pagination,
            Autoplay,
            EffectFade,
            Navigation,
            Scrollbar,
            A11y,
          ]}
          initialSlide={0}
          loop={true}
          autoplay={{ delay: 2000 }}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={500}
        >
          <SwiperControlls
            parentClass="swiperjs-controlls flex justify-between items-stretch top-0 h-full w-full absolute text-black"
            prevClass="cursor-pointer flex z-40 hover:shadow transition-all duration-300 text-white justify-center items-center px-3 rounded-r-2xl"
            nextClass="cursor-pointer flex z-40 hover:shadow transition-all duration-300 text-white justify-center items-center px-3 rounded-l-2xl"
          ></SwiperControlls>

          {slides?.map((slider: any, index: any) => {
            return (
              <SwiperSlide className="relative">
                {width > BREAK_POINTS.md ? (
                  <Image
                    //rez:1456/364
                    alt="main-slider"
                    src={`/${slider.deskUrl}`}
                    width={1456}
                    height={364}
                    sizes="1456px"
                    priority={true}
                    placeholder="blur"
                    blurDataURL={DEFAULT_IMAGE}
                    className="w-full aspect-[1456/364] object-cover"
                  ></Image>
                ) : (
                  <Image
                    //rez:834/496
                    alt="main-slider-mobile"
                    src={`/${slider.mobUrl}`}
                    priority={true}
                    width={834}
                    placeholder="blur"
                    blurDataURL={DEFAULT_IMAGE}
                    height={496}
                    sizes="834px"
                    className="w-full aspect-[834/496] object-cover"
                  ></Image>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Skeleton className="w-full h-full animate-pulse"></Skeleton>
      )}
    </div>
  );
};

export default Greetings;
