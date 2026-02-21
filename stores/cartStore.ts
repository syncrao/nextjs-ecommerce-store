"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

type CartState = {
  cart: CartItem[];

  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exist = state.cart.find((p) => p.id === item.id);

          if (exist) {
            return {
              cart: state.cart.map((p) =>
                p.id === item.id ? { ...p, qty: p.qty + 1 } : p,
              ),
            };
          }

          return { cart: [...state.cart, { ...item, qty: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item,
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, qty: item.qty - 1 } : item,
            )
            .filter((item) => item.qty > 0),
        })),

      clearCart: () => set({ cart: [] }),

      totalPrice: () =>
        get().cart.reduce((total, item) => total + item.price * item.qty, 0),
    }),
    { name: "cart-storage" },
  ),
);
