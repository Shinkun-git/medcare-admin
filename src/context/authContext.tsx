"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  // Initial auth check (Runs on first load)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3003/api/v1/auth/check-token", {
          credentials: "include",
        });

        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        setAuthenticated(false);
      } finally {
        setLoading(false); // ✅ Ensure loading is set to false after check
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
