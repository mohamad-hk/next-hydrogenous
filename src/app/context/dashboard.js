"use client";

import { createContext, useContext, useState } from "react";

const Dashboard = createContext();

export function DashboardContext({ children }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Dashboard.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </Dashboard.Provider>
  );
}
export function useDashboard() {
  return useContext(Dashboard);
}
