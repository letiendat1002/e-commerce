import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient4 from "../api/axiosCustom";

const initialState = {
    loading: true,
    data: []
}

export const getUserAddressForIDUser = createAsyncThunk('getUserAddressForIDUser', async(body) => {
    try {
        const response = await axiosClient4.get(`useraddresses?userID=${body}`)
        return response.data
    }
    catch(error) {
        console.log("error: ", error);
        throw error
    }
});

export const addressSlice = createSlice({
    name: "userAddress", 
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder.addCase(getUserAddressForIDUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUserAddressForIDUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(getUserAddressForIDUser.rejected, (state, action) => {
            state.loading = true
        })
    }
})

export default addressSlice.reducer