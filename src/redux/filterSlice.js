import { createSlice } from '@reduxjs/toolkit';

// ініцілюємо стартове значення фільтру
const initialState = 'All';

// створюємо slice для фільтру контактів
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    checkFilter: (state, { payload }) => (state = payload),
  },
});

export const { checkFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
