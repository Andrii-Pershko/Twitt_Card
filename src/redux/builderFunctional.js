import { fetchUser, putUser } from './operations';

export const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};
const thunk = [fetchUser, putUser];
export const fn = type => thunk.map(el => el[type]);

export const fetchUserPending = state => {
  state.isLoadingUsers = true;
};

export const handleRej = (state, action) => {
  state.error = action.payload;
};

export const fetchUserFulfilled = (state, action) => {
  state.isLoadingUsers = false;
  state.error = null;
  state.items = action.payload;
};

export const putUserPending = state => {
  state.refreshFollow = true;
};

export const putUserFulfilled = (state, action) => {
  state.refreshFollow = false;
  state.items = state.items.map(user => {
    if (user.id === action.payload.id) {
      return { ...user, ...action.payload };
    }
    return user;
  });
};
