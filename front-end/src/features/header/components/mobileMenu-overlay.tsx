"use client";

import { useMobileMenuStore } from "@/store";

const MobileMenuOverlay = () => {
  const { setMobileMenuShow } = useMobileMenuStore();

  return (
    <div
      onClick={() => setMobileMenuShow(false)}
      className="mobileMenu-overlay hidden mobmenu-open:block bg-glass-shadow w-[100%] h-[100dvh] right-0 top-0 absolute"
    ></div>
  );
};

export default MobileMenuOverlay;
