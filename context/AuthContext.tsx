"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import api, { setAccessToken } from "@/lib/api";
import type {
  User,
  LoginCredentials,
  RegisterData,
} from "@/types";

// --- Context Types ---

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // On mount, perform a silent refresh to retrieve an access token
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Call the secure refresh endpoint to trade HttpOnly cookie for an accessToken
        const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
        if (!refreshRes.ok) throw new Error("No active session found");

        const refreshData = await refreshRes.json();
        const token = refreshData.accessToken;

        // 2. Set token in client-side memory (module variable closure)
        setAccessToken(token);

        // 3. Fetch user profile using the new accessToken via the secure GET /api/me endpoint
        const meRes = await fetch("/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!meRes.ok) throw new Error("Failed to load user profile");

        const meData = await meRes.json();
        setUser(meData.user);
      } catch {
        // Reset states if no refresh token is present or is expired
        setAccessToken("");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login using the Next.js API server-side proxy
   */
  const login = async (credentials: LoginCredentials) => {
    // Call the server-side API proxy (which forwards credentials to DummyJSON)
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }

    const authData = await response.json();

    // Store access token in secure in-memory module variable
    setAccessToken(authData.accessToken);

    // Store public user details in React Context state
    setUser(authData.user);

    router.push("/products");
  };

  /**
   * Register a new user
   * DummyJSON simulates registration, then we auto-login
   */
  const register = async (data: RegisterData) => {
    // 1. Post registration details to DummyJSON (this returns a simulated registered user profile)
    const response = await api.post("/users/add", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Registration failed");
    }

    // 2. Automatically log in using credentials to trigger set HttpOnly cookies
    await login({
      username: data.username,
      password: data.password,
    });
  };

  /** 
   * Logout - clear cookies via server-side DELETE, reset memory and React states
   */
  const logout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
    } catch {
      // Proceed with local logout cleanup even if cookie clearing fails
    }
    
    // Clear access token from in-memory module closure
    setAccessToken("");

    // Clear React user state
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// --- Hook ---

/** Use the auth context in any client component */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
