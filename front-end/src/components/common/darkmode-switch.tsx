"use client";

import { useDarkStore } from "@/store";
import { useEffect } from "react";
import SunSvg from "../icons/sun-svg";
import MoonSvg from "../icons/moon-svg";

const DarkmodeSwitch = () => {
  const { darkmode, setDarkmode } = useDarkStore();
  function handleSwitch() {
    darkmode ? setDarkmode(false) : setDarkmode(true);
  }
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    darkmode ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkmode]);

  return (
    <button onClick={handleSwitch} className="cursor-pointer" aria-label="Color mode switch">
      {darkmode ? (
        <SunSvg width={25} fill={"currentColor"}></SunSvg>
      ) : (
        <MoonSvg width={25} fill={"currentColor"}></MoonSvg>
      )}
    </button>
  );
};

export default DarkmodeSwitch;
