import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    muscleSet: null
}

export const exerciseAddModalSlice = createSlice({
    name: 'exerciseModal',
    initialState,
    reducers: {
        showExerciseModal: (state, { payload }) => {
            state.show = true
            state.muscleSet = payload
        },
        hideExerciseModal: (state) => {
            state.show = false
        },
    },
})

export const { showExerciseModal, hideExerciseModal, } = exerciseAddModalSlice.actions

export default exerciseAddModalSlice.reducer