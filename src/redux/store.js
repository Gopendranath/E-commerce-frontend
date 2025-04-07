import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import wishListReducer from "./slices/wishListSlice";


const store = configureStore({
  // Reducers to be used
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    auth: authReducer
  },
});

export default store;









