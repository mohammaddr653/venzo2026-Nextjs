//this state is for clicked image of single product gallery
import { create } from "zustand";

const useClickedImageStore = create<any>((set) => ({
  clickedImg: null,
  setClickedImg: (newImg: any) => set({ clickedImg: newImg }),
}));
export default useClickedImageStore;
