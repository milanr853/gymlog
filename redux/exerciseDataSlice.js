import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    exerciseData: null
}

export const exerciseDataModalSlice = createSlice({
    name: 'exerciseData',
    initialState,
    reducers: {
        showExerciseDataModal: (state) => {
            state.show = true
        },
        hideExerciseDataModal: (state) => {
            state.show = false
        },
        takeExerciseMinimalData: (state, { payload }) => {
            state.exerciseData = payload
        },
    },
})

export const { showExerciseDataModal, hideExerciseDataModal, takeExerciseMinimalData } = exerciseDataModalSlice.actions

export default exerciseDataModalSlice.reducer