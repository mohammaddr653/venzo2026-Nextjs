import localFont from "next/font/local";

export const iransans = localFont({
  src: [
    {
      path: "../assets/fonts/iransans/IRANSansWeb_FaNum_Bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/iransans/IRANSansWeb_FaNum_Light.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/iransans/IRANSansWeb_FaNum_Medium.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/iransans/IRANSansWeb_FaNum_UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-iransans",
  preload: true,
});