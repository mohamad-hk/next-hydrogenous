import { create } from "zustand";
import { persist } from "zustand/middleware";

const useShipmentStore = create(
  persist(
    (set) => ({
      shipmentId: null,
      setShipmentId: (id) => set({ shipmentId: id }),
    }),
    {
      name: "shipment-storage",
    }
  )
);

export default useShipmentStore;
