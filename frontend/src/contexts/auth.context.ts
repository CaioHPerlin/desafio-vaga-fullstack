// contexts/AuthContext.tsx
import type { AuthUser } from "@/types/auth.types";
import { createContext } from "react";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<AuthUser>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
