
import { UserProfile } from "./auth";

export interface UserLimit {
  id: string;
  user_id: string;
  limit_type: "withdrawal" | "sending";
  period: "daily" | "weekly" | "monthly";
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface UserDetails extends UserProfile {
  balance: number;
  withdrawal_fee_type: "percentage" | "fixed";
  withdrawal_fee_value: number;
  sending_fee_type: "percentage" | "fixed";
  sending_fee_value: number;
  limits?: UserLimit[];
}
