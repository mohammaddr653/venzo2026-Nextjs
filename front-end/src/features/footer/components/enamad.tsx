"use client";

import { useEffect, useRef } from "react";

const Enamad = () => {
  const enamadRef = useRef<any>(null);
  useEffect(() => {
    if (enamadRef.current)
      enamadRef.current.innerHTML =
        "<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=637164&Code=lFz2DUX2u7FhVLapl13rj27UNSbxZeQQ'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=637164&Code=lFz2DUX2u7FhVLapl13rj27UNSbxZeQQ' alt='' style='cursor:pointer' code='lFz2DUX2u7FhVLapl13rj27UNSbxZeQQ'></a>";
  }, []);

  return (
    <div
      ref={enamadRef}
      className="aspect-[14/16] border border-neutral-200 rounded-xl"
    >
      {/* dynamic */}
    </div>
  );
};

export default Enamad;
