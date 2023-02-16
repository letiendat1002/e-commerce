import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import STORAGE_KEYS from '../../constant/storage-keys';
import authApi from '../api/auth';
import axiosClient4 from '../api/axiosCustom';

export const register = createAsyncThunk('user/register', async (payload) => {
  //call API to register
  const res = await authApi.register(payload);
  return res;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  //call API to login
  const { email, password } = payload;
  const res = await authApi.login(email, password);
  //save data local storage
  // if (res) {
  //   localStorage.setItem(STORAGE_KEYS.TOKEN, res?.token);
  //   localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res?.data));

  // }

  //return user data
  return res;
});

export const getUserID = createAsyncThunk('user/getuserID', async (data) => {
  try {
        const response = await axiosClient4.get(`users/${data}`)
        return response.data
    }
    catch(error) {
        console.log("error: ", error);
        throw error
    }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || [],
    settings: {},
  },
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      //clear state
      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload.data;
    },
    [getUserID.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = userSlice;

export const { logout } = actions; //name export

export default reducer; //default export
