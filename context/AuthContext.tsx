"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Define User type
export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin" | "developer";
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    bypassLogin: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Load user from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("luxury_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                localStorage.removeItem("luxury_user");
            }
        }
        setIsLoading(false);
    }, []);

    const setAuthCookie = (token: string) => {
        // Check if we are in a secure context (HTTPS)
        // Note: localhost is considered secure by some browsers, but explicitly checking protocol is safer for dev
        const isSecure = window.location.protocol === "https:";
        document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    };

    const login = (email: string) => {
        // Simulate a real user login
        const newUser: User = {
            id: "u_123",
            name: email.split("@")[0] || "User",
            email: email,
            role: "user",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };
        setUser(newUser);
        localStorage.setItem("luxury_user", JSON.stringify(newUser));
        // Set cookie for middleware
        setAuthCookie("true");
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("luxury_user");
        // Remove cookie
        document.cookie = "auth_token=; path=/; max-age=0";
        router.push("/login");
    };

    const bypassLogin = () => {
        // Developer bypass
        const devUser: User = {
            id: "dev_001",
            name: "Developer",
            email: "dev@luxury.com",
            role: "developer",
        };
        setUser(devUser);
        localStorage.setItem("luxury_user", JSON.stringify(devUser));
        // Set cookie for middleware
        setAuthCookie("true");
        
        // Force a hard navigation to ensure middleware picks up the cookie if router.push is flaky with headers
        // But router.push should work. We'll use router.refresh() after push if needed, but standard push is fine.
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, bypassLogin, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
