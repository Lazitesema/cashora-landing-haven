
import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { WithdrawalRequest } from "@/types/requests";
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

const WithdrawalRequests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(
    null
  );
  const [transactionDetails, setTransactionDetails] = useState({
    bank_name: "",
    account_number: "",
    swift_code: "",
    reference: "",
  });
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: requests, refetch } = useQuery({
    queryKey: ["withdrawal-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("withdrawal_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as WithdrawalRequest[];
    },
  });

  const handleApprove = async (request: WithdrawalRequest) => {
    try {
      const { error } = await supabase
        .from("withdrawal_requests")
        .update({
          status: "approved",
          transaction_details: transactionDetails,
        })
        .eq("id", request.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Withdrawal request approved successfully",
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

  const handleReject = async (request: WithdrawalRequest) => {
    try {
      const { error } = await supabase
        .from("withdrawal_requests")
        .update({
          status: "rejected",
          rejection_reason: rejectionReason,
        })
        .eq("id", request.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Withdrawal request rejected successfully",
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
        <h2 className="text-2xl font-bold">Withdrawal Requests</h2>

        <Table>
          <TableCaption>A list of withdrawal requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell className="text-right space-x-2">
                  {request.status === "pending" && (
                    <>
                      <Button
                        onClick={() => setSelectedRequest(request)}
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
              <DialogTitle>
                {selectedRequest?.status === "pending"
                  ? "Approve Withdrawal Request"
                  : "Reject Withdrawal Request"}
              </DialogTitle>
            </DialogHeader>

            {selectedRequest?.status === "pending" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input
                    id="bank_name"
                    value={transactionDetails.bank_name}
                    onChange={(e) =>
                      setTransactionDetails({
                        ...transactionDetails,
                        bank_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input
                    id="account_number"
                    value={transactionDetails.account_number}
                    onChange={(e) =>
                      setTransactionDetails({
                        ...transactionDetails,
                        account_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="swift_code">SWIFT Code</Label>
                  <Input
                    id="swift_code"
                    value={transactionDetails.swift_code}
                    onChange={(e) =>
                      setTransactionDetails({
                        ...transactionDetails,
                        swift_code: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={transactionDetails.reference}
                    onChange={(e) =>
                      setTransactionDetails({
                        ...transactionDetails,
                        reference: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {selectedRequest?.status === "rejected" && (
              <div className="space-y-2">
                <Label htmlFor="rejection_reason">Rejection Reason</Label>
                <Input
                  id="rejection_reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>
            )}

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </Button>
              {selectedRequest?.status === "pending" ? (
                <Button onClick={() => handleApprove(selectedRequest)}>
                  Approve
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={() => handleReject(selectedRequest!)}
                >
                  Reject
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default WithdrawalRequests;
