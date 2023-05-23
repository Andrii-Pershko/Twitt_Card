import { createSlice } from '@reduxjs/toolkit';
import { followsState } from './initialState';

const followsSlice = createSlice({
  name: 'follows',
  initialState: followsState,
  reducers: {
    followsAction: (state, { payload }) => (state = payload),
    putFollows: (state, { payload }) => {
      state.splice(payload.index, 1, payload.followsPayload);
    },
  },
});

export const { followsAction, putFollows } = followsSlice.actions;
export const followsReducer = followsSlice.reducer;
