import { createSlice } from '@reduxjs/toolkit';

// ініцілюємо стартове значення фільтру
const initialState = 2;

// створюємо slice для фільтру контактів
const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    addPagination: (state, { payload }) => (state = state + payload),
  },
});

export const { addPagination } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
