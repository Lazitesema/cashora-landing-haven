
import { useState } from "react";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SendingRequest } from "@/types/requests";
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

const SendingRequests = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<SendingRequest | null>(
    null
  );
  const [rejectionReason, setRejectionReason] = useState("");

  const { data: requests, refetch } = useQuery({
    queryKey: ["sending-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sending_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as SendingRequest[];
    },
  });

  const handleApprove = async (request: SendingRequest) => {
    try {
      const { error } = await supabase
        .from("sending_requests")
        .update({
          status: "approved",
        })
        .eq("id", request.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sending request approved successfully",
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

  const handleReject = async (request: SendingRequest) => {
    try {
      const { error } = await supabase
        .from("sending_requests")
        .update({
          status: "rejected",
          rejection_reason: rejectionReason,
        })
        .eq("id", request.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sending request rejected successfully",
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
        <h2 className="text-2xl font-bold">Sending Requests</h2>

        <Table>
          <TableCaption>A list of sending requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>From User</TableHead>
              <TableHead>To User</TableHead>
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
                <TableCell>{request.recipient_id}</TableCell>
                <TableCell>${request.amount}</TableCell>
                <TableCell>{request.status}</TableCell>
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
              <DialogTitle>Reject Sending Request</DialogTitle>
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

export default SendingRequests;
