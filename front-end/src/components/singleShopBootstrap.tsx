//این کامپوننت داده های اولیه مورد نیاز ما را میگیرد و در گلوبال ذخیره میکند

"use client";

import { useGalleryShowStore } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SingleShopBootstrap = () => {
  const pathname = usePathname();
  const {setGalleryShow } = useGalleryShowStore();

  useEffect(() => {
    setGalleryShow(false);
  }, [pathname]);

  return null;
};

export default SingleShopBootstrap;
