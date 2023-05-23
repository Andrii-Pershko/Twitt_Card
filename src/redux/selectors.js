import { createSelector } from '@reduxjs/toolkit';

export const selectorUserItemsNoMemo = state => state.users.items;
export const selectorLoadingUser = state => state.users.isLoadingUsers;
export const selectorPagination = state => state.pagination;
export const selectorError = state => state.users.error;
export const selectorFilter = state => state.filter;
export const selectorRefreshTweet = state => state.users.refreshFollow;
export const selectorFollows = state => state.follows;

export const selectorUserItems = createSelector(
  [
    selectorUserItemsNoMemo,
    selectorFilter,
    selectorPagination,
    selectorFollows,
  ],
  (users, activeFilter, pagination, follow) => {
    if (activeFilter === 'All') {
      return users.filter((_, index) => index <= pagination);
    }
    if (activeFilter === 'Follow') {
      return users
        .filter((_, index) => follow[index] === false)
        .filter((_, index) => index <= pagination);
    } else {
      return users
        .filter((_, index) => follow[index] === true)
        .filter((_, index) => index <= pagination);
    }
  }
);
