import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

// Create an async thunk for login request
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // Send a POST request to login API
    const response = await axios.post("https://reqres.in/api/login", credentials);
    localStorage.setItem("token", response.data.token);
    toast.success("Login successful!");
    return response.data;
  } catch (error) {
    return rejectWithValue("Invalid credentials");
  }
});

// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    // Implement logout reducer to clear token from state and localStorage
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginUser pending state
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      // Handle loginUser fulfilled state and store token
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.error = null;
      })
      // Handle loginUser rejected state and store error message
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;




