import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'

const store=configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})


export default store
export const authSliceActions=authSlice.actions