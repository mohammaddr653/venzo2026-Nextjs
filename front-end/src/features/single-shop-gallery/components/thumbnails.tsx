"use client";

import ThreeDotsSvg from "@/components/icons/three-dots-svg";
import Img from "@/components/img";
import { useClickedImageStore } from "@/store";
import OpenButton from "./openButton";

const Thumbnails = ({ product }: any) => {
  const { setClickedImg } = useClickedImageStore();

  return product?.gallery.length ? (
    <div className=" flex flex-row justify-center p-2 gap-1 rounded-md border border-neutral-300">
      {product.gallery.slice(0, 5).map((image: any, index: any) => {
        return (
          <div
            key={index}
            className="relative max-w-[50px] rounded-md overflow-hidden cursor-pointer"
            onClick={() => setClickedImg({ ...image })}
          >
            <Img
              pic={image}
              sizes={"70px"}
              className="aspect-square object-cover w-full"
            ></Img>
            {4 < product.gallery.length - 1 && index === 4 ? (
              <OpenButton className=" flex justify-center items-center absolute top-0 w-full h-full bg-transparent backdrop-blur-xs">
                <ThreeDotsSvg width={20} fill={"white"}></ThreeDotsSvg>
              </OpenButton>
            ) : null}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default Thumbnails;
