"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: { role: "admin" | "guest" | null };
  login: (role: "admin" | "guest") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ role: "admin" | "guest" | null }>({
    role: null,
  });

  const login = (role: "admin" | "guest") => {
    setUser({ role });
  };

  const logout = () => {
    setUser({ role: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
