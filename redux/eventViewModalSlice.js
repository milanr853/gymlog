import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
}

export const eventModalViewSlice = createSlice({
    name: 'eventModal',
    initialState,
    reducers: {
        showEventModal: (state) => {
            state.show = true
        },
        hideEventModal: (state) => {
            state.show = false
        },
    },
})

export const { showEventModal, hideEventModal, } = eventModalViewSlice.actions

export default eventModalViewSlice.reducer