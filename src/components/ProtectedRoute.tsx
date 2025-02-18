
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requireAdmin && profile?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (profile?.status === "pending") {
    return <Navigate to="/pending" replace />;
  }

  if (profile?.status === "rejected") {
    return <Navigate to="/rejected" replace />;
  }

  return <>{children}</>;
};
