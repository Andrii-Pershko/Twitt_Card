import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, putUser } from './operations';

const initialState = {
  items: [],
  isLoadingUsers: false,
  refreshFollow: false,
  error: null,
  pagination: 2,
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,

  extraReducers: {
    [fetchUser.pending](state) {
      state.isLoadingUsers = true;
    },
    [fetchUser.fulfilled](state, action) {
      state.isLoadingUsers = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchUser.rejected](state, action) {
      state.error = action.payload;
    },
    [putUser.pending](state) {
      state.refreshFollow = true;
    },
    [putUser.fulfilled](state, action) {
      state.refreshFollow = false;
      state.items = state.items.map(user => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload };
        }
        return user;
      });
    },
    [putUser.rejected](state, action) {
      state.error = action.payload;
    },
  },
});

export const userReducer = UsersSlice.reducer;
