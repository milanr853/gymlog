import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    exerciseMinimalData: null
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
            state.exerciseMinimalData = payload
        },
    },
})

export const { showExerciseDataModal, hideExerciseDataModal, takeExerciseMinimalData } = exerciseDataModalSlice.actions

export default exerciseDataModalSlice.reducer