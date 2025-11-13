"use client";
import "@/assets/css/gallery-slider.css";
import React from "react";
import { useGalleryShowStore } from "@/store";
import ScreenWrapper from "@/components/screen-wrapper";
import GallerySwiper from "./gallerySwiper";

const GallerySlider = ({ product }: any) => {
  const { galleryShow } = useGalleryShowStore();

  return galleryShow && product?.gallery.length ? (
    <ScreenWrapper className="w-full h-full top-0 right-0 z-60 flex justify-center bg-glass-shadow">
      <GallerySwiper object={product?.gallery}></GallerySwiper>
    </ScreenWrapper>
  ) : null;
};

export default GallerySlider;
