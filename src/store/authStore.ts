import { create } from "zustand";
import type { UserRole } from "@/types/auth.types";

interface AuthState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  loginAsStudent: () => void;
  switchToAdmin: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: "guest",

  setRole: (role) => set({ role }),
  loginAsStudent: () => set({ role: "student" }),
  switchToAdmin: () => set({ role: "admin" }),
  logout: () => set({ role: "guest" }),
}));
