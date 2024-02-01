import { LoginData } from "@/hooks/auth.hook";
import { create } from "zustand";

interface State {
  user: LoginData | null;
  alerts: boolean;
}

interface Actions {
  setUser: (user: State["user"]) => void;
  setAlerts: (alerts: State["alerts"]) => void;
}

export const useAppState = create<State & Actions>((set) => ({
  user: null,
  alerts: true,
  setUser: (user) => set({ user }),
  setAlerts: (alerts) => set({ alerts }),
}));
