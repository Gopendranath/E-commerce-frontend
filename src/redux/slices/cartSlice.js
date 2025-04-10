import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Function to load cart data from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    // Basic validation: Ensure it's an array before returning
    if (cartData) {
      const parsedData = JSON.parse(cartData);
      return Array.isArray(parsedData) ? parsedData : [];
    }
    return [];
  } catch (error) {
    console.error("Could not load cart from localStorage:", error);
    localStorage.removeItem("cart"); // Clear corrupted data
    return [];
  }
};

// Helper to save cart state to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Could not save cart to localStorage:", error);
    toast.error("Could not save cart changes."); // Inform user
  }
};

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    // Add item to cart or increase quantity
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find((product) => product.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(`${existingItem.title.split(" ").slice(0, 2).join(" ")} quantity increased`);
      } else {
        // Immer allows push here
        state.push({ ...newItem, quantity: 1 });
        toast.success(`${newItem.title.split(" ").slice(0, 2).join(" ")} added to cart`);
      }
      // Save the updated state (Immer handles the draft)
      saveCartToLocalStorage(state);
    },

    // Add multiple items (e.g., from wishlist or previous order)
    addMultipleToCart: (state, action) => {
      const itemsToAdd = action.payload; // Expecting an array of items
      if (!Array.isArray(itemsToAdd) || itemsToAdd.length === 0) {
        console.warn("addMultipleToCart called with invalid payload:", itemsToAdd);
        return;
      }

      let addedCount = 0;
      let updatedCount = 0;

      itemsToAdd.forEach((item) => {
        if (!item || typeof item.id === 'undefined') {
          console.warn("Skipping invalid item in addMultipleToCart:", item);
          return; // Skip invalid items within the array
        }
        const existingItem = state.find((product) => product.id === item.id);
        if (existingItem) {
          existingItem.quantity += (item.quantity || 1); // Allow specifying quantity or default to 1
          updatedCount++;
        } else {
          // Ensure quantity is at least 1
          state.push({ ...item, quantity: Math.max(1, item.quantity || 1) });
          addedCount++;
        }
      });

      if (addedCount > 0 || updatedCount > 0) {
          let message = '';
          if (addedCount > 0) message += `${addedCount} new item${addedCount > 1 ? 's' : ''} added`;
          if (updatedCount > 0) message += `${addedCount > 0 ? ' & ' : ''}${updatedCount} item${updatedCount > 1 ? 's' : ''} updated`;
          toast.success(message + ' in cart.');
          saveCartToLocalStorage(state);
      }
    },

    // Remove item completely from cart
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      // Find the item *before* filtering to get its details for the toast
      const itemToRemove = state.find((item) => item.id === itemIdToRemove);

      if (itemToRemove) {
        // Filter returns a new array - this is correct for Immer when returned
        const newState = state.filter((item) => item.id !== itemIdToRemove);
        // Save the *new* state returned by filter
        saveCartToLocalStorage(newState);
        toast.error(`${itemToRemove.title.split(" ").slice(0, 2).join(" ")} removed from cart`);
        // Explicitly return the new state array
        return newState;
      }
    },

    // Increase quantity of an item
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.find((product) => product.id === itemId);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state); // Save updated draft state
        toast.success(`${item.title.split(" ").slice(0, 2).join(" ")} quantity increased`);
      }
    },

    // Decrease quantity of an item (minimum 1)
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.find((product) => product.id === itemId);
      // Only decrease if item exists and quantity is greater than 1
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state); // Save updated draft state
        toast.success(`${item.title.split(" ").slice(0, 2).join(" ")} quantity decreased`);
      }

    },

    // Clear the entire cart
    clearCart: (state) => { // Receive state even if not used, good practice
      saveCartToLocalStorage([]); // Save empty array

      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addMultipleToCart,
} = cartSlice.actions;

export default cartSlice.reducer;