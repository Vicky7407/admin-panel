import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '.';
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
     key: 'root',
     storage,
     whitelist: ['counter','medicine', 'Patients']

}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
     const store =createStore(persistedReducer, applyMiddleware(thunk));
     let persistor = persistStore(store)
     return { store, persistor };
}

export default configureStore;