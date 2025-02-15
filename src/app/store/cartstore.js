import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const exist_index = state.cart.findIndex(
            (item) => item.id === product.id
          );
          if (exist_index !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[exist_index] = {
              ...updatedCart[exist_index],
              quantity: updatedCart[exist_index].quantity + 1,
            };
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        }),

      remove: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      inc_quantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      dec_quantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
