"use client";

import { UserType } from "@/types";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
type AuthType = {
  user: UserType | null;
  userLoading: boolean;
  getUser: () => Promise<void> | null;
  logout: () => Promise<void> | null;
};

export const AuthContext = createContext<AuthType>({
  user: null,
  userLoading: true,
  getUser: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const getUser = async () => {
    setUserLoading(true);
    const token = getCookie("token");
    if (!token) {
      setUserLoading(false);
      return;
    }
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUser(data.data as any);
      setUserLoading(false);
    } catch (e) {
      setUserLoading(false);
    }
  };
  const logout = async () => {
    try {
      setUserLoading(true);
      deleteCookie("token");
      setUser(null);
      setUserLoading(false);
    } catch (e) {
      console.log(e);
      setUserLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, userLoading, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
