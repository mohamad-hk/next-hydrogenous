"use client";
import { createContext, useContext, useState } from "react";

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
  const [shipmentId, setShipmentId] = useState(null);

  return (
    <ShipmentContext.Provider value={{ shipmentId, setShipmentId }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => useContext(ShipmentContext);
