// authcontext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserData } from "@/lib/types";

interface AuthContextType {
  role: "admin" | "user" | null;
  setRole: (role: "admin" | "user" | null) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData) as UserData;
          setUserData(parsedData);
          setRole(parsedData.Role.toLowerCase() as "admin" | "user");
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("userData");
          router.push("/");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Route protection with dynamic routes
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/"];
      const adminRoutes = [
        "/dashboard",
        "/seminars",
        "/rooms",
        "/seminarregistration",
      ];
      const userRoutes = [
        "/register",
        "/my-registrations",
        "/account",
        // Add pattern for dynamic route
      ];

      // Function to check if current path matches any allowed patterns
      const isAllowedPath = (path: string, allowedRoutes: string[]) => {
        // Check exact matches first
        if (allowedRoutes.includes(path)) return true;

        // Check dynamic routes
        if (path.startsWith("/seminar-registration/")) {
          // This will match any path that starts with /seminar-registration/ followed by any characters
          return true;
        }

        return false;
      };

      if (!publicRoutes.includes(pathname)) {
        if (!role) {
          router.push("/");
        } else if (role === "admin" && !isAllowedPath(pathname, adminRoutes)) {
          router.push("/dashboard");
        } else if (role === "user" && !isAllowedPath(pathname, userRoutes)) {
          router.push("/register");
        }
      }
    }
  }, [role, pathname, isLoading, router]);

  const logout = () => {
    setRole(null);
    setUserData(null);
    localStorage.removeItem("userData");
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ role, setRole, userData, setUserData, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
