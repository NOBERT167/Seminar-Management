import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authcontext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ("admin" | "guest")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user.role) {
    router.push("/login"); // Redirect to login if not authenticated
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    router.push("/unauthorized"); // Redirect to unauthorized page if role is invalid
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
