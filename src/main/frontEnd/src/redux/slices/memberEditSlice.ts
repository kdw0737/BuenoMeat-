import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../../types/UserProps";

const initialState = {
    email: "",
    pw: "",
    username: "",
    phone: "",
    nickname: "",
    address: "",
    detailAddress: "",
} as UserProps;

const editUserDataSlice = createSlice({
    name: "editUser",
    initialState,
    reducers: {
        setEditUser: (state, action: PayloadAction<UserProps>) => {
            state.email = action.payload.email;
            state.pw = action.payload.pw;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.phone = action.payload.phone;
            state.address = action.payload.address;
            state.detailAddress = action.payload.detailAddress;
        },
        updateField: (state, action: PayloadAction<Partial<UserProps>>) => {
            Object.assign(state, action.payload);
        }
    }
})

export const { setEditUser, updateField } = editUserDataSlice.actions;

export default editUserDataSlice.reducer;