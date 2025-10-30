"use client";

import { useMobileMenuStore } from "@/store";
import MenuSvg from "../../../components/icons/menu-svg";

const MenuButton = () => {
  const { setMobileMenuShow } = useMobileMenuStore();

  return (
    <button
      onClick={() => setMobileMenuShow(true)}
      className={"cursor-pointer md:hidden ms-auto"}
      aria-label="Open menu"
    >
      <MenuSvg width={30} fill={"currentColor"}></MenuSvg>
    </button>
  );
};

export default MenuButton;
