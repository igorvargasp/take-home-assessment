"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface User {
  token: string;
  name: string;
  email: string;
}

export interface AuthContextProps {
  user: User | null;
  signIn: (name: string, email: string) => void;
  signUp: (token: string, name: string, email: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const signIn = async (token: string, email: string) => {
    const userData = { token, email, name: "" };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    router.push("/welcome");
  };

  const signUp = async (token: string, name: string, email: string) => {
    const userData = { token, name, email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    router.push("/welcome");
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        router.replace("/welcome");
      } else {
        if (pathname === "/welcome") {
          router.replace("/");
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isInitialized) {
    return null;
  }

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
