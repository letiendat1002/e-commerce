import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient4 from "../api/axiosCustom";

const initialState = {
    data: [], 
    loading: true
}

export const getUserForID = createAsyncThunk('user/getuserID', async (data) => {
    try {
          const response = await axiosClient4.get(`users/${data}`)
          return response.data
      }
      catch(error) {
          console.log("error: ", error);
          throw error
      }
  })


export const UserAPISlice = createSlice({
    name: "userAPI", 
    initialState, 
    reducers:  {}, 
    extraReducers: (builder) => {
        builder.addCase(getUserForID.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getUserForID.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getUserForID.rejected, (state, action) => {
            state.loading = true
        })
    }
})


export default UserAPISlice.reducer