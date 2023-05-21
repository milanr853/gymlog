import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { exerciseDataApi } from '../api/api'

export const fetchExerciseData = createAsyncThunk(
    'exercise/getExerciseData', async (dataObj) => {
        try {
            const data = await exerciseDataApi
            return data
        }
        catch (err) { console.error(err.message) }
    }
)

const initialState = {
    show: false,
    exerciseData: null,
    loading: false
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExerciseData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchExerciseData.fulfilled, (state, action) => {
                state.loading = false
                state.exerciseData = action.payload
            })
            .addCase(fetchExerciseData.rejected, (state) => {
                state.loading = false
                state.exerciseData = null
            })
    }

})

export const { showExerciseDataModal, hideExerciseDataModal } = exerciseDataModalSlice.actions

export default exerciseDataModalSlice.reducer