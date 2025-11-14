"use client";

import { useClickedImageStore, useGalleryShowStore } from "@/store";

interface OpenButtonTypes
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  initialSlide: number;
  children?: React.ReactNode;
}

const OpenButton = ({ initialSlide, children, ...props }: OpenButtonTypes) => {
  const { setClickedImg } = useClickedImageStore();
  const { setGalleryShow } = useGalleryShowStore();

  function handleClick() {
    setClickedImg(initialSlide);
    setGalleryShow(true);
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default OpenButton;
