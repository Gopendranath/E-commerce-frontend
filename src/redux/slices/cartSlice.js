import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Function to load cart data from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    // Cart actions
    addToCart: (state, action) => {
      const item = state.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        toast.success(`${item.title.split(" ").slice(0, 2).join(" ")} quantity increased by 1`);
      } else {
        state.push({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.title.split(" ").slice(0, 2).join(" ")} added to cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // Cart actions
    addMultipleToCart: (state, action) => {
      const items = action.payload;
      items.forEach((item) => {
        const existingItem = state.find((product) => product.id === item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.push({ ...item, quantity: 1 });
        }
      });
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success(`${items.length} items added to cart`);
    },
    // Cart actions
    removeFromCart: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      toast.error(`${action.payload.title.split(" ").slice(0, 2).join(" ")} removed from cart`);
      return newState;
    },
    // Cart actions 
    increaseQuantity: (state, action) => {
      const item = state.find((product) => product.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success(`${item.title.split(" ").slice(0, 2).join(" ")} quantity increased by 1`);
    },
    // Cart actions
    decreaseQuantity: (state, action) => {
      const item = state.find((product) => product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        toast.success(`${item.title.split(" ").slice(0, 2).join(" ")} quantity decreased by 1`);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // Cart actions
    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, addMultipleToCart } = cartSlice.actions;
export default cartSlice.reducer;