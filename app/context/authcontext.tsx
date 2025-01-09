"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserData } from "@/lib/types";

interface AuthContextType {
  role: "admin" | "user" | null;
  setRole: (role: "admin" | "user" | null) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const logout = () => {
    setRole(null);
    setUserData(null);
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("userData"); // Clear stored user data
  };

  return (
    <AuthContext.Provider
      value={{ role, setRole, userData, setUserData, logout }}
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
