"use client";
import { create } from "zustand";
import useCartStore from "./cartstore";


const useCouponStore = create((set) => ({
  couponDiscount: 0,

  applyCoupon: (discount) => {
    set({ couponDiscount: discount });
    useCartStore.getState().updateTotals();
  },

  clearCoupon: () => {
    set({ couponDiscount: 0 });
    useCartStore.getState().updateTotals();
  },
}));

export default useCouponStore;
