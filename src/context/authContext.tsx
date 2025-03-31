"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface User {
  email: string;
  name?:string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticated: (value: boolean, user?: User | null) => void;
  user:User|null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setAuthenticatedState] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const [user, setUser] = useState<User | null>(null);

  const setAuthenticated = (value: boolean, userData: User | null = null) => {
    setAuthenticatedState(value);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setAuthenticated(false, null); // Reset authentication & user
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Initial auth check (Runs on first load)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/v1/check/check-token`, {
          credentials: "include",
        });

        if (res.ok) {
          const userData = await res.json();
          console.log("user data in auth provider ",userData.user);
          setAuthenticated(true,userData.user);
        } else {
          setAuthenticated(false,null);
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        setAuthenticated(false,null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, setAuthenticated,logout }}>
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