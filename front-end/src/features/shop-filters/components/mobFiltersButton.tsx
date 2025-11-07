"use client";
import { useMobileFiltersStore } from "@/store";

const MobFiltersButton = () => {
  const { mobileFiltersShow, setMobileFiltersShow } = useMobileFiltersStore();
  return (
    <button
      className="flex lg:hidden bg-white border text-amber-900 border-primary rounded-md px-2 py-1 cursor-pointer"
      onClick={() => setMobileFiltersShow(true)}
    >
      فیلتر ها
    </button>
  );
};

export default MobFiltersButton;
