import { create } from "zustand";

export const useRoot = create((set) => ({
  cart: [],
  setCart: (cart) => set(() => ({ cart })),
  addToCart: (item) =>
    set((state) => {
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (item) =>
    set((state) => ({ cart: state.cart.filter((el) => el.id !== item.id) })),
}));
