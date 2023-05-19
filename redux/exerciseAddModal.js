import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
}

export const exerciseAddModalSlice = createSlice({
    name: 'exerciseModal',
    initialState,
    reducers: {
        showExerciseModal: (state) => {
            state.show = true
        },
        hideExerciseModal: (state) => {
            state.show = false
        },
    },
})

export const { showExerciseModal, hideExerciseModal, } = exerciseAddModalSlice.actions

export default exerciseAddModalSlice.reducer