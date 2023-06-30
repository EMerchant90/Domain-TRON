import { createAction } from '@reduxjs/toolkit'
import {IDomainInfo} from "./reducer";

export const addDomain = createAction<{ domain: IDomainInfo  }>('domains/addDomain')
