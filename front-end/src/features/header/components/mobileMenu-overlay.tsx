"use client";

import ScreenWrapper from "@/components/screen-wrapper";
import { useMobileMenuStore } from "@/store";

const MobileMenuOverlay = () => {
  const { setMobileMenuShow } = useMobileMenuStore();

  return (
    <ScreenWrapper
      className={
        "hidden mobmenu-open:block bg-glass-shadow w-[100%] h-[100dvh] right-0 top-0"
      }
      onClick={() => setMobileMenuShow(false)}
    ></ScreenWrapper>
  );
};

export default MobileMenuOverlay;
