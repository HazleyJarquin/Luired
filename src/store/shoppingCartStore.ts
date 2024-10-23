import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  total: number;
  iso3Code: string;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useShoppingCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            (item) => item.id === product.id
          );
          if (existingProduct) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      total: (item.quantity + 1) * item.price,
                    }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item.id === id) {
              const newTotal = item.price * quantity;
              return { ...item, quantity, total: newTotal };
            }
            return item;
          }),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shopping-cart",
    }
  )
);
