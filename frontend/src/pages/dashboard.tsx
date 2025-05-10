import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      Dashboard {user!.email} <Button onClick={logout}>logout</Button>
    </div>
  );
}
