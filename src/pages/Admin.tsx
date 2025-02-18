
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={signOut} variant="outline">
            Sign out
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, Admin {profile?.first_name}!
          </h2>
          <p className="text-gray-600">
            Here you can manage user approvals and other administrative tasks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
