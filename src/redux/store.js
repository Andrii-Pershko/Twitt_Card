import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './UsersSlice';
import { paginationReducer } from './paginationSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    users: userReducer,
    filter: filterReducer,
  },
});
