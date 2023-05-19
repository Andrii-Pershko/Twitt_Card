import { createSlice } from '@reduxjs/toolkit';
import { initialStateFilter } from './initialState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStateFilter,
  reducers: {
    checkFilter: (state, { payload }) => (state = payload),
  },
});

export const { checkFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
