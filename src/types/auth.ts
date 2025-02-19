
import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  role: "admin" | "user";
  status: "pending" | "approved" | "rejected";
  date_of_birth?: string;
  place_of_birth?: string;
  residence?: string;
  nationality?: string;
  id_card_url?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}
