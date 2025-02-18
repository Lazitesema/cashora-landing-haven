
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  role: "admin" | "user";
  status: "pending" | "approved" | "rejected";
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  async function getProfile(userId: string) {
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

      setProfile(data);
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          const profile = await getProfile(session.user.id);
          if (profile?.status === "pending" || profile?.status === "rejected") {
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            navigate("/signin");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const profile = await getProfile(session.user.id);
        if (profile?.status === "pending" || profile?.status === "rejected") {
          await supabase.auth.signOut();
          setUser(null);
          setProfile(null);
          navigate("/signin");
          return;
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profile = await getProfile(data.user.id);

      if (!profile) {
        throw new Error("Profile not found");
      }

      if (profile.status === "pending") {
        await supabase.auth.signOut();
        throw new Error("Your account is pending approval");
      }

      if (profile.status === "rejected") {
        await supabase.auth.signOut();
        throw new Error("Your account has been rejected");
      }

      // Redirect based on role
      if (profile.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const signUp = async (data: any) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
            dateOfBirth: data.dateOfBirth,
            placeOfBirth: data.placeOfBirth,
            residence: data.residence,
            nationality: data.nationality,
          },
        },
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Registration successful!",
        description:
          "Your account has been created and is pending admin approval.",
      });

      navigate("/signin");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/signin");
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
