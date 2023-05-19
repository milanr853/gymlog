import { configureStore } from "@reduxjs/toolkit";
import weekModalViewReducer from "./weekModalViewSlice"
import eventModalViewReducer from "./eventViewModalSlice"
import exerciseAddModalReducer from "./exerciseAddModal"

const store = configureStore({
    reducer: {
        weekModalViewReducer,
        eventModalViewReducer,
        exerciseAddModalReducer
    }
})

export default store