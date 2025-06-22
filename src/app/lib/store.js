import { create } from "zustand";

export const useRoot = create((set) => ({
  cart: [],
  setCart: (cart) => set(() => ({ cart })),
  getCart: () => this.cart,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state?.cart?.find(el => el.id === item.id);
      if (existingItem) {
        return {
          cart: state?.cart?.map(el =>
            el.id === item.id ? {...el, count: item.count} : el
          )
        };
      }
      return { cart: [...(state?.cart || []), item] };
    }),
  cleanCart: () => set(state => ({ cart: [] })),
  removeFromCart: (item) =>
    set((state) => {
      const existingItem = state?.cart?.find(el => el.id === item.id);
      if (existingItem && item.count > 0) {
        return {
          cart: state.cart.map(el =>
            el.id === item.id ? {...el, count: item.count} : el
          )
        };
      }
      return { cart: state.cart.filter(el => el.id !== item.id) };
    }),
    deleteFromCart: (item) => set((state) => ({
      cart: state.cart.filter(el => el.id !== item.id)
    }))
}));