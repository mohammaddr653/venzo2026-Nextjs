import { create } from "zustand";

const useUserStore = create<any>((set) => ({
  user: null,
  setUser: (newUser: any) => set({ user: newUser }),
}));
export default useUserStore;
