import { combineReducers } from 'redux';
import { paginationReducer } from './paginationSlice';
import { userReducer } from './UsersSlice';
import { filterReducer } from './filterSlice';

export const reducer = combineReducers({
  pagination: paginationReducer,
  users: userReducer,
  filter: filterReducer,
});
