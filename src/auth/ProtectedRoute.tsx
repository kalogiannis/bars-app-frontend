
import  { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  roleRequired?: "user" | "bar_owner" | "admin";
};

const ProtectedRoute = ({ roleRequired }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    const checkToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({ detailedResponse: true });
          console.log("Full token response:", token);
          
          const payload = JSON.parse(atob(token.id_token.split('.')[1]));
          console.log("Decoded token payload:", payload);
          console.log("Role from token:", payload["https://bars-app/role"] );
        } catch (error) {
          console.error("Error getting token:", error);
        }
      }
    };
    
    checkToken();
  }, [isAuthenticated, getAccessTokenSilently]);
  
  console.log("Protected Route - User:", user);
  console.log("Protected Route - Role Required:", roleRequired);
  console.log("Protected Route - User Role:", user?.["https://bars-app/role"] );
  console.log("Protected Route - Is Authenticated:", isAuthenticated);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  if (roleRequired && user && user["https://bars-app/role"] !== roleRequired ) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;




