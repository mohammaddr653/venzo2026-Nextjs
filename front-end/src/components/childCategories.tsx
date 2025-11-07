"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import SwiperButtonPrev from "./swiper-button-prev";
import SwiperButtonNext from "./swiper-button-next";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_IMAGE, SERVER_URL } from "../../config";

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
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        spaceBetween={20}
        initialSlide={0}
        className="mySwiper w-full"
      >
        <div className="swiperjs-controlls flex justify-between items-center top-[calc(50%-10px)] px-2 w-full absolute text-black">
          <SwiperButtonPrev
            className={
              "cursor-pointer flex z-40 hover:shadow transition-all duration-300 bg-neutral-primary/70 text-white justify-center items-center p-3 rounded-full"
            }
            width={20}
            height={20}
          ></SwiperButtonPrev>
          <SwiperButtonNext
            className={
              "cursor-pointer flex z-40 hover:shadow transition-all duration-300 bg-neutral-primary/70 text-white justify-center items-center p-3 rounded-full"
            }
            width={20}
            height={20}
          ></SwiperButtonNext>
        </div>
        {childCats.map((item: any, index: any) => {
          if (item.motherId === categoryId) {
            return (
              <SwiperSlide>
                <Link
                  key={index}
                  href={`/shop/${item._id}`}
                  className=" rounded-md flex flex-col justify-between border overflow-hidden border-neutral-300 p-2 gap-2 items-center"
                >
                  <Image
                    alt="child-category"
                    src={
                      item.img?.urls?.original?.url
                        ? SERVER_URL + item.img.urls.original.url
                        : DEFAULT_IMAGE
                    }
                    width={200}
                    height={100}
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                    className="w-full object-cover"
                  ></Image>
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
