"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import Link from "next/link";
import { BREAK_POINTS } from "../../config";
import SwiperControlls from "./swiper-controlls";
import Img from "./img";

const ChildCategories = ({ childCats, categoryId }: any) => {
  return (
    <div className="childCategories-container px-5 md:px-20 flex flex-col gap-2">
      <p className="font-weight300 text-size16 text-neutral-800">
        جستجوی دقیق تر
      </p>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          [BREAK_POINTS.sm]: {
            slidesPerView: 2.5,
          },
          [BREAK_POINTS.md]: {
            slidesPerView: 4,
          },
          [BREAK_POINTS.lg]: {
            slidesPerView: 6,
          },
        }}
        spaceBetween={20}
        initialSlide={0}
        className="mySwiper w-full"
      >
        <SwiperControlls
          parentClass="swiperjs-controlls flex justify-between items-stretch top-[calc(50%-22.5px)] h-[45px] px-2 w-full absolute text-black"
          prevClass="cursor-pointer flex z-40 hover:shadow transition-all duration-300 bg-neutral-primary/70 text-white justify-center items-center aspect-square rounded-full"
          nextClass="cursor-pointer flex z-40 hover:shadow transition-all duration-300 bg-neutral-primary/70 text-white justify-center items-center aspect-square rounded-full"
        ></SwiperControlls>
        {childCats.map((item: any, index: any) => {
          if (item.motherId === categoryId) {
            return (
              <SwiperSlide>
                <Link
                  key={index}
                  href={`/shop/${item._id}`}
                  className=" rounded-md flex flex-col justify-between border overflow-hidden border-neutral-300 p-2 gap-2 items-center"
                >
                  {/* 380/280 */}
                  <Img
                    pic={item.img}
                    width={380}
                    height={280}
                    alt="child-category-image"
                    sizes={`
                      (max-width: ${BREAK_POINTS.sm}px) 372px,
                      (max-width: ${BREAK_POINTS.md}px) 260px,
                      (max-width: ${BREAK_POINTS.lg}px) 183px,
                      208px
                    `}
                    loading="lazy"
                    className={
                      "object-cover aspect-[380/280] border border-neutral-300"
                    }
                  ></Img>

                  <h3 className="text-size15">{item.name}</h3>
                </Link>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
};

export default ChildCategories;
