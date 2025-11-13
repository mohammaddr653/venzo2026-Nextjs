//این کامپوننت داده های اولیه مورد نیاز ما را میگیرد و در گلوبال ذخیره میکند

"use client";

import { useClickedImageStore } from "@/store";
import { useEffect } from "react";

const SingleShopBootstrap = ({ product }: any) => {
  const { setClickedImg } = useClickedImageStore();

  useEffect(() => {
    if (product?.img) {
      product.gallery.unshift(product.img);
      setClickedImg({ ...product.img });
    }
  }, [product]);

  return null;
};

export default SingleShopBootstrap;
