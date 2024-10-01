import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/auth/UserService'
import adminReducer from '../features/auth/AdminService';

export const store=configureStore({
    reducer:{
        auth:userReducer,
        admin:adminReducer
        
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
