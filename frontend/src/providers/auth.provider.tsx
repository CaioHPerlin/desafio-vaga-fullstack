import { AuthContext } from "@/contexts/auth.context";
import { api } from "@/lib/axios";
import { handleApiError } from "@/lib/utils";
import type { AuthUser } from "@/types/auth.types";
import { useEffect, useState, type ReactNode } from "react";

const ERROR_MESSAGES: Record<number, string> = {
  401: "Credenciais inválidas.",
  409: "Já existe um usuário cadastrado com esse e-mail.",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          // Verify token validity by fetching profile
          const profile = await getProfile();
          setUser(profile);
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Fetch and set user profile after login
      const profile = await getProfile();
      setUser(profile);
    } catch (error) {
      localStorage.removeItem("accessToken");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);

      handleApiError(error, ERROR_MESSAGES);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await api.post("/auth/register", { email, password });
    } catch (error) {
      handleApiError(error, ERROR_MESSAGES);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const getProfile = async (): Promise<AuthUser> => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    getProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
