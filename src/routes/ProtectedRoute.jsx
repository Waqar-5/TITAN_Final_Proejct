// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FullPageSpinner } from "../components/ui/Spinner";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <FullPageSpinner />;

  if (!isAuthenticated) {
    const loginPath = allowedRoles?.includes("teacher")
      ? "/teacher/login"
      : allowedRoles?.includes("admin")
      ? "/admin/login"
      : "/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
