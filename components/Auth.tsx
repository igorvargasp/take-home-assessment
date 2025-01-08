/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface User {
  token: string;
  name: string;
  email: string;
}

export interface AuthContextProps {
  user: User | null;
  signIn: (token: string, name: string, email: string) => void;
  signUp: (token: string, name: string, email: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const signIn = async (token: string, name: string, email: string) => {
    localStorage.setItem("user", JSON.stringify({ token, name, email }));
    setUser(JSON.parse(localStorage.getItem("user") as string) as User);
    router.push("/welcome");
  };

  const signUp = async (token: string, name: string, email: string) => {
    localStorage.setItem("user", JSON.stringify({ token, name, email }));
    setUser(JSON.parse(localStorage.getItem("user") as string) as User);
    router.push("/welcome");
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const hasUser = localStorage.getItem("user");
    if (hasUser) {
      setUser(JSON.parse(localStorage.getItem("user") as string) as User);
      router.replace("/welcome");
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
