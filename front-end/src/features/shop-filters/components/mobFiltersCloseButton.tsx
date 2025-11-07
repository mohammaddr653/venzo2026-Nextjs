"use client";
import { useMobileFiltersStore } from "@/store";
import CloseSvg from "../../../components/icons/close-svg";

const MobFiltersCloseButton = () => {
  const { setMobileFiltersShow } = useMobileFiltersStore();
  return (
    <button
      className="p-2 text-center w-fit cursor-pointer"
      onClick={() => setMobileFiltersShow(false)}
    >
      <CloseSvg width={30} fill={"#333"}></CloseSvg>
    </button>
  );
};

export default MobFiltersCloseButton;
