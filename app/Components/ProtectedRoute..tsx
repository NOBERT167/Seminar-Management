"use client";

import { useAuth } from "../context/authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: ("admin" | "user")[];
}) => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!role || !allowedRoles.includes(role)) {
      // Redirect to home or login if the user is not authorized
      router.push("/");
    }
  }, [role, allowedRoles, router]);

  // If the role is authorized, render the children
  if (role && allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  // Optionally, show a loading spinner while redirecting
  return <p>Loading...</p>;
};

export default ProtectedRoute;
