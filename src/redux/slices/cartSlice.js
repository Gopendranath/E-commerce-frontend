import { createSlice } from "@reduxjs/toolkit";

// function to load cart data from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const cartSlice = createSlice({
  name: "cart",
  // Initialize state with cart data from localStorage
  initialState: loadCartFromLocalStorage(),
  reducers: {
    // addToCart reducer to add items to cart and update localStorage
    addToCart: (state, action) => {
      const item = state.find((product) => product.id === action.payload.id);
      if(item) {
        item.quantity += 1;
      } else {
        state.push({...action.payload, quantity: 1})
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

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
    },
    
    // removeFromCart reducer to remove items from cart and update localStorage
    removeFromCart: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    
    // increaseQuantity reducer to increase item quantity and update localStorage
    increaseQuantity: (state, action) => {
      const item = state.find((product) => product.id === action.payload);
      if(item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    
    // decreaseQuantity reducer to decrease item quantity and update localStorage
    decreaseQuantity: (state, action) => {
      const item = state.find((product) => product.id === action.payload);
      if(item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    
    // clearCart reducer to remove all items from cart and clear localStorage
    clearCart: (state) => {
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

