"use client";
import React, { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const response = await fetch("/api/Auth/GetCookieInfo", {
          credentials: "include",
        });
        const data = await response.json();

        if (data?.aTData) {
          setUser(data.aTData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
        setUser(null);
      }
    };

    getAuthToken();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
