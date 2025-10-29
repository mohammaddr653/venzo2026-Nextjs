import { create } from "zustand";

const useDarkStore = create<any>((set) => ({
  darkmode: null,
  setDarkmode: (newVal: boolean) => set({ darkmode: newVal }),
}));
export default useDarkStore;
