import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://6464ed9d228bd07b353d41b2.mockapi.io';

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/User');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const putUser = createAsyncThunk(
  'users/putUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.put(`/User/${user.id}`, user);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
