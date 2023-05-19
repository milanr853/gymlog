import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
}

export const weekModalViewSlice = createSlice({
    name: 'weekModal',
    initialState,
    reducers: {
        showWeekModal: (state) => {
            state.show = true
        },
        hideWeekModal: (state) => {
            state.show = false
        },
    },
})

export const { showWeekModal, hideWeekModal, } = weekModalViewSlice.actions

export default weekModalViewSlice.reducer