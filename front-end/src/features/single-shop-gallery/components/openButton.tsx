"use client";

import { useGalleryShowStore } from "@/store";

interface OpenButtonTypes
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const OpenButton = ({ children, ...props }: OpenButtonTypes) => {
  const { setGalleryShow } = useGalleryShowStore();

  return (
    <button onClick={() => setGalleryShow(true)} {...props}>
      {children}
    </button>
  );
};

export default OpenButton;
