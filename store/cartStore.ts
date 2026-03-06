import { create } from "zustand";

interface CartState {
  isOpen: boolean;
  cart: any | null; // Tip: You can replace 'any' with your generated GraphQL Cart type later
  openCart: () => void;
  closeCart: () => void;
  setCart: (cart: any) => void;
  totalQuantity: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  cart: null,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  setCart: (cart) => set({ cart }),
  totalQuantity: () => {
    const cart = get().cart;
    return cart?.totalQuantity || 0;
  },
}));
