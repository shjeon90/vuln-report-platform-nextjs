'use client';

import { api } from "@/lib/api";
import { LoginRequest, RegisterRequest, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    register: (data: RegisterRequest) => Promise<void>;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [ user, setUser ] = useState<User | null>(null);
    const [ token, setToken ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }

        setIsLoading(false);
    }, []);

    const register = async (data: RegisterRequest): Promise<void> => {
        const response = await api.register(data);
    };

    const login = async (data: LoginRequest): Promise<void> => {
        const response = await api.login(data);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        setToken(response.accessToken);
        setUser(response.user);
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, token, isLoading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}