
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    // Return a loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to the auth page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
