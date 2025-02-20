
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/auth";

export async function getProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }

    if (!data) return null;

    // Ensure the role is properly typed
    const profile: UserProfile = {
      ...data,
      role: data.role as "admin" | "user",
      status: data.status as "pending" | "approved" | "rejected"
    };

    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
