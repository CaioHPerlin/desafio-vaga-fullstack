import { BrowserRouter, Route, Routes } from "react-router";
import Login from "@/pages/login";
import { ThemeProvider } from "@/providers/theme.provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeToggle />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
