"use client"
import { handleGoUp } from "../helpers/handleGoUp";
import LeftSvg from "./icons/left-svg";

const GoUp = () => {
  return (
    <button
      className="hidden scrolled:flex fixed bottom-0 left-0 my-10 mx-10 md:mx-25 p-3 aspect-square text-white rounded-md bg-primary z-40 opacity-50 cursor-pointer hover:opacity-100 transition-opacity duration-300"
      onClick={() => handleGoUp("smooth")}
    >
      <LeftSvg width={20} fill={"currentColor"} className={"rotate-90"}></LeftSvg>
    </button>
  );
};

export default GoUp;
