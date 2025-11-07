import { create } from "zustand";

const useMobileFiltersStore = create<any>((set) => ({
  mobileFiltersShow: false,
  setMobileFiltersShow: (newVal: boolean) => set({ mobileFiltersShow: newVal }),
}));

export default useMobileFiltersStore;
