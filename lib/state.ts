import { create } from "zustand";

interface State {
  user: {
    token?: string;
    username: string;
    email?: string;
    password?: string;
  } | null;
}

interface Actions {
    setUser: (user: State["user"]) => void;
}

export const useAppState = create<State & Actions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));