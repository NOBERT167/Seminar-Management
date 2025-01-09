"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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

  // Route protection
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/"];
      const adminRoutes = [
        "/dashboard",
        "/seminars",
        "/rooms",
        "/seminarregistration",
      ];
      const userRoutes = ["/register", "/my-registrations", "/account"];

      if (!publicRoutes.includes(pathname)) {
        if (!role) {
          router.push("/");
        } else if (role === "admin" && !adminRoutes.includes(pathname)) {
          router.push("/dashboard");
        } else if (role === "user" && !userRoutes.includes(pathname)) {
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
