import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import STORAGE_KEYS from '../../constant/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  //call API to register
  const { data } = await authApi.register(payload);

  //save data local storage
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.jwt);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

  //return user data
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  //call API to login

  console.log(payload);
  const { email, password } = payload;
  const res = await authApi.login(email, password);

  console.log(res);

  //save data local storage
  localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res?.data));

  //return user data
  return res;
});

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
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const { actions, reducer } = userSlice;

export const { logout } = actions; //name export

export default reducer; //default export
