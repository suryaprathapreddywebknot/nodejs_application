import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import documentSlice from './documentSlice'

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        documents:documentSlice.reducer
    }
})


export default store
export const authSliceActions=authSlice.actions
export const documentSliceAtions=documentSlice.actions