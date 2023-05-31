import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosClient4 from "../api/axiosCustom"


const initialState = {
    loading: true, 
    data: []
}

export const postRating = createAsyncThunk('rating/PostRating', async(data) => {
    try {
        const response = await axiosClient4.post('ratings', data)
        return response

    }
    catch(error){
        console.log("error: ", error)
        throw error
    }
})

export const updateRating = createAsyncThunk('rating/updateRating', async(data) => {
    try {
        const response = await axiosClient4.put('ratings', data)
        return response

    }
    catch(error){
        console.log("error: ", error)
        throw error
    }
})

export const getRatingForProduct = createAsyncThunk('rating/getRatingForProduct', async (productID) => {
    try {
          const response = await axiosClient4.get(`ratings?productID=${productID}`)
          return response.data
      }
      catch(error) {
          console.log("error: ", error);
          throw error
      }
  })

export const getRatingForUser = createAsyncThunk('rating/getRatingForUser', async(userID) => {
    try {
          const response = await axiosClient4.get(`ratings?userID=${userID}`)
          return response.data
      }
      catch(error) {
          console.log("error: ", error);
          throw error
      }
})

export const deleteRating = createAsyncThunk('rating/deleteRating', async({productID, userID, orderID}) => {
    try {
        const response = await axiosClient4.delete(`ratings?userID=${userID}&orderID=${orderID}&productID=${productID}`)
        return response
    }
    catch(error) {
        console.log("error: ", error);
        throw error
    }
})

export const ratingSlice = createSlice({
    name: "rating", 
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postRating.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(postRating.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(postRating.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(getRatingForProduct.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getRatingForProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getRatingForProduct.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(getRatingForUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getRatingForUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getRatingForUser.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteRating.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteRating.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(deleteRating.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateRating.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateRating.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(updateRating.rejected, (state, action) => {
            state.loading = true
        })
    }
})

export default ratingSlice.reducer