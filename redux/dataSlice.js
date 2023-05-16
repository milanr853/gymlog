import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        incrementItem: (state, { payload }) => {
            if (state.items.some(obj => obj.id === payload.id)) {
                const item = state.items.find(obj => obj.id === payload.id)
                item.totalCount += 1
                return
            }
            state.items.push(payload)
        },


        decrementItem: (state, { payload }) => {
            const item = state.items.find(obj => obj.id === payload.id)
            item.totalCount -= 1

            if (item.totalCount === 0) {
                // remove the item
                const filteredArr = state.items.filter(obj => {
                    if (obj.id !== payload.id) return obj
                })
                state.items = [...filteredArr]
            }
        },


        removeItem: (state, { payload }) => {
            const filteredArr = state.items.filter(obj => {
                if (obj.id !== payload) return obj
            })
            state.items = [...filteredArr]
        },

        clearList: (state) => {
            state.items = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { incrementItem, decrementItem, removeItem, clearList } = basketSlice.actions

export default basketSlice.reducer