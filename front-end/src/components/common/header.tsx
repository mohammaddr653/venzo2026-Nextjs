"use client";
import { useScrollStore, useUserStore } from "../../store";
import Link from "next/link";
import DarkmodeSwitch from "./darkmode-switch";
import MenuSvg from "../icons/menu-svg";
import { useState } from "react";
import CloseSvg from "../icons/close-svg";
import Logo from "./logo";
import MenuNavbar from "./menu-navbar";

const Header = () => {
  const [mobileMenuShow, setMobileMenuShow] = useState<boolean>(false);
  const { isScrolled } = useScrollStore();
  const { user } = useUserStore();

  return (
    <header className="fixed z-50 w-full max-w-screen">
      <div
        className={`header-container relative flex justify-between gap-10 items-center px-5 md:px-40 py-4 transition-all duration-300 delay-150 ${
          isScrolled
            ? "bg-[#ffffffeb] dark:bg-[#171717ef] shadow-b-lean-300 dark:shadow-b-lean-light backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <Logo></Logo>
        <nav className="hidden md:flex">
          <ul className="flex gap-5 text-size14 text-primary dark:text-secondary">
            <MenuNavbar></MenuNavbar>
          </ul>
        </nav>
        <div className="flex gap-3 items-center text-primary dark:text-secondary">
          {user && user.isadmin ? (
            <Link href={"/admin"} className="cu-button-primary dark:bg-red-600">
              پنل ادمین
            </Link>
          ) : null}
          <DarkmodeSwitch></DarkmodeSwitch>
          <button
            onClick={() => setMobileMenuShow(true)}
            className={"cursor-pointer md:hidden"}
            aria-label="Open menu"
          >
            <MenuSvg width={30} fill={"currentColor"}></MenuSvg>
          </button>
        </div>
        {mobileMenuShow ? (
          <div
            onClick={() => setMobileMenuShow(false)}
            className="mobileMenu-overlay bg-glass-shadow w-[100%] h-[100dvh] right-0 top-0 absolute"
          ></div>
        ) : null}
        <div
          className={`mobileMenu flex flex-col md:hidden gap-5 items-stretch h-[100dvh] w-[90%] dark:shadow-r-lean-light bg-white dark:bg-neutral-900 absolute transition-[left] duration-500 top-0 ${
            mobileMenuShow ? "left-0" : "left-[-100%]"
          }`}
        >
          <div className="flex justify-between items-center gap-2 p-4 px-5">
            <Logo></Logo>
            <button
              onClick={() => setMobileMenuShow(false)}
              className={"cursor-pointer text-primary dark:text-secondary"}
              aria-label="Close button"
            >
              <CloseSvg width={25} fill={"currentColor"}></CloseSvg>
            </button>
          </div>
          <nav className="flex p-5">
            <ul className="flex flex-col gap-5 text-size17 text-primary dark:text-secondary">
              <MenuNavbar
                mobileMenuShow={mobileMenuShow}
                setMobileMenuShow={setMobileMenuShow}
              ></MenuNavbar>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
