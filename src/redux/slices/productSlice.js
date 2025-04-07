import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

// async thunk to fetch products from API
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
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
        toast.error("Error fetching products");
      });
  },
});

export default productSlice.reducer;






