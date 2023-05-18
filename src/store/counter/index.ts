import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CounterState } from './types'


const initialState: CounterState = {
    value: 0,
}

const getValue = createAsyncThunk('counterValue', async () => {
    //get data from server
    return Promise.resolve(Math.random())
})

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getValue.fulfilled, (state, { payload }) => {
                state.value = payload
            })
            .addCase(getValue.rejected, (state) => {
                state.value = 0
            })
            
    }
})

// Action creators are generated for each case reducer function
export const { actions: counterActions, reducer: counterReducer } = counterSlice

