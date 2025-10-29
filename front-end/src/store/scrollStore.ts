import { create } from "zustand";

const useScrollStore = create<any>((set) => ({
  isScrolled: false,
  setIsScrolled: (newVal: boolean) => set({ isScrolled: newVal }),
}));
export default useScrollStore;
