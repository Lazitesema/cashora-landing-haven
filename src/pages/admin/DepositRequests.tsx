
import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DepositRequest } from "@/types/requests";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

const DepositRequests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<DepositRequest | null>(
    null
  );
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: requests, refetch } = useQuery({
    queryKey: ["deposit-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deposit_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DepositRequest[];
    },
  });

  const handleApprove = async (request: DepositRequest) => {
    try {
      const { error } = await supabase
        .from("deposit_requests")
        .update({
          status: "approved",
        })
        .eq("id", request.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Deposit request approved successfully",
      });

      setSelectedRequest(null);
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleReject = async (request: DepositRequest) => {
    try {
      const { error } = await supabase
        .from("deposit_requests")
        .update({
          status: "rejected",
          rejection_reason: rejectionReason,
        })
        .eq("id", request.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Deposit request rejected successfully",
      });

      setSelectedRequest(null);
      setRejectionReason("");
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Deposit Requests</h2>

        <Table>
          <TableCaption>A list of deposit requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Proof</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  {formatDistanceToNow(new Date(request.created_at), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>{request.user_id}</TableCell>
                <TableCell>${request.amount}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.proof_url && (
                    <a
                      href={request.proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Proof
                    </a>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {request.status === "pending" && (
                    <>
                      <Button
                        onClick={() => handleApprove(request)}
                        variant="outline"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedRequest(request);
                          setRejectionReason("");
                        }}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={selectedRequest !== null}
          onOpenChange={() => setSelectedRequest(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Deposit Request</DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              <Label htmlFor="rejection_reason">Rejection Reason</Label>
              <Input
                id="rejection_reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReject(selectedRequest!)}
              >
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default DepositRequests;
