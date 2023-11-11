import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"
import axiosClient4 from "../api/axiosCustom";

const initialState = {
    categoryLoading: true, 
    data: null, 
    message: ""
}

export const getAllCategories = createAsyncThunk('getAllCategories', async() => {
    try {
        const response = await axiosClient4.get('/categories')
        return response
      } catch (error) {
        console.log('error: ', error)
        throw error
      }
});

export const categoriesSlice = createSlice({
    name: "categories", 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state, action) => {
            state.categoryLoading = true;
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categoryLoading = false;
            state.data = action.payload.data
            state.message = action.payload.message
        });
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.categoryLoading = true;
            state.message = action.payload.message
        });
    }
})

export default categoriesSlice.reducer;