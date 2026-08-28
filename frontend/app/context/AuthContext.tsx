"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, pass: string, role: string) => void;
  logout: () => void;
  hasRole: (allowedRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_session");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Oturum çözülemedi!", e);
      }
    }
  }, []);

  const login = (username: string, pass: string, role: string) => {
    const base64Credentials = btoa(`${username}:${pass}`);
    localStorage.setItem("auth_credentials", base64Credentials);

    const userInfo = { username, role };
    localStorage.setItem("user_session", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("auth_credentials");
    localStorage.removeItem("user_session");
    setUser(null);
  };

  const hasRole = (allowedRoles: string[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth hook'u bir AuthProvider içinde kullanılmalıdır!");
  }
  return context;
};