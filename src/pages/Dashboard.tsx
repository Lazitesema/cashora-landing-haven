
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <Button onClick={signOut} variant="outline">
            Sign out
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {profile?.first_name}!</h2>
          <p className="text-gray-600">This is your personal dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
