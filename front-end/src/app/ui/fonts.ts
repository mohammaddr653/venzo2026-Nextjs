import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { Vazirmatn } from "next/font/google";

export const roboto = Roboto({
  weight: ["500", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export const iransans = localFont({
  src: [
    {
      path: "../../assets/fonts/iransans/IRANSansWeb_FaNum_Bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/iransans/IRANSansWeb_FaNum_Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/iransans/IRANSansWeb_FaNum_Medium.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/iransans/IRANSansWeb_FaNum_UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-iransans",
  preload: true,
});

export const nastaliq = localFont({
  src: [
    {
      path: "../../assets/fonts/nastaliq/IranNastaliq_YasDL.com.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  display: "swap",
});
