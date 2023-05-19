import { configureStore } from '@reduxjs/toolkit';
// import { userReducer } from './UsersSlice';
// import { paginationReducer } from './paginationSlice';
// import { filterReducer } from './filterSlice';
import { reducer } from './rootReducer';

export const store = configureStore({
  reducer,
});
