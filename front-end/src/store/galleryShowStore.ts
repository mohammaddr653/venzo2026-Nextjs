//this state is for show or hide single product gallery
import { create } from "zustand";

const useGalleryShowStore = create<any>((set) => ({
  galleryShow: false,
  setGalleryShow: (newVal: boolean) => set({ galleryShow: newVal }),
}));
export default useGalleryShowStore;
