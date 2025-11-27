"use client";

import { accordionScripts } from "@/helpers/accordionScripts";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const AccordionBootstrap = ({ Uid }: any) => {
  const pathname = usePathname();
  const accordionRef = useRef(false);

  useEffect(() => {
    if (!accordionRef.current) {
      accordionRef.current = true;
      accordionScripts(Uid);
      return () => {
        accordionRef.current = false;
      };
    }
  }, [pathname]);

  return null;
};

export default AccordionBootstrap;
