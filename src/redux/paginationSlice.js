import { createSlice } from '@reduxjs/toolkit';
import { initialStatePagination } from './initialState';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialStatePagination,
  reducers: {
    addPagination: (state, { payload }) => (state = state + payload),
  },
});

export const { addPagination } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
