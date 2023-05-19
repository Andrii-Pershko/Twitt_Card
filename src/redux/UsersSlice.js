import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchUser, putUser } from './operations';
import {
  STATUS,
  fetchUserFulfilled,
  fetchUserPending,
  fn,
  handleRej,
  putUserFulfilled,
  putUserPending,
} from './builderFunctional';
import { initialStateUsers } from './initialState';

const UsersSlice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, fetchUserPending)
      .addCase(fetchUser.fulfilled, fetchUserFulfilled)
      .addCase(putUser.pending, putUserPending)
      .addCase(putUser.fulfilled, putUserFulfilled)
      .addMatcher(isAnyOf(...fn(STATUS.REJECTED)), handleRej);
  },
});

export const userReducer = UsersSlice.reducer;
