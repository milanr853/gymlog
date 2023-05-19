import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stack: []
}

export const exerciseStackSlice = createSlice({
    name: 'exerciseStack',
    initialState,
    reducers: {
        addExerciseToStack: (state, { payload }) => {
            // payload: { title: Event, exercises: [...exerciseNames] }
            state.stack.length && state.stack.find(obj => obj.title === payload.title) ? state.stack.map(obj => {
                if (obj?.title === payload?.title) {
                    const val = obj?.exercises?.find(exercise => exercise === payload.exercise)
                    if (val) return obj
                    obj.exercises.push(payload.exercise)
                }
                return obj
            }) : state.stack.push({ title: payload.title, exercises: [payload.exercise] })
        },
        removeExerciseFromStack: (state, { payload }) => {
            // payload: title || Event name
            state.stack = state.stack.filter(ex_event => {
                if (ex_event.title !== payload) return ex_event
            })
        },
    },
})

export const { addExerciseToStack, removeExerciseFromStack, } = exerciseStackSlice.actions

export default exerciseStackSlice.reducer