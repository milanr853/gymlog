import { configureStore } from "@reduxjs/toolkit";
import weekModalViewReducer from "./weekModalViewSlice"

const store = configureStore({
    reducer: {
        weekModalViewReducer,
    }
})

export default store