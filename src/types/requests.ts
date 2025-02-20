
export interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  transaction_details?: {
    bank_name?: string;
    account_number?: string;
    swift_code?: string;
    reference?: string;
  };
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface DepositRequest {
  id: string;
  user_id: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  proof_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SendingRequest {
  id: string;
  user_id: string;
  recipient_id: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}
