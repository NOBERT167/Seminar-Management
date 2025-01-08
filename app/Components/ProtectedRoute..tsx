"use client";

import { useAuth } from "../context/authcontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DNA } from "react-loader-spinner";

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

  return (
    <div className="flex min-h-screen justify-center items-center">
      <DNA
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default ProtectedRoute;
