import { createAction } from '@reduxjs/toolkit';

export const setLoading = createAction<boolean>('SET_LOADING');

const initialState = {
    isLoading: false,
  };

  export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
                return {...state , isLoading: action.payload}
        default:
            return state;
    }
    
  }