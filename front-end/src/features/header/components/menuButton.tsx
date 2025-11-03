"use client";

import { useMobileMenuStore } from "@/store";
import MenuSvg from "../../../components/icons/menu-svg";

const MenuButton = () => {
  const { setMobileMenuShow } = useMobileMenuStore();

  return (
    <button
      onClick={() => setMobileMenuShow(true)}
      className={"cursor-pointer h-[60%] my-auto md:hidden ms-auto text-primary"}
      aria-label="Open menu"
    >
      <MenuSvg className="h-full" fill={"currentColor"}></MenuSvg>
    </button>
  );
};

export default MenuButton;
