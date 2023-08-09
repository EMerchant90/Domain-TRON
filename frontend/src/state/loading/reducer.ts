import { createReducer } from '@reduxjs/toolkit';
import { setLoading } from './actions';

export type RootState = {
  isLoading: boolean;
};

export const initialState: RootState = {
  isLoading: false,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setLoading, (state, action) => {
    state.isLoading = action.payload;
  })
);