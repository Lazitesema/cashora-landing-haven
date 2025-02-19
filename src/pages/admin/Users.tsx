
import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { UsersTable } from "@/components/users/UsersTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserDetails } from "@/types/user";

const Users = () => {
  const [isAddingUser, setIsAddingUser] = useState(false);

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, limits:user_limits(*)");

      if (error) throw error;

      return data as UserDetails[];
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">User Management</h2>
          <Button onClick={() => setIsAddingUser(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <UsersTable
          users={users || []}
          isLoading={isLoading}
          onUserUpdate={() => refetch()}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
