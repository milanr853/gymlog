import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./dataSlice"

const store = configureStore({
    reducer: {
        basket: basketReducer,
    }
})

export default store