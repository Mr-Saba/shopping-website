import {applyMiddleware, createStore, combineReducers} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import ProductReducer from './reducers/ProductReducer'
import UserReducer from './reducers/UserReducer'
import CartReducer from './reducers/CartReducer'
import AddressReducer from './reducers/AddressReducer'


const persistConfig = {
    key: 'root',
    // blacklist: ['products'],
    storage: storage,
}

const rootReducer = combineReducers({
    ProductReducer,
    UserReducer,
    CartReducer,
    AddressReducer
})

const persistedRootReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedRootReducer, applyMiddleware(logger, thunk))

const persistor = persistStore(store)

export {store, persistor}