import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../types/ProductProps";

const initialState: ProductProps[] = [];

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductProps[]>) => {
            return action.payload;
        },
        removeProduct: (state) => {
            return state = initialState;
        }
    }
})

export const { setProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;