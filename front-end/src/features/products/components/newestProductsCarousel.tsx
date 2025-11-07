"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import callManager from "@/hooks/callManager";
import { SERVER_API } from "../../../../config";
import ProductCard from "./product-card";
import SwiperControlls from "@/components/swiper-controlls";

// import required modules

const NewestProductsCarousel = () => {
  const { call } = callManager();
  const [products, setProducts] = useState<any[]>([]);

  async function load() {
    const response = await call(
      axios.get(SERVER_API + "/shop/most-products?type=newest"),
      false
    );
    setProducts([...response?.data.data]);
  }

  useEffect(() => {
    load();
  }, []);

  return products?.length ? (
    <div className="products-carousel-container">
      <div className="pb-5 text-xl font-weight300 text-neutral-primary">
        <h3>جدیدترین محصولات</h3>
      </div>
      <div className="carousel">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1.1,
            },
            640: {
              slidesPerView: 2.1,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={20}
          initialSlide={0}
          className="mySwiper"
        >
          <SwiperControlls
            parentClass="swiperjs-controlls flex justify-between items-stretch top-[calc(50%-10px)] px-2 w-full absolute text-black"
            prevClass="cursor-pointer flex z-40 hover:shadow transition-all duration-300 bg-neutral-primary/70 text-white justify-center items-center p-3 rounded-full"
            nextClass="cursor-pointer flex z-40 hover:shadow transition-all duration-300 bg-neutral-primary/70 text-white justify-center items-center p-3 rounded-full"
          ></SwiperControlls>

          {products.map((product: any, index: any) => {
            return (
              <SwiperSlide>
                <ProductCard key={index} product={product}></ProductCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  ) : null;
};
export default NewestProductsCarousel;
