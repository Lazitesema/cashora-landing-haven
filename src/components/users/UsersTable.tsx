
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserDetails } from "@/types/user";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function UsersTable({
  users,
  isLoading,
  onUserUpdate,
}: {
  users: UserDetails[];
  isLoading: boolean;
  onUserUpdate: () => void;
}) {
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const { toast } = useToast();

  const handleStatusUpdate = async (userId: string, newStatus: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: newStatus })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User status updated to ${newStatus}`,
      });

      onUserUpdate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-20" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "approved"
                          ? "success"
                          : user.status === "rejected"
                          ? "destructive"
                          : "warning"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${user.balance?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        View
                      </Button>
                      {user.status === "pending" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleStatusUpdate(user.id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleStatusUpdate(user.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and manage user information
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium">Personal Information</h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="text-muted-foreground">Name:</span>{" "}
                      {selectedUser.first_name} {selectedUser.last_name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Username:</span>{" "}
                      {selectedUser.username}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Date of Birth:</span>{" "}
                      {selectedUser.date_of_birth &&
                        format(new Date(selectedUser.date_of_birth), "PP")}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Place of Birth:</span>{" "}
                      {selectedUser.place_of_birth}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Residence:</span>{" "}
                      {selectedUser.residence}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Nationality:</span>{" "}
                      {selectedUser.nationality}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Account Information</h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="text-muted-foreground">Role:</span>{" "}
                      <Badge variant={selectedUser.role === "admin" ? "default" : "secondary"}>
                        {selectedUser.role}
                      </Badge>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Status:</span>{" "}
                      <Badge
                        variant={
                          selectedUser.status === "approved"
                            ? "success"
                            : selectedUser.status === "rejected"
                            ? "destructive"
                            : "warning"
                        }
                      >
                        {selectedUser.status}
                      </Badge>
                    </p>
                    <p>
                      <span className="text-muted-foreground">Balance:</span>{" "}
                      ${selectedUser.balance?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium">ID Card</h3>
                {selectedUser.id_card_url ? (
                  <div className="mt-2">
                    <img
                      src={`${supabase.storage.from("id_cards").getPublicUrl(selectedUser.id_card_url).data.publicUrl}`}
                      alt="ID Card"
                      className="max-w-md rounded-lg border"
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-muted-foreground">No ID card uploaded</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
