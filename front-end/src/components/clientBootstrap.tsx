//این کامپوننت داده های اولیه مورد نیاز ما را میگیرد و در گلوبال ذخیره میکند

"use client";
import { useMobileMenuStore, useWidthStore } from "@/store";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { usePathname } from "next/navigation";

const ClientBootstrap = () => {
  const { setWidth } = useWidthStore();
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const { mobileMenuShow, setMobileMenuShow } = useMobileMenuStore();
  const pathname = usePathname();

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    mobileMenuShow
      ? html.classList.add("mobmenu-open")
      : html.classList.remove("mobmenu-open");
  }, [mobileMenuShow]);

  useEffect(() => {
    setMobileMenuShow(false);
  }, [pathname]);

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
    window.addEventListener("scroll", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return fontsLoaded ? null : <Loading></Loading>;
};

export default ClientBootstrap;
