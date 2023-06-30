import { createReducer } from '@reduxjs/toolkit'
import {  updateTronWalletAddress } from './actions'
const currentTimestamp = () => new Date().getTime()

export interface UserState {

  tronWalletAddress: string | null
}

export const initialState: UserState = {
  tronWalletAddress: null,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateTronWalletAddress, (state,  { payload: { tronWalletAddress }} ) => {
      state.tronWalletAddress = tronWalletAddress
    }),
)
