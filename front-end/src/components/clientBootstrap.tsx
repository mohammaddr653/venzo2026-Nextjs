//این کامپوننت داده های اولیه مورد نیاز ما را میگیرد و در گلوبال ذخیره میکند

"use client";
import { useMobileMenuStore, useWidthStore } from "@/store";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";

const ClientBootstrap = () => {
  const { setWidth } = useWidthStore();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const { mobileMenuShow, setMobileMenuShow } = useMobileMenuStore();

  useEffect(() => {
    const header = document.getElementsByTagName("header")[0];
    mobileMenuShow
      ? header.classList.add("mobmenu-open")
      : header.classList.remove("mobmenu-open");
  }, [mobileMenuShow]);

  function handleScroll() {
    let lastScrollTop = 0;
    let st = window.pageYOffset || document.documentElement.scrollTop;
    const html = document.getElementsByTagName("html")[0];

    if (st > lastScrollTop) {
      html.classList.contains("scrolled")
        ? null
        : html.classList.add("scrolled");
    } else if (st === 0) {
      html.classList.remove("scrolled");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
    const initialInnerWidth = window.innerWidth;
    setWidth(initialInnerWidth);
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      setWidth(innerWidth);
    };
    window.addEventListener("resize", handleResize);
    axios.defaults.withCredentials = true; //sends httponly cookies to the server by default
    window.addEventListener("scroll", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return fontsLoaded ? null : <Loading></Loading>;
};

export default ClientBootstrap;
