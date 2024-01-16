import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CurrentUserState {
    id: number;
    nickname: string;
}

const initialState = {
    id: 0,
    nickname: "",
} as CurrentUserState

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<CurrentUserState>) => {
            state.id = action.payload.id;
            state.nickname = action.payload.nickname;
        },
        removeCurrentUser: (state) => {
            state.id = 0;
            state.nickname = "";
        },
        updateCurrentUserNickname: (state, action: PayloadAction<Partial<CurrentUserState>>) => {
            Object.assign(state, action.payload);
        }
    }
})

export const { setCurrentUser, removeCurrentUser, updateCurrentUserNickname } = currentUserSlice.actions;

export default currentUserSlice.reducer;