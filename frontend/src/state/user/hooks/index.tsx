import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../index'
import { updateTronWalletAddress } from '../actions'

export function useUserActionHandlers(): {
  onUpdateTronWalletAddress: (tronWalletAddress: string) => void
}{
  const dispatch = useDispatch<AppDispatch>()
  
  const onUpdateTronWalletAddress = useCallback((tronWalletAddress)=> {
    dispatch(updateTronWalletAddress({tronWalletAddress}))
  }, [dispatch])
  return {
    onUpdateTronWalletAddress
  }
}

/**
 * Returns Tron Wallet address
 */
export function useTronWalletAddress(): string {
  const state = useSelector<AppState, AppState['user']>((s) => s.user)
  return state.tronWalletAddress
}
