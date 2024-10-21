import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../interfaces";

type UserState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-store",
    }
  )
);
