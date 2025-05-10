// components/auth-wrapper.tsx
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router";

interface AuthWrapperProps {
  type: "private" | "public";
  redirectTo: string;
}

export function AuthWrapper({ type, redirectTo }: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("AuthWrapper - isAuthenticated:", isAuthenticated);
  console.log("AuthWrapper - isLoading:", isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (type === "private" && !isAuthenticated) {
    console.log("Redirecting to:", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  if (type === "public" && isAuthenticated) {
    console.log("Redirecting to:", redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
