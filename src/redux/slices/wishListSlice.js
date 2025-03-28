import { createSlice } from "@reduxjs/toolkit";

// function to load wishList data from localStorage
const wishListfromLocalStorage = () => {
    const wishList = localStorage.getItem("wishList");
    return wishList ? JSON.parse(wishList) : [];
};

// wishList slice
const wishListSlice = createSlice({
    name: "wishList",
    initialState: wishListfromLocalStorage(),
    reducers: {
        addTowishList: (state, action) => {
            const item = state.find((product) => product.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 })
            }
            localStorage.setItem("wishList", JSON.stringify(state));
        },
        removeFromWishList: (state, action) => {
            const newState = state.filter((item) => item.id !== action.payload);
            localStorage.setItem("wishList", JSON.stringify(newState));
            return newState;
        },
        clearWishList: (state) => {
            localStorage.removeItem("wishList");
        }
    }
})

export const { addTowishList, removeFromWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;