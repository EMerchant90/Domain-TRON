import { createReducer } from '@reduxjs/toolkit'
import {addDomain} from './actions'

export interface IDomainInfo {
  domain: string;
  tld: string;
  owner: string;
  tokenId: string;
}
export interface DomainState {

  domains: IDomainInfo[]
}

export const initialState: DomainState = {
  domains: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addDomain, (state,  { payload: { domain }} ) => {
      state.domains.push(domain)
    }),
)
