import { create } from "zustand";

const useMobileMenuStore = create<any>((set) => ({
  mobileMenuShow: false,
  setMobileMenuShow: (newVal: boolean) => set({ mobileMenuShow: newVal }),
}));

export default useMobileMenuStore;
