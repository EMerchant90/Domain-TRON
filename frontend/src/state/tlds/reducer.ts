import { createReducer } from '@reduxjs/toolkit'
import {  updateTLDs } from './actions'

export interface UserState {

  tlds: string[]
}

export const initialState: UserState = {
  tlds: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateTLDs, (state,  { payload: { tlds }} ) => {
      state.tlds = tlds
    }),
)
