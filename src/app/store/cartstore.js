"use client"
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalBasket: 0,
      totalDiscount: 0,

      updateTotals: () => {
        const newTotal = get().cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const newTotalDiscount = get().cart.reduce(
          (acc, item) => acc + (Number(item.discount) || 0) * item.quantity,
          0
        );
        set({ totalBasket: newTotal, totalDiscount: newTotalDiscount });
      },

      addToCart: (product) =>
        set((state) => {
          const exist_index = state.cart.findIndex(
            (item) => item.id === product.id
          );
          let updated_cart;
          if (exist_index !== -1) {
            updated_cart = [...state.cart];
            updated_cart[exist_index] = {
              ...updated_cart[exist_index],
              quantity: updated_cart[exist_index].quantity + 1,
            };
          } else {
            updated_cart = [...state.cart, { ...product, quantity: 1 }];
          }
          set({ cart: updated_cart });
          get().updateTotals();
          return {};
        }),

      remove: (id) =>
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== id);
          set({ cart: newCart });
          get().updateTotals();
          return {};
        }),

      inc_quantity: (id) =>
        set((state) => {
          const newCart = state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          set({ cart: newCart });
          get().updateTotals();
          return {};
        }),

      dec_quantity: (id) =>
        set((state) => {
          const newCart = state.cart.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          set({ cart: newCart });
          get().updateTotals();
          return {};
        }),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
