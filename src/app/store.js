import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import authSlice from '../features/auth/authSlice'

const persistAuthConfig = {
    key: "auth",
    storage
}
const persistedAuth = persistReducer(persistAuthConfig, authSlice)

export const store = configureStore({
  reducer: {
    auth: persistedAuth
  },
})

export const persistor = persistStore(store)