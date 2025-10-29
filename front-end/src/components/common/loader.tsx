"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <DotLottieReact
      src="/lottie/Ripple loading animation.lottie"
      loop
      className="w-full"
      autoplay
    />
  );
};

export default Loader;
