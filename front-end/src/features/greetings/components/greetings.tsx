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
import Image from "next/image";
import { useWidthStore } from "@/store";
import { BREAK_POINTS, DEFAULT_IMAGE } from "../../../../config";
import Skeleton from "@/components/skeleton";
import SwiperControlls from "@/components/swiper-controlls";

const Greetings = () => {
  const { width } = useWidthStore();
  const sliders = [
    {
      id: 1,
      link: "https://digikala.com",
      deskUrl: "Gaming Consoles slider pc v1 copy-1600x400.jpg",
      mobUrl: "Gaming Consoles slider mobile v1 copy-1500x400.jpg",
    },
    {
      id: 2,
      link: "https://digikala.com",
      deskUrl: "Gaming Monitors slider pc v1 copy-1600x400.jpg",
      mobUrl: "Gaming Monitors slider mobile v1 copy-1500x400.jpg",
    },
    {
      id: 3,
      link: "https://digikala.com",
      deskUrl: "Gaming System slider pc v1 copy-1600x400.jpg",
      mobUrl: "Gaming System slider mobile v1 copy-1500x400.jpg",
    },
    {
      id: 4,
      link: "https://digikala.com",
      deskUrl: "Gpus slider pc v1 copy (2)-1600x400.jpg",
      mobUrl: "Gpus slider mobile v1 copy-1500x400.jpg",
    },
    {
      id: 5,
      link: "https://digikala.com",
      deskUrl: "Rendering Systems slider pc v1 copy-1600x400.jpg",
      mobUrl: "Rendering Systems slider mobile v1 copy-1500x400.jpg",
    },
    {
      id: 6,
      link: "https://digikala.com",
      deskUrl: "Accessories pc v1 copy-1600x400.jpg",
      mobUrl: "Accessories mobile v1 copy-1500x400.jpg",
    },
    {
      id: 7,
      link: "https://digikala.com",
      deskUrl: "MSI C v1 copy-1600x400.jpg",
      mobUrl: "gaming chair mobile v1 copy-1-1500x400.jpg",
    },
  ];
  return (
    <div className="relative w-full aspect-[840/500] md:aspect-[1356/339] md:rounded-2xl overflow-hidden">
      {width ? (
        <Swiper
          modules={[Pagination, EffectFade, Navigation, Scrollbar, A11y]}
          initialSlide={0}
          loop={true}
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

          {sliders?.map((slider: any, index: any) => {
            return (
              <SwiperSlide className="relative">
                {width > BREAK_POINTS.md ? (
                  <Image
                    //rez:1456/364
                    alt="main-slider"
                    src={`/${slider.deskUrl}`}
                    width={1456}
                    height={364}
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
