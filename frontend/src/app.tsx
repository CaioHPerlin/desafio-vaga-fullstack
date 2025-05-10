import { BrowserRouter, Route, Routes } from "react-router";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import { ThemeProvider } from "@/providers/theme.provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/auth.provider";
import { AuthWrapper } from "@/components/private-wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ThemeToggle />
          <BrowserRouter>
            <Routes>
              <Route element={<AuthWrapper type="public" redirectTo="/" />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route
                element={<AuthWrapper type="private" redirectTo="/login" />}
              >
                <Route path="/" element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
