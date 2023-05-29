import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient4 from "../api/axiosCustom";

const initialState = {
    data: [], 
    loading: true, 
    message: ""
}

export const getShipperSort = createAsyncThunk('user/getShipperSort', async (data) => {
    try {
          const response = await axiosClient4.get('users/shipper/asc')
          return response.data
      }
      catch(error) {
          console.log("error: ", error);
          throw error
      }
  })

export const getShipper = createAsyncThunk('user/getShipper', async (data) => {
    try {
          const response = await axiosClient4.get('users/role?role=SHIPPER')
          return response.data
      }
      catch(error) {
          console.log("error: ", error);
          throw error
      }
  })


export const shipperSlice = createSlice({
    name: "shipper", 
    initialState, 
    reducers:  {}, 
    extraReducers: (builder) => {
        builder.addCase(getShipperSort.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getShipperSort.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getShipperSort.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(getShipper.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getShipper.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getShipper.rejected, (state, action) => {
            state.loading = true
        })
    }
})


export default shipperSlice.reducer