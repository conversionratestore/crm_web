import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import { authApi } from "./Api/authApi"
import { dashboardApi } from "./Api/dashboardApi"
import { bugTrackerApi } from "./Api/bugTrackerApi"
import authReducer from './Slices/authSlice'
import configReducer from './Slices/configSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [bugTrackerApi.reducerPath]: bugTrackerApi.reducer,

})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['alert', 'auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions : [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(authApi.middleware)
})

export const persistor = persistStore(store)
export default store