import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const RoleBasedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  console.log(user);

  if (isLoading) return <p>Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
