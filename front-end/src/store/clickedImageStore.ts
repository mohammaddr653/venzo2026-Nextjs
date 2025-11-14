//this state is for clicked image of single product gallery
import { create } from "zustand";

const useClickedImageStore = create<any>((set) => ({
  clickedImg: 0,
  setClickedImg: (newImg: number) => set({ clickedImg: newImg }),
}));
export default useClickedImageStore;
