"use client";

import type {
  AuthContextType,
  LoginCredentials,
  RegisterData,
  User,
  UserPreferences,
} from "@/lib/auth-types";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUser(result.user);
        } else {
          localStorage.removeItem("auth_token");
        }
      } else {
        localStorage.removeItem("auth_token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      if (result.success && result.token && result.user) {
        localStorage.setItem("auth_token", result.token);
        setUser(result.user);
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      if (result.success && result.token && result.user) {
        localStorage.setItem("auth_token", result.token);
        setUser(result.user);
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Profile update failed");
      }

      if (result.success && result.user) {
        setUser(result.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch("/api/auth/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(preferences),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Preferences update failed");
      }

      if (result.success && result.user) {
        setUser(result.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
