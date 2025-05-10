import LoginForm from "@/components/login-form";
import { Card } from "@/components/ui/card";

export default function Login() {
  return (
    <main className="h-screen flex items-center p-2 sm:items-start sm:pt-4 justify-center">
      <Card className="w-full max-w-md p-4">
        <h1 className="text-2xl mb-4 text-center">Login</h1>
        <LoginForm />
      </Card>
    </main>
  );
}
