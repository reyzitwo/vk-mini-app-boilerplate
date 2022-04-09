import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./js/reducers/mainReducer";

export const store = configureStore({
    reducer: {
        main: mainReducer,
    },
});