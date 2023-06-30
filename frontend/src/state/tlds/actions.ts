import { createAction } from '@reduxjs/toolkit'

export const updateTLDs = createAction<{ tlds: string[]  }>('tlds/updateTLDs')
