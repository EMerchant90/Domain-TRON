import {useCallback, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../../index'
import { updateTLDs } from '../actions'
import TronWeb from 'tronweb'
import {TNS_CONTRACT_ADDRESS, TRON_FULL_URL} from "../../../config/constants";
import tnsAbi from '../../../config/abi/tns.json';
export function useUserActionHandlers(): {
  onUpdateTLDs: (tlds: string[]) => void
}{
  const dispatch = useDispatch<AppDispatch>()
  
  const onUpdateTLDs = useCallback(async (tlds: string[])=> {
    
    dispatch(updateTLDs({tlds}))
  }, [dispatch])
  return {
    onUpdateTLDs
  }
}

/**
 * Returns Tron Wallet address
 */
export function useTLDs(): string[] {
  const state = useSelector<AppState, AppState['tlds']>((s) => s.tlds)
  return state.tlds
}

export function useSyncTLDs() {
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    const syncTlds = async () => {
      try {
        const tronWeb = new TronWeb({
          fullHost: TRON_FULL_URL,
          privateKey: '67162e5b6c29261423f731aff081bb65174e289343a779e5ae0695ca16444037',
        })
        
        let tnsContract = await tronWeb.contract(tnsAbi, TNS_CONTRACT_ADDRESS);
        const tlds = await tnsContract.getAllTlds().call();
        console.info("all tlds", tlds)
        dispatch(updateTLDs({tlds}))
      } catch (e) {
        console.error(e)
      }

    } // end of function
    syncTlds()
  }, [dispatch])

}
