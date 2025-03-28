import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk to fetch products from API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  // Send GET request to API and return response data
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts pending state
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      // Handle fetchProducts fulfilled state and store fetched products
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      // Handle fetchProducts rejected state
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;






