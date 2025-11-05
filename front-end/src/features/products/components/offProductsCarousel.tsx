"use client";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import axios from "axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import callManager from "@/hooks/callManager";
import { SERVER_API } from "../../../../config";
import SwiperButtonPrev from "@/components/swiper-button-prev";
import SwiperButtonNext from "@/components/swiper-button-next";

// import required modules

const OffProductsCarousel = () => {
  const { call } = callManager();
  const [products, setProducts] = useState<any[]>([]);

  async function load() {
    const response = await call(
      axios.get(SERVER_API + "/shop/most-products?type=offers"),
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
        <h3>پیشنهاد ویژه</h3>
      </div>
      <div className="carousel">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1.1,
            },
            640: {
              slidesPerView: 2.5,
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
export default OffProductsCarousel;
