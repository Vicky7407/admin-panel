import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './index'


const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer) 

const configureStore = () => {
    const store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store)
    return { store, persistor }
}

export default configureStore;