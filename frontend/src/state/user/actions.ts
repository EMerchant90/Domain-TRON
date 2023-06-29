import { createAction } from '@reduxjs/toolkit'

export const updateTronWalletAddress = createAction<{ tronWalletAddress: string| null  }>('user/tronWalletAddress')
