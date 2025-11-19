"use client";

import { useMobileMenuStore } from "@/store";
import CloseSvg from "../../../components/icons/close-svg";

const CloseMenuButton = () => {
  const { setMobileMenuShow } = useMobileMenuStore();

  return (
    <button
      onClick={() => setMobileMenuShow(false)}
      className={"cursor-pointer text-primary dark:text-secondary"}
      aria-label="Close button"
    >
      <CloseSvg width={25} fill={"currentColor"}></CloseSvg>
    </button>
  );
};

export default CloseMenuButton;
