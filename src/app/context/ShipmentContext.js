"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
  const [shipmentId, setShipmentId] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("shipmentId") || null;
    }
    return null;
  });

  useEffect(() => {
    if (shipmentId) {
      localStorage.setItem("shipmentId", shipmentId);
    }
  }, [shipmentId]);

  return (
    <ShipmentContext.Provider value={{ shipmentId, setShipmentId }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => useContext(ShipmentContext);
