import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import documentSlice from './documentSlice'
import leavesSlice from './leavesSlice'

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        documents:documentSlice.reducer,
        leaves:leavesSlice.reducer
    }
})


export default store
export const authSliceActions=authSlice.actions
export const documentSliceAtions=documentSlice.actions
export const leavesSliceActions=leavesSlice.actions