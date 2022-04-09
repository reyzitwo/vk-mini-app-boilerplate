import { createSlice } from "@reduxjs/toolkit";

export const mainReducer = createSlice({
    name: "main",
    initialState: {
        platform: "",
        isDesktop: false,
        theme: "light",
        hasHeader: false,
        infoUser: { name: "Загрузка..."}
    },
    reducers: {
        set: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
    },
});

export const { set } = mainReducer.actions;
export default mainReducer.reducer;