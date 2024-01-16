import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import editUserReducer from "./slices/memberEditSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    editUser: editUserReducer,
    product: productReducer,
    cart: cartReducer
});

export default rootReducer;
