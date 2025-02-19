
import { AdminLayout } from "@/components/layouts/AdminLayout";

const Admin = () => {
  return (
    <AdminLayout>
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Users</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Pending Requests</h3>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Deposits</h3>
            </div>
            <div className="text-2xl font-bold">$0</div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Withdrawals</h3>
            </div>
            <div className="text-2xl font-bold">$0</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
