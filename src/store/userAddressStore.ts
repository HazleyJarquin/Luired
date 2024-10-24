import { create } from "zustand";

interface UserAddress {
  address: string;
  setAdress: (address: string) => void;
}

export const useUserAddressStore = create<UserAddress>((set) => ({
  address: "",
  setAdress: (address) => set({ address }),
}));
