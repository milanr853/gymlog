import { configureStore } from "@reduxjs/toolkit";
import weekModalViewReducer from "./weekModalViewSlice"
import eventModalViewReducer from "./eventViewModalSlice"
import exerciseAddModalReducer from "./exerciseAddModal"
import exerciseStackReducer from "./exerciseStackSlice"

const store = configureStore({
    reducer: {
        weekModalViewReducer,
        eventModalViewReducer,
        exerciseAddModalReducer,
        exerciseStackReducer
    }
})

export default store