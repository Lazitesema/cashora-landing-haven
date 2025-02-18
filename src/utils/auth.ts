
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

    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}
