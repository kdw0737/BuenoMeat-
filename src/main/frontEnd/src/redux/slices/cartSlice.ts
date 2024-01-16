import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProps } from "../../types/CartProps";

const initialState = {
    itemCount: 0,
    totalPrice: 0,
    itemOption: "",
} as CartProps;

const cartDataSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartData: (state, action:PayloadAction<CartProps>) => {
            state.itemCount = action.payload.itemCount;
            state.totalPrice = action.payload.totalPrice;
            state.itemOption = action.payload.itemOption;
        },
        removeCartData: (state) => {
            return initialState;
        }
    }
})

export const { setCartData, removeCartData } = cartDataSlice.actions;

export default cartDataSlice.reducer;