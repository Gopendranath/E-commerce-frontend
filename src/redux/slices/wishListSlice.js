import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

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
        // wishList actions 
        toggleWishList: (state, action) => {
            const itemIndex = state.findIndex((product) => product.id === action.payload.id);
            if (itemIndex !== -1) {
                state.splice(itemIndex, 1);
                toast.error(`${action.payload.title.split(" ").slice(0, 2).join(" ")} removed from wishList`);
            } else {
                state.push({ ...action.payload });
                toast.success(`${action.payload.title.split(" ").slice(0, 2).join(" ")} added to wishList`);
            }
            localStorage.setItem("wishList", JSON.stringify(state));
        },
        // wishList actions
        clearWishList: () => {
            localStorage.removeItem("wishList");
            return [];
        },
        // wishList actions
        removeOne: (state, action) => {
            const itemIndex = state.findIndex((product) => product.id === action.payload.id);
            if (itemIndex !== -1) {
                state.splice(itemIndex, 1);
                toast.error(`removed from wishList`);
            }
            localStorage.setItem("wishList", JSON.stringify(state));
        },
    }
});

export const { toggleWishList, clearWishList, removeOne } = wishListSlice.actions;
export default wishListSlice.reducer;
