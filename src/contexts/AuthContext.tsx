"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Role = null | "member" | "gym_admin";

export interface MockUser {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  linkedGymId: string | null;
}

export interface MockGym {
  id: string;
  name: string;
  slug: string;
}

interface AuthContextValue {
  role: Role;
  user: MockUser | null;
  gym: MockGym | null;
  login: (role: "member" | "gym_admin") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  role: null,
  user: null,
  gym: null,
  login: () => {},
  logout: () => {},
});

const mockMemberUser: MockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "",
  memberSince: "2024-01-15",
  linkedGymId: "gym1",
};

const mockAdminUser: MockUser = {
  name: "Admin User",
  email: "admin@fitzpremium.de",
  avatar: "",
  memberSince: "2023-06-01",
  linkedGymId: "gym1",
};

const mockAdminGym: MockGym = {
  id: "gym1",
  name: "FitZone Premium",
  slug: "fitzone-premium",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const stored = localStorage.getItem("fittrack_role") as Role;
    if (stored === "member" || stored === "gym_admin") {
      setRole(stored);
    }
  }, []);

  const login = (newRole: "member" | "gym_admin") => {
    localStorage.setItem("fittrack_role", newRole);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("fittrack_role");
    setRole(null);
  };

  const user = role === "member" ? mockMemberUser : role === "gym_admin" ? mockAdminUser : null;
  const gym = role === "gym_admin" ? mockAdminGym : null;

  return (
    <AuthContext.Provider value={{ role, user, gym, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
