import { BrowserRouter, Route, Routes } from "react-router";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import { ThemeProvider } from "@/providers/theme.provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/auth.provider";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeToggle />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
