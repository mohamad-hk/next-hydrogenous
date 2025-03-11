"use client";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const response = await fetch("/api/Auth/GetCookieInfo");
        const data = await response.json();

        if (data?.aTData) {
          setUser(data.aTData);
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    getAuthToken();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
