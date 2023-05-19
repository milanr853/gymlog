import { configureStore } from "@reduxjs/toolkit";
import weekModalViewReducer from "./weekModalViewSlice"
import eventModalViewReducer from "./eventViewModalSlice"

const store = configureStore({
    reducer: {
        weekModalViewReducer,
        eventModalViewReducer,
    }
})

export default store