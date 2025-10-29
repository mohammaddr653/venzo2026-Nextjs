import { create } from "zustand";

const useWidthStore = create<any>((set) => ({
  width: null,
  setWidth: (newWidth: number) => set({ width: newWidth }),
}));
export default useWidthStore;
