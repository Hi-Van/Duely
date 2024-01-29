import { LoginData } from "@/hooks/auth.hook";
import { create } from "zustand";

interface State {
  user: LoginData | null;
}

interface Actions {
    setUser: (user: State["user"]) => void;
}

export const useAppState = create<State & Actions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));