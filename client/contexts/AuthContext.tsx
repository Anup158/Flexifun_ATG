import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "@/services/api";

export interface AuthUser {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  progressStars?: number;
  soundEnabled?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  userType: "student" | "therapist" | null;
  login: (user: AuthUser, type: "student" | "therapist") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userType, setUserType] = useState<"student" | "therapist" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userType = localStorage.getItem("user_type") as "student" | "therapist" | null;
    const userData = localStorage.getItem("user_data");

    if (token && userData && userType) {
      try {
        setUser(JSON.parse(userData));
        setUserType(userType);
        apiClient.setToken(token);
      } catch (error) {
        console.error("Failed to restore session");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_type");
        localStorage.removeItem("user_data");
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userData: AuthUser, type: "student" | "therapist") => {
    setUser(userData);
    setUserType(type);
    localStorage.setItem("user_type", type);
    localStorage.setItem("user_data", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    apiClient.clearToken();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_data");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        userType,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
