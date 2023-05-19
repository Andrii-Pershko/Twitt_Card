import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchUser, putUser } from './operations';

const initialState = {
  items: [],
  isLoadingUsers: false,
  refreshFollow: false,
  error: null,
  pagination: 2,
};

const { PENDING, FULFILLED, REJECTED } = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
const thunk = [fetchUser, putUser];
const fn = type => thunk.map(el => el[type]);

const fetchUserPending = state => {
  state.isLoadingUsers = true;
};

const handleRej = (state, action) => {
  state.error = action.payload;
};

const fetchUserFulfilled = (state, action) => {
  state.isLoadingUsers = false;
  state.error = null;
  state.items = action.payload;
};

const putUserPending = state => {
  state.refreshFollow = true;
};

const putUserFulfilled = (state, action) => {
  state.refreshFollow = false;
  state.items = state.items.map(user => {
    if (user.id === action.payload.id) {
      return { ...user, ...action.payload };
    }
    return user;
  });
};

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, fetchUserPending)
      .addCase(fetchUser.fulfilled, fetchUserFulfilled)
      .addCase(putUser.pending, putUserPending)
      .addCase(putUser.fulfilled, putUserFulfilled)
      .addMatcher(isAnyOf(...fn(REJECTED)), handleRej);
  },
});

export const userReducer = UsersSlice.reducer;
