import { createSlice } from "@reduxjs/toolkit";

// Function to load wishList data from localStorage
const wishListFromLocalStorage = () => {
    const wishList = localStorage.getItem("wishList");
    return wishList ? JSON.parse(wishList) : [];
};

// wishList slice
const wishListSlice = createSlice({
    name: "wishList",
    initialState: wishListFromLocalStorage(),
    reducers: {
        toggleWishList: (state, action) => {
            const itemIndex = state.findIndex((product) => product.id === action.payload.id);
            if (itemIndex !== -1) {
                state.splice(itemIndex, 1);
            } else {
                state.push({ ...action.payload });
            }
            localStorage.setItem("wishList", JSON.stringify(state));
        },
        clearWishList: () => {
            localStorage.removeItem("wishList");
            return [];
        },
        removeOne: (state, action) => {
            const itemIndex = state.findIndex((product) => product.id === action.payload.id);
            if (itemIndex !== -1) {
                state.splice(itemIndex, 1);
            }
            localStorage.setItem("wishList", JSON.stringify(state));
        },
    }
});

export const { toggleWishList, clearWishList, removeOne } = wishListSlice.actions;
export default wishListSlice.reducer;
